const express = require('express')

const User = require('../../Models/Users')
const Station = require('../../Models/Station')
const Title = require('../../Models/Title')



const jwt  = require('jsonwebtoken')
const { compareSync } = require('bcryptjs')
const { json } = require('body-parser')

const router = express.Router()

router.post('/getStationData' ,async (req , res) => {
    console.log('request made')
    const stationName = req.body.stationName
    const token = req.body.token
    let email = req.body.email
    const title = req.body.title

    if(token == "" || token == undefined)
    {
        res.json({message : 'Token not found'})
        return
    }
    
    else
    {
        email = email.toLowerCase()
       await jwt.verify(token , 'SecretKey' , async(err , Email) => {
            if(err)
            {
                
                res.json({message : 'somthing wrong with token'})
                return 0
                console.log(err)
                console.log('man injam')
            }else {
                if(Email.email == email)
                {
                    console.log('man injamaaam ')
                    const DATA = await Station.findOne({stationName : stationName , title : title})
                    
                    if(DATA == null)
                    {
                        res.json({message : 'No record found'})
                    }
                    else {
                    res.json({message : 'Done' , stationInfo : DATA })
                    }
                }
                else{
                    res.json({message : 'email is wrong'})
                }
            }
        })
    }

} )





router.post('/getTitleData' ,async (req , res) => {
    
    const token = req.body.token
    let email = req.body.email
    
    console.log(token)
    if(token == "" || token == undefined)
    {
        res.json({message : 'Token not found'})
        return 0
    }
    if(email ==  "" || email == undefined)
    {
        res.json({message : 'Email not found'})
        return 0
    }
    
    else
    {
        email = email.toLowerCase()
       await jwt.verify(token , 'SecretKey' , async(err , Email) => {
            if(err)
            {
                
                
                res.json({message : 'somthing wrong with token'})
                return 0
                
            }else {
                if(Email.email == email)
                {
                    console.log('man injamaaam ')
                    const DATA = await Title.find({})
                    
                    if(DATA == null)
                    {
                        res.json({message : 'No record found'})
                    }
                    else {
                    res.json({message : 'Done' , titleInfo : DATA })
                    }
                }
                else{
                    res.json({message : 'email is wrong'})
                }
            }
        })
    }

} )




router.post('/make' , async(req , res) => {
    const stationName = req.body.stationName
    const titleName = req.body.titleName
    const newTitle = new Title({
        titleName : titleName  ,
        stations : stationName
            
        
    })

    
    await newTitle.save().then(message => {console.log(message)}).catch(err => {console.log(err)})
    
    res.json({message :'done'})

})




router.post('/StationSet' , async(req , res) => {
    const stationName = req.body.stationName
    const title = req.body.title
    const header = req.body.header
    const texts = req.body.texts
    const disc = req.body.disc
    console.log(texts , title , stationName)
    const newStation = new Station({
        title : title  ,
        stationName : stationName,
        texts : texts   ,
        header : header,
        disc : disc
        
    })

    
    await newStation.save().then(message => {console.log(message)}).catch(err => {console.log(err)})
    
    res.json({message :'done'})

})


module.exports = router