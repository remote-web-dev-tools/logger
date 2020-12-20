export type LoggerLevel = 'ALL' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'OFF'

/**
 * LoggingEvent
 */
export interface LoggingEvent {
  /**
   * The log level
   */
  level: LoggerLevel
  /**
   * Log creation time
   */
  date: Date
  /**
   * Log
   */
  data: any
  /**
   * Log context
   */
  context: any
}

/**
 * Log Appender
 * Can custom log output
 */
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
  /**
   * Logger context
   */
  context?: any
}

export class Logger {
  loggerLevel: LoggerLevel
  appender: Appender[]

  constructor(config?: LoggerConfig);

  public debug(...args: any[]): void

  public info(...args: any[]): void

  public warn(...args: any[]): void

  public error(...args: any[]): void

  public setLevel(level: LoggerLevel): void;

  public setContext(context: any): void;

  public addAppender(appender: Appender | Appender[]): void;
}
