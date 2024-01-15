const jwt = require("jsonwebtoken");
const { publicCert } = require("../config").keys;

const ISSUER = "sso-hub";
const verifyJwtToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      publicCert,
      { issuer: ISSUER, algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) return reject(err);
        return resolve(decoded);
      }
    );
  });
module.exports = Object.assign({}, { verifyJwtToken });
