const express = require("express");
const passport = require("passport");
const { db, cors, session } = require("./utils");
const routes = require("./routes");
const app = express();

db.connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.use(routes);

module.exports = app;
