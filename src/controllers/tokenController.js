const jwt = require("jsonwebtoken");

//Validar Token
const validateToken = async (req,res,next) => {
    console.log("pase por validate Token");
    const accesToken = req.headers[`auth-token`]
    console.log(req);
    if (!accesToken) {
     return res.status(401).send("Acceso Denegado")
    }
  
    jwt.verify(accesToken, process.env.SECRET_KEY,(err,user) => {
      if (err) {
       return res.status(401).send("Acceso denegado, token expirado o incorrecto")
      }else{
        next()
      }
    })
  }

  module.exports = {
    validateToken
  }