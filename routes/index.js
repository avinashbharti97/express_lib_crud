var express = require('express');
const jwt = require('jsonwebtoken')
const fs = require('fs')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/catalog');
});

/*for jwt auth*/
router.get('/secret',isAuthorized,(req, res)=>{
  res.json({"message":"this is secret message"})
})

router.get('/readme', (req, res)=>{
  res.json({"message":"this is readme"})
})

router.get('/jwt', (req, res)=>{
  let privateKey = fs.readFileSync('./private.pem', 'utf8');
  let token = jwt.sign({"body": "stuff"}, "mysupersecretphrase", {algorithm:'HS256'}) 
  res.send(token)
})

function isAuthorized(req,res, next){
  if(typeof req.headers.authorization !== "undefined"){
    let token = req.headers.authorization.split(" ")[1];
    console.log(token)
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    jwt.verify(token, privateKey, {algorithm:'HS256'}, (err, user)=>{

      if(err){
        res.status(500).json({ error: "t Authorized" });
        throw new Error("Not Authorized");
      }
      return next();
    })
  }else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        res.status(500).json({ error: "Norized" });
        throw new Error("Not Authorized");
    }
}
module.exports = router;
