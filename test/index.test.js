import { logger, configure, getLoggerConfiguration } from '../src'

describe('logger', function () {
  describe('configure test', function () {
    it('configure should be defined', function () {
      expect(configure).toBeInstanceOf(Function)
    })

    it('default loggerLevel is "ALL"', function () {
      expect(getLoggerConfiguration().loggerLevel).toBe('ALL')
    })

    it('loggerLevel should be work', function () {
      const mockAppender = jest.fn(() => {})

      configure({ appender: [mockAppender], level: 'ERROR' })

      logger.debug('debug')
      logger.info('info')
      logger.warn('warn')
      expect(mockAppender).toBeCalledTimes(0)

      logger.error('info')
      expect(mockAppender).toBeCalledTimes(1)
    })

    it('default appender is [consoleAppender] ', function () {
      expect(getLoggerConfiguration().loggerAppender.length).toBe(1)
    })

    it("configure.level should be in 'ALL' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'OFF'", function () {
      expect(() => configure({ level: 'other' })).toThrow('Invalid logging level')
    })

    it('configure.level should be set', function () {
      ;['DEBUG', 'INFO', 'WARN', 'ERROR', 'OFF', 'ALL'].forEach(
        (loggerLevel) => {
          configure({ level: loggerLevel })
          expect(getLoggerConfiguration().loggerLevel).toBe(loggerLevel)
        }
      )
    })

    it('configure.appender should is a function array', function () {
      expect(() => configure({ appender: 1 })).toThrow('Invalid appender')
      expect(() => configure({ appender: [1] })).toThrow('Invalid appender')
    })
  })

  describe('logger test', function () {
    it('logger should be defined', function () {
      expect(logger).toBeDefined()
    })

    it('logger function should be define', function () {
      ;['debug', 'info', 'warn', 'error'].forEach((methodName) => {
        expect(logger[methodName]).toBeInstanceOf(Function)
      })
    })

    it('logger function should set correct level', function () {
      let level

      const mockAppender = jest.fn((loggingEvent) => {
        expect(loggingEvent.level).toEqual(level)
      })

      configure({ appender: [mockAppender] })
      ;['debug', 'info', 'warn', 'error'].forEach((methodName) => {
        level = methodName
        logger[methodName]()
      })
    })

    it('logger function should get correct loggingEvent', function () {
      let level
      let data

      const mockAppender = jest.fn((loggingEvent) => {
        expect(loggingEvent.level).toEqual(level)
        expect(loggingEvent.data).toEqual(data)
      })

      configure({ appender: [mockAppender] })
      ;['debug', 'info', 'warn', 'error'].forEach((methodName) => {
        level = methodName
        data = [1, 'string', [1, 2], { a: 1 }]

        logger[methodName](...data)
      })
    })
  })
})
