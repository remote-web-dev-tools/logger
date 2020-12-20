# logger

[![Build Status](https://travis-ci.com/remote-web-dev-tools/logger.svg?branch=main)](https://travis-ci.com/remote-web-dev-tools/logger) [![Coverage Status](https://coveralls.io/repos/github/remote-web-dev-tools/logger/badge.svg?branch=main)](https://coveralls.io/github/remote-web-dev-tools/logger?branch=main)

## Install

Use npm

```
npm i @rwdt/logger --save
```

or use yarn

```
yarn add @rwdt/logger
```

## Usage

### Quick start

```javascript
import { Logger } from '@rwdt/logger'

const logger = new Logger()

logger.debug('debug')
logger.info('info')
logger.warn('warn')
logger.error('error')
```

![example png](https://raw.githubusercontent.com/remote-web-dev-tools/logger/main/assets/example.png)

### Set logger level

```javascript
import { Logger } from '@rwdt/logger'

const logger = new Logger()
logger.setLevel('WARN') // or const logger = new Logger({level: 'WARN'})

logger.debug('debug')
logger.info('info')
logger.warn('warn')
logger.error('error')
```

![set-logger-level.png](https://raw.githubusercontent.com/remote-web-dev-tools/logger/main/assets/set-logger-level.png)

### Custom logger appender

write the log to file

```javascript
import { Logger } from '@rwdt/logger'
import { writeFileSync } from 'fs'

const logger = new Logger()

logger.addAppender(loggingEvent => {
  writeFileSync('logger.log', JSON.stringify(), {
    flag: 'a'
  })
})

// or 
// const logger = new Logger({
//   appender: [loggingEvent => {
//     writeFileSync('logger.log', JSON.stringify(), {
//       flag: 'a'
//     })
//   }]
// })

logger.info('custom appender')
```

### Set context

The context will be set to LoggingEvent

```javascript
import { Logger } from '@rwdt/logger'

const logger = new Logger({context: 'any type context'})

// or logger.setContext({other: 'context'})
```

## API

See [types/index.d.ts](https://github.com/remote-web-dev-tools/logger/blob/main/types/index.d.ts)
