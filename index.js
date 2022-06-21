const express = require('express')
const app = express()


require('./config/db')
const port = process.env.PORT || 5000


//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const weatherRoute = require('./routes/weather') 


//Middleware
app.use(express.json())


//Routes Middlewares
app.use('/user', authRoute);
app.use('/posts', postRoute)
app.use('', weatherRoute)


app.listen(port, () => console.log(`Server Up and Running on port ${port}`));