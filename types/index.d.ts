export type LoggerLevel = 'ALL' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'OFF'

export interface LoggingEvent {
  level: LoggerLevel
  date: Date
  data: any
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

declare function configure(config: LoggerConfig): void

declare namespace logger {
  function debug(...args: any[]): void
  function info(...args: any[]): void
  function warn(...args: any[]): void
  function error(...args: any[]): void
}
