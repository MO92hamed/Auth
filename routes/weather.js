const router = require('express').Router()
const request = require('request');



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

module.exports = router