export type LoggerLevel = 'ALL' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'OFF'

/**
 * LoggingEvent
 */
export interface LoggingEvent {
  level: LoggerLevel
  date: Date
  data: any
  context: any
}

export type Appender = (loggingEvent: LoggingEvent) => void

/**
 * Logger config
 */
export interface LoggerConfig {
  /**
   * Global logger level, disable less the level log
   */
  level?: LoggerLevel
  /**
   * Custom log appender
   */
  appender?: Appender[]
}

declare class Logger {
  loggerLevel: LoggerLevel
  appender: Appender[]

  constructor(config?: LoggerConfig);

  debug(...args: any[]): void

  info(...args: any[]): void

  warn(...args: any[]): void

  error(...args: any[]): void

  setLevel(level: LoggerLevel): void;

  setContext(context: any): void;

  addAppender(appender: Appender | Appender[]): void;
}
