# Authentication

In this project we are creating an authentication systeme using Node.js expressjs and MongoDB, JWT ;
connecting with weather API ( based on Express.js and Request ) that will return the weather description of a city that gets to the backend using the city name transported by a get request.



## Dependencies
- express
- bcrypt
- dotenv
- mongoose
- jsonwebtoken
- joi
- request
-  nodemon
## Roadmap

- Create server

- Add auth-router

- connect with database
```bash
//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
   () => console.log('connected to DB!')
)
```

- Create user with POST /auth/register

   - check if email is unique
   
   - hash pasword

```bash

//Hash passwords
        const saltRounds =10
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
```

   - insert into database

- Login user with POST /auth/LOGIN    

   - check if email in database.

   - Compare password with hashed password in database.

   - create and assign a JWT 

 ```bash
 
 //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

   //res.send('Logged In!')

})  
 ```
 - connect with a real time weather api and fetch a data

```bash
 router.get('/', (req, res) => {
	let city = req.query.city;
	const  request = require('request');
	request(
		`https://samples.openweathermap.org/data/2.5/forecast?q=${city}&appid=(process.env.API_KEY)`,
		function(error, response, body) {
			let data = JSON.parse(body);
			if (response.statusCode === 200) {
				res.send(`The weather in your city "${city}" is ${data.list[0].weather[0].description}`);
			}
		}
	);
});
```

- Add weather-router 

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








