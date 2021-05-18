## Installation

```bash
# npm
$ npm install

# yarn
$ yarn install
```

## Running the app

```bash
# development

# npm 
$ npm run start
# yarn
$ yarn run start

# watch mode

# npm 
$ npm run start:dev
# yarn
$ yarn run start:dev
```

## Test the app functionality

- Access http://localhost:3000/ to get "latest" currencies
- Access http://localhost:3000/2020-01-01 to get "by date" currencies (date format should be YYYY-MM-DD)

## Some explanations about code 
- Decided not to use logging tool, but usually i do (pino, log4js with SaaS like LogDNA, Splunk, CloudWatch)
- Cache is simple and straightforward, ofc in production we would use something like Redis. I've decided not too add a docker-compose to not increase complexity. Also cache is simple/dump - usually i use Redis with Redlock to not populate cache multiple times if it's empty and there are a lot of concurrent requests