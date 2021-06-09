const jwt = require('jsonwebtoken');
const secret = "funnysecret";

const authenticate = (req, res, next)=>{
  let token;

  if(req.headers.authorization) token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret, (err,decoded)=>{
      if(err) throw err;
      res.user = decoded;
      next()
    })
  }
  else res.sendStatus(401);
}