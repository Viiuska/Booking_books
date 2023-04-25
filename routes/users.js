const express = require('express');
const router = express.Router()
const passport = require('passport')
const jwt = require("jsonwebtoken");
const User = require('../models/user')
const Book = require('../models/book')
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const bookService = require('../config/bookService');
const inventory = require('../routes/inventory')

// Random books for the book mongoose schema
Book.create({
  title:"Don Quixote",
  author:"Miguel de Cervantes",
  genre:"",
  available:2
},{
  title:"Lord of the Rings",
  author:"J.R.R. Tolkien",
  genre:"",
  available:4
},{
  title:"Harry Potter and the Sorcerer's Stone",
  author:"J.K. Rowling",
  genre:"",
  available:2
},{
  title:"And Then There Were None",
  author:"Agatha Christie",
  genre:"",
  available:2
},{
  title:"Alice's Adventures in Wonderland",
  author:"Lewis Carroll",genre:"",available:1
},{
  title:"The Lion, the Witch, and the Wardrobe",
  author:"C.S. Lewis",genre:"",available:3
},{
  title:"Pinocchio",
  author:"Carlo Collodi",genre:"",available:5
},{
  title:"Catcher in the Rye",
  author:"J.D. Salinger",genre:"",available:2
},{
  title:"Anne of Green Gables",
  author:"L. M. Montgomery",genre:"",available:3
},{
  title:"Twenty Thousand Leagues Under the Sea",
  author:"Jules Verne",genre:"",available:0
},{
  title:"It Ends with Us",
  author:"Colleen Hoover",genre:"",available:2
},{
  title:"Magic Hour",
  author:"Kristin Hannah",genre:"",available:1
},{
  title:"Percy Jackson and the Lightning Thief",
  author:"Rick Riordan",genre:"",available:3
}
)


router.post('/register', (req, res, next)=>{
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err){res.json({success:false, msg:"Failed to register"})}
            User.create({
                name:req.body.name,
                email:req.body.email,
                username:req.body.username,
                password:hash
            }
            ).then(result =>{
                res.json({success:true, msg:"User registered"})
            })
        })

    })
    

})


router.post('/authenticate', (req, res, next)=>{
    User.findOne({username: req.body.username}, (err, user) => {
      if(err) {
        throw err
      };
      if(!user){
        return res.json({success:false, msg:"User not found"})
      }
      else{
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if(err) throw err
            if(isMatch) {
              const token = jwt.sign({user}, config.secret,{  //user needs {} because the way we sign our token
                expiresIn:604800  //week
              })
              res.json({
                success:true, 
                token: 'JWT '+ token,
                user:{
                  id:user._id,
                  name:user.name,
                  username:user.username,
                  email:user.email
                }
              })
            }else{
              return res.json({success:false, msg:"Wrong password or username"})
            }
          })
      }
  })

})

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    res.json({user:req.user})
})



router.route('/dashboard/:title').post(inventory.findOneBook);



module.exports=router