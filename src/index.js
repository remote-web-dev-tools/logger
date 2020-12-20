const LEVEL_MAP = {
  ALL: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  OFF: 10
}

/**
 * Console.log Appender
 * @param {LoggingEvent} loggingEvent
 */
const consoleAppender = (loggingEvent) => {
  const logData = [`[${loggingEvent.level.toUpperCase()}] -`, ...loggingEvent.data]

  let logFunction = console.log

  if (typeof console[loggingEvent.level] === 'function') {
    logFunction = console[loggingEvent.level]
  }

  logFunction(...logData)
}

/**
 * Logger
 * @param {LoggerConfig} [config]
 * @constructor
 */
export function Logger(config) {
  this.appender = [consoleAppender]
  this.context = null
  this.loggerLevel = null

  config = Object.assign(
    {
      appender: [],
      level: 'ALL',
      context: null
    },
    config
  )

  this.setLevel(config.level)

  if (!Array.isArray(config.appender)) {
    throw new Error('Invalid appender')
  }

  this.addAppender(config.appender)

  this.setContext(config.context)
}

Logger.prototype.setLevel = function setLevel(level) {
  if (['ALL', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'OFF'].includes(level)) {
    this.loggerLevel = level
  } else {
    throw new Error('Invalid logging level')
  }
}

Logger.prototype.addAppender = function addAppender(appender) {
  if (!Array.isArray(appender)) {
    appender = [appender]
  }

  appender.forEach((appender) => {
    if (typeof appender !== 'function') {
      throw new Error('Invalid appender')
    } else {
      this.appender.push(appender)
    }
  })
}

Logger.prototype.setContext = function setContext(context = {}) {
  this.context = context
}

/**
 * Basically log function
 * @private
 * @param {LoggingEvent} loggingEvent
 */
Logger.prototype._log = function _log(loggingEvent) {
  if (LEVEL_MAP[loggingEvent.level.toUpperCase()] >= LEVEL_MAP[this.loggerLevel]) {
    this.appender.forEach((appender) => appender(loggingEvent))
  }
}

/**
 * Define logger function
 */
;['debug', 'info', 'warn', 'error'].forEach((methodName) => {
  Logger.prototype[methodName] = function (...args) {
    this._log({
      level: methodName,
      date: Date.now(),
      data: args,
      context: this.context
    })
  }
})
