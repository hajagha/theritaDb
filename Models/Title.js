const mongoose = require('mongoose')

const TitleSchema = new mongoose.Schema({
    titleName  : {
        type : String ,
        required : true
    },
    stations : []
})

const Title = mongoose.model('Title' , TitleSchema)

module.exports = Title