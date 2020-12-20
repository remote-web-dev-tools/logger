const LEVEL_MAP = {
  ALL: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  OFF: 10
}

/**
 *  Default all
 *  @type{LoggerLevel}
 */
let loggerLevel = 'ALL'

/**
 * Console.log Appender
 * @param {LoggingEvent} loggingEvent
 */
const consoleAppender = (loggingEvent) => {
  const logData = [
    `[${loggingEvent.level.toUpperCase()}] -`,
    ...loggingEvent.data
  ]

  let logFunction = console.log

  if (typeof console[loggingEvent.level] === 'function') {
    logFunction = console[loggingEvent.level]
  }

  logFunction(...logData)
}

/**
 * Logger appender list
 * @type {Appender[]}
 */
const loggerAppender = [consoleAppender]

/**
 * Basically log function
 * @private
 * @param {LoggingEvent} loggingEvent
 */
const log = (loggingEvent) => {
  if (LEVEL_MAP[loggingEvent.level.toUpperCase()] >= LEVEL_MAP[loggerLevel]) {
    loggerAppender.forEach((appender) => appender(loggingEvent))
  }
}

/**
 * Configure logger
 * @param {LoggerConfig} config
 */
export const configure = (config = {}) => {
  config = Object.assign({
    appender: [],
    level: 'ALL'
  }, config)

  if (['ALL', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'OFF'].includes(config.level)) {
    loggerLevel = config.level
  } else {
    throw new Error('Invalid logging level')
  }

  if (!Array.isArray(config.appender)) {
    throw new Error('Invalid appender')
  }

  config.appender.forEach((appender) => {
    if (typeof appender !== 'function') {
      throw new Error('Invalid appender')
    } else {
      loggerAppender.push(appender)
    }
  })
}

export const logger = {}

/**
 * Define logger function
 */
;['debug', 'info', 'warn', 'error'].forEach((methodName) => {
  logger[methodName] = (...args) => {
    log({
      level: methodName,
      date: Date.now(),
      data: args
    })
  }
})

/**
 * For test, dont call
 * @private
 * @returns {{loggerLevel: LoggerLevel, loggerAppender: Appender[]}}
 */
export const getLoggerConfiguration = () => {
  return {
    loggerLevel,
    loggerAppender
  }
}
