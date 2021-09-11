const express = require('express')
const app = express();
const bodyParser = require('body-parser')
var PORT = process.env.PORT || 5000
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authMiddleware = require('./middleware/authMiddlware')

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false} )
mongoose.connect('mongodb://localhost:27017/URS', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('connected to database')
})
mongoose.connection.on('error', () => {
    console.log('failed to connect to database')
})

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', require('./routes/user'))
app.use('/course', require('./routes/course'))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/html/signup.html')
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/html/home.html')
})
app.get('/esehi', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/public/html/esehi.html')
})

app.listen(PORT, () => {
    console.log('server started on port 5000')
})