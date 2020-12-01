const express = require('express')
const router = express.Router()
const User = require('../../Models/Users')
const bcrypt = require("bcryptjs")
const jwt  = require('jsonwebtoken')


router.post('/Register' , async (req , res) => {
    let email = req.body.email
    const password = req.body.password
    console.log(email , password)
    if(email == "" || password == "" || password == undefined || email == undefined)
    {
        res.json({message : 'empty'})
        return 
    }

    email = email.toLowerCase()
    //Check if exist
    User.findOne({email : email}).then((user) => {
        if(user)
        {
            res.json({message : "user already exist"})
        }
        else {
            const newUser = new User({
                email : email,
                password : password
            })
            bcrypt.genSalt(10 , (err  ,salt)=> bcrypt.hash(newUser.password , salt , (err , hash)=>{
                if(err) throw err
                //hash password
                newUser.password = hash
                
                newUser.save().then((user)=>
                {
                    res.json({ message:'Done'})
                }).catch(err => console.log(err))
                
            }))
        }
    })


})

router.post('/Login' , async (req , res) => {
    console.log('sagg')
    let email = req.body.email
    const password = req.body.password
    
    if(email == "" || password == "" || password == undefined || email == undefined)
    {
        res.json({message : 'empty'})
        return 0 ;
    }

    email = email.toLowerCase()
    

    await User.findOne({email : email}).then(user => {
        if(!user)
        {
            res.json({message : "user not found"})
        }
        else {
            bcrypt.compare(password , user.password , (err , isMatch) => {
                if(err) throw err

                if(isMatch)
                {
                    const token =  jwt.sign({email : user.email } , 'SecretKey')
                    res.json({"message" : 'Success' , 
                                "token" : token ,
                                    "name" : user.name
                })
                }
                if(!isMatch)
                {
                    res.json({message : 'password is wrong'})
                }

            })
        }
    })
})

module.exports = router