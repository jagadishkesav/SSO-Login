const cors = require("cors");
const config = require("../config");

module.exports = cors({
  origin: (origin, callback) => {
    // TODO - add login to get dev / prod domains
    if (!origin || config.dev_domains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
});
