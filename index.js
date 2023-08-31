// dependencies
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const loginRouter = require('./router/loginRouter');
const inboxRouter = require('./router/inboxRouter');
const usersRouter = require('./router/usersRouter');

// Internal import
const {notFoundHandler, errorHandler} = require('./middleware/common/errorhandler')

// Make app
const app = express();

// Read env variable
dotenv.config()

// Connect Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err))

// express middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Set template engine
app.set('view engine', 'ejs')

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing set up
app.use('/', loginRouter)
app.use('/users', usersRouter)
app.use('/inbox', inboxRouter)

// 404 not found handler
app.use(notFoundHandler)

// Common Error handling
app.use(errorHandler)

app.listen(process.env.PORT, ()=>{
    console.log(`app running on port ${process.env.PORT}`)
})