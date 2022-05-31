# Authentication

In this project we are creating an authentication systeme using Node.js expressjs MongoDB and JWT ;
connecting with weather API ( based on Express.js and Request ) that will return some information (city name, temperatue, humidity and description of the weather) of a city that gets to the backend using the city name transported by a get request and saving them to the database .



## Dependencies
- Express
- Bcrypt
- Dotenv
- Mongoose
- Jsonwebtoken
- Joi
- Request
-  Nodemon
## Roadmap

- Create server
 ```bash
 app.listen(3000, () => console.log('Server Up and Running'))
 ```

- Add auth-router

- Connect with database
```bash
//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
   () => console.log('connected to DB!')
)
```

- Create user with POST /auth/register

   - Check if email is unique
   
   - Hash pasword

```bash

//Hash passwords
        const saltRounds =10
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
```

   - Insert into database

- Login user with POST /auth/LOGIN    

   - check if email in database.

   - Compare password with hashed password in database.

   - Create and assign a JWT 

 ```bash
 
 //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

   //res.send('Logged In!')

})  
 ```
 - Connect with a real time weather api and fetch a data

 - Add weather-router 

 - Save weather Data to database

```bash
//Import Routes
const weatherRoute = require('./routes/weather') 
```
```bash
//Routes Middlewares
app.use('', weatherRoute)
```



## Deployment

To deploy this project run

```bash
  npm install
```
```bash
  npm start
```

## Authors

- https://github.com/MO92hamed








