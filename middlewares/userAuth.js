const JWT = require("jsonwebtoken");
const config = require("../config/auth");

function userAuth(req, res, next) {
  const token = req.headers.authorization;
  if(!token) {
    return res.status(401).json({ error: 'Token faltando'})
 }

  JWT.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token expirado"});
    req.user = decoded
    console.log(req.user)
    next();
  });
}

module.exports = userAuth;
