const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

//connect to DB
   module.exports = mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
   .then(() => console.log('Successfully Connected to DB!'))
   .catch(e => console.log(e)) 

 