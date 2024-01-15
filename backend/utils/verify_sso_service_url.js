const domains = {
  "http://localhost:3000": true,
  "http://localhost:3001": true,
  "http://localhost:3002": false,
};

const verifyServiceURLDomain = (req, res, next) => {
  // if (req.headers.host === "localhost:5000") return next();
  const { serviceURL } = req.query;
  if (serviceURL) {
    const url = new URL(serviceURL);
    if (!domains[url.origin]) {
      return res
        .status(400)
        .json({ message: "Your are not allowed to access the sso-server" });
    }
    next();
  } else {
    const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
    console.log(redirectURL);
    if (req.session.user == null) {
      return res.redirect(`/login?serviceURL=${redirectURL}`);
    }
  }
  next();
};

module.exports = verifyServiceURLDomain;
