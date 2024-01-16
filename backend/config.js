module.exports = {
  app_env: process.env.APP_ENV,
  port: process.env.PORT,
  database: {
    mongodb: {
      database: process.env.MONGODB_DATABASE,
      port: process.env.MONGODB_PORT,
      protocol: process.env.MONGODB_PROTOCOL,
      host: process.env.MONGODB_HOST,
    },
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  google: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    domain: process.env.DOMAIN,
    callbackURL: process.env.DOMAIN + process.env.CALLBACK_URL,
  },
  dev_domains: process.env.DEV_DOMAINS.split(","),
  allowed_origins: process.env.ALLOWED_ORIGINS.split(","),
};
