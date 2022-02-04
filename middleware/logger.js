const moment = require("moment");

// 4. middleware function
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format()}`);
  // http://localhost:5000/api/members: 2022-02-04T19:36:32+01:00
  next();
};

module.exports = logger;
