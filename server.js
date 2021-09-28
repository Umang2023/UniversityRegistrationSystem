const express = require('express')
const app = express();
const bodyParser = require('body-parser')
var PORT = process.env.PORT || 5000
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authMiddleware = require('./middleware/authMiddlware')

// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use('/announcement', require('./routes/announcement'))
app.use(express.static('public'))

app.get('/home', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/public/html/home.html')
})

app.get('/', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/public/html/home.html')
})

app.get('/announcement', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/public/html/announcement.html')
})

app.get('/courses', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/public/html/courses.html')
})

app.get('/registration', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/public/html/registration.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/html/signup.html')
})

app.get('/signin', (req, res) => {
    res.sendFile(__dirname + '/public/html/signin.html')
})
app.get('/esehi', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/public/html/esehi.html')
})

app.listen(PORT, () => {
    console.log('server started on port 5000')
})