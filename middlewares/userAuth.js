const jwt = require("jsonwebtoken");
const config = require("../config/auth");

function userAuth(req, res, next) {
  if (!req.headers["authorization"]) {
    return res.status(401).json({ error: "token não encontrado" });
  }

  const token = req.headers["authorization"];

  jwt.verify(token, config.secret, (error, payload) => {
    req.user = payload;
    next();
  });
}

module.exports = userAuth;
