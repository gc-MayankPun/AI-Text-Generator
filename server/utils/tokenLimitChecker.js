const { encode } = require("gpt-3-encoder");

const tokenLimitChecker = (message) => {
  const tokenCount = encode(message).length;
    return tokenCount < 8000;
};

module.exports = tokenLimitChecker;
