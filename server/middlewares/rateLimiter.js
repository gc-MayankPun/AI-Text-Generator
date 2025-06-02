const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  // windowMs: 15 * 60 * 1000,
  windowMs: 1000,
  max: 10,
  message: {
    status: 429,
    error:
      "Too many messages sent. Please wait a minute before sending another message.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };
