const { logger, configure, getLoggerConfiguration } = require('../src')

describe('logger', function () {
  describe('configure test', function () {
    it('configure should be defined', function () {
      expect(configure).toBeInstanceOf(Function)
    })

    it('defaultLoggerLevel is "ALL"', function () {
      expect(getLoggerConfiguration().loggerLevel).toBe('ALL')
    })

    it("configure.level should be in 'ALL' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'OFF'", function () {
      configure({ level: 'other' })

      expect(getLoggerConfiguration().loggerLevel).toBe('ALL')
    })

    it('configure.level should be set', function () {
      ;['DEBUG', 'INFO', 'WARN', 'ERROR', 'OFF', 'ALL'].forEach(
        (loggerLevel) => {
          configure({ level: loggerLevel })
          expect(getLoggerConfiguration().loggerLevel).toBe(loggerLevel)
        }
      )
    })

    it('default appender is [consoleAppender] ', function () {
      expect(getLoggerConfiguration().loggerAppender.length).toBe(1)
    })

    it('configure.appender should be array', function () {})
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

    it('logger function should be set correct level', function () {
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
  })
})
