const express = require('express')
const { route } = require('../public/auth')
const router = express.Router()
const path = require('path')
const User = require('../../Models/Users')
const jwt = require('jsonwebtoken')
const fs = require('fs')




router.get('/stream' , async (req ,res) => {
    
    const mainDir =path.resolve(__dirname , '../../videos') 
    
    const videoName = req.query.videoName
    console.log(videoName)
    
    let Dir = mainDir+'/'+videoName
    const stat = fs.statSync(Dir)
    const fileSize  = stat.size
    const range = req.headers.range

    if(range)
    {
        const parts = range.replace(/bytes=/ , "").split("-")
        const start = parseInt(parts[0] , 10)
        const end = parts[1] ? parseInt(parts[1] , 10) : fileSize-1
        const chunkSize = (end-start) + 1
        const file = fs.createReadStream(Dir , {start , end})
        const head = {
            'Content-Range' : `bytes ${start}-${end}/${fileSize}` ,
            'Accept-Ranges' : 'bytes',
            'Content-Length' : chunkSize,
            'Content-Type' : 'video/mp4'
        }

        res.writeHead(206 , head)
        file.pipe(res)
    }else {
        const head = {
            'Content-Length' : fileSize ,
            'Content-Type' : 'video/mp4'
        }
        res.writeHead(200 , head)
        fs.createReadStream(Dir).pipe(res)
    }
    
    // await User.findOne({email : email}).then(user => {
    //     if(!user)
    //     {
    //         res.json({message : 'no user found'})
    //     }
    //     if(user) 
    //     {
            
    //     }
    // }).catch()


    
})





module.exports = router