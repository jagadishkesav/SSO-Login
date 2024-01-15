const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const verifyServiceURLDomain = require("./utils/verify_sso_service_url");
const { verifyJwtToken } = require("./utils/jwt_verify");
const app = express();
require("./auth");

app.use(
  session({
    secret: "sso-hub",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  next();
});
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // replace with your client-side domain
    credentials: true,
  })
);
app.use(cookieParser());
// app.use(verifyServiceURLDomain);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  res.render("login");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.cookie("token", req.session.passport.user.token, {
      httpOnly: true,
      secure: true,
    });
    // Successful authentication, redirect back to the app.
    res.redirect(`http://localhost:3000`);
  }
);

app.get("/user", async (req, res) => {
  try {
    const decoded = await verifyJwtToken(req.cookies["token"]);
    res.send(decoded);
  } catch (err) {
    res.status(401).send({ message: "Not authenticated" });
  }
});

app.get("/auth", (req, res) => {
  console.log(req.session);
  res.status(200).send({ isAuthenticated: "token" in req.cookies });
});

app.get("/logout", (req, res, next) => {
  console.log(req);
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect("/");
  });
});

module.exports = app;
