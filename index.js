const express = require('express')
const cors = require('cors')
const PORT = 5000 || process.env.PORT
const app = express()
const bodyParser = require("body-parser")
const mongoDb = require("mongoose")


mongoDb.connect("mongodb://localhost/newProject").then(() => console.log('connected to mongoDB')).catch(err => console.log(err))


app.use(cors())

app.use(bodyParser())

app.use(express.urlencoded({extended : false}))
app.use('/getData/' , require('./routes/private/text'))
app.use('/' , require('./routes/public/auth'))
app.use('/private' , require('./routes/private/stream'))

app.listen(PORT , () => console.log(`server is runnig on port ${PORT}`))

