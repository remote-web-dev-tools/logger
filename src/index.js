const LEVEL_MAP = {
  ALL: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  OFF: 10
}

/** @type{LoggerLevel} */
let loggerLevel

/**
 * Format date to HH:mm:ss
 * @param {Date} date
 * @return string
 */
const formatDate = (date) => {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

/**
 * Console.log Appender
 * @param {LoggingEvent} loggingEvent
 */
const consoleAppender = (loggingEvent) => {
  console.log(
    `[${loggingEvent.level.toUpperCase()}] ${formatDate(loggingEvent.date)} - `,
    ...loggingEvent.data
  )
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
  if (LEVEL_MAP[loggingEvent.level] >= LEVEL_MAP[loggerLevel]) {
    loggerAppender.forEach((appender) => appender(loggingEvent))
  }
}

/**
 * Configure logger
 * @param {LoggerConfig} config
 */
const configure = (config) => {
  if (!config) {
    config = {}
  }

  if (['ALL', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'OFF'].includes(config.level)) {
    loggerLevel = config.level
  } else {
    loggerLevel = 'ALL'
  }

  if (Array.isArray(config.appender)) {
    loggerAppender.push(...config.appender)
  }
}

const logger = {}

/**
 * Define logger function
 */
;['debug', 'info', 'warn', 'error'].forEach((methodName) => {
  logger[methodName] = (...args) => {
    log({
      level: methodName.toUpperCase(),
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
const getLoggerConfiguration = () => {
  return {
    loggerLevel,
    loggerAppender
  }
}

module.exports = {
  logger,
  configure,
  getLoggerConfiguration
}
