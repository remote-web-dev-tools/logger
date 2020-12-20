import { Logger } from '../src'

describe('logger', function () {
  /* mock console methods */
  beforeAll(() => {
    ['info', 'warn', 'error', 'debug'].forEach((key) => {
      console[key] = () => {
      }
    })
  })

  describe('Logger constructor test', function () {
    let logger

    beforeEach(() => {
      logger = new Logger()
    })

    it('default logger level is "ALL"', function () {
      expect(logger.loggerLevel).toBe('ALL')
    })

    it('Logger level should be in \'ALL\' | \'DEBUG\' | \'INFO\' | \'WARN\' | \'ERROR\' | \'OFF\'', function () {
      expect(() => new Logger({ level: 'other' })).toThrow('Invalid logging level')
    })

    it('Logger level should be work', function () {
      const mockAppender = jest.fn(() => {
      })
      const logger = new Logger({
        appender: [mockAppender],
        level: 'ERROR'
      })

      logger.debug('debug')
      logger.info('info')
      logger.warn('warn')
      expect(mockAppender).toBeCalledTimes(0)

      logger.error('info')
      expect(mockAppender).toBeCalledTimes(1)
    })

    it('default appender is [consoleAppender] ', function () {
      expect(logger.appender.length).toBe(1)
    })

    it('Logger level should be set', function () {
      ;['DEBUG', 'INFO', 'WARN', 'ERROR', 'OFF', 'ALL'].forEach(
        (loggerLevel) => {
          const logger = new Logger({ level: loggerLevel })
          expect(logger.loggerLevel).toBe(loggerLevel)
        }
      )
    })

    it('configure.appender should is a function array', function () {
      expect(() => new Logger({ appender: 1 })).toThrow('Invalid appender')
      expect(() => new Logger({ appender: [1] })).toThrow('Invalid appender')
    })

    it('config.context should be save', function () {
      const logger = new Logger({ context: 'context' })
      expect(logger.context).toEqual('context')
    })
  })

  describe('Logger method test', () => {
    let logger

    beforeEach(() => {
      logger = new Logger()
    })

    it('logger.setLevel should check level', function () {
      expect(() => logger.setLevel('other')).toThrow('Invalid logging level')
    })

    it('logger.setLevel should be work', function () {
      logger.setLevel('WARN')
      expect(logger.loggerLevel).toEqual('WARN')
    })

    it('logger.addAppender should should check appender', function () {
      expect(() => logger.addAppender('other')).toThrow('Invalid appender')
      expect(() => logger.addAppender(['other'])).toThrow('Invalid appender')
    })

    it('logger.addAppender should be work', function () {
      const mockAppender = jest.fn(() => {
      })
      logger.addAppender(mockAppender)
      logger.info('info')

      expect(mockAppender).toBeCalledTimes(1)
    })

    it('logger.setContext should be work', function () {
      expect(logger.context).toEqual(null)

      logger.setContext({ type: 'test' })
      expect(logger.context).toEqual({ type: 'test' })
    })
  })

  describe('logger test', function () {
    let logger

    beforeEach(() => {
      logger = new Logger()
    })

    it('logger should be defined', function () {
      expect(logger).toBeDefined()
    })

    it('logger function should be define', function () {
      ;['debug', 'info', 'warn', 'error'].forEach((methodName) => {
        expect(logger[methodName]).toBeInstanceOf(Function)
      })
    })

    it('logger function should get correct loggingEvent', function () {
      let level
      let data

      const mockAppender = jest.fn((loggingEvent) => {
        expect(loggingEvent.level).toEqual(level)
        expect(loggingEvent.data).toEqual(data)
      })

      const logger = new Logger({
        appender: [mockAppender]
      })

      ;['debug', 'info', 'warn', 'error'].forEach((methodName) => {
        level = methodName
        data = [1, 'string', [1, 2], { a: 1 }]

        logger[methodName](...data)
      })
    })
  })
})
