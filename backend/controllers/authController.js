const passport = require("passport");

exports.login = (req, res) => {
  const { redirectURL } = req.query;
  if (req.isAuthenticated()) {
    res.redirect(redirectURL);
  } else {
    res.render("login", { redirectURL });
  }
};

exports.authGoogle = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["email", "profile"],
    state: req.query.redirectURL, // Pass redirectURL as state parameter
  })(req, res, next);
};

exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: req.query.state
  })(req, res, function (err) {
    if (err) {
      console.log('Error in passport.authenticate:', err);
    } else {
      console.log('Authentication completed');
    }
    next();
  });
};

exports.getUser = async (req, res) => {
  console.log(req.isAuthenticated(), "req.session");
  res.send({ user: req.user });
};

exports.getAuth = (req, res) => {
  res.status(200).send({ isAuthenticated: req.isAuthenticated() });
};

exports.logout = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy();
    });
  }
  res.status(200).send({ isAuthenticated: false });
};
