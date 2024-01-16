const session = require("express-session");
const MongoStore = require("connect-mongo");
const config = require("../config");

const sessionStore = MongoStore.create({
  mongoUrl: `${config.database.mongodb.protocol}://${config.database.mongodb.host}:${config.database.mongodb.port}/${config.database.mongodb.database}`,
  collectionName: "sessions",
});

module.exports = session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});
