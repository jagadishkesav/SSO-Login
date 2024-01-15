const fs = require("fs");
const path = require("path");

const privateKeyFilePath = path.resolve(__dirname, "./private.key");
const publicKeyFilePath = path.resolve(__dirname, "./public.key");

const privateCert = fs.readFileSync(privateKeyFilePath);
const publicCert = fs.readFileSync(publicKeyFilePath);

const jwtValidatityKey = "sso-hub";

module.exports = Object.assign(
  {},
  {
    privateCert,
    publicCert,
    jwtValidatityKey,
  }
);
