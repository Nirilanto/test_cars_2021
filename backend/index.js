const application = require('./dist')

module.exports = application

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      basePath: '/api',
      port: +(process.env.PORT || 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true
      },
      cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400,
        credentials: true,
      },
      apiExplorer: {
        disabled: process.env.NODE_ENV === 'production'
      }
    }
  }
  application.main(config).catch((err) => {
    console.error('Cannot start the application.', err)
    process.exit(1)
  })
}
