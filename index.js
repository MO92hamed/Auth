const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const weatherRoute = require('./routes/weather') 

dotenv.config()

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
   () => console.log('connected to DB!')
)

//Middleware
app.use(express.json())

//Routes Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('', weatherRoute)

app.listen(4000, () => console.log('Server Up and Running'));