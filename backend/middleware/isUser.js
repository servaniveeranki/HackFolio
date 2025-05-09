const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());

const validuser=(req,res,next)=>{
    const token =req.cookies['jwt'];
    if(token){
      jwt.verify(token,'secret',async(err,data)=>{
        if(err){
          if (err.name === 'TokenExpiredError') {
            return res.status(201).json({ error: 'Token expired', expiredAt: err.expiredAt });
          }
          res.status(400).send("Invalid Token");
        }else{
          
          req.userId = data.userId;
          req.username=data.username;
          req.email = data.email;
        
          next();
        }
      });
    }
    else{
      res.status(400).send('ok');
    }
  }
module.exports= validuser;