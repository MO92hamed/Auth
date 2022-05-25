const router = require('express').Router()
const  request = require('request');

router.get('/weather', (req, res) => {
	const  city = req.query.city;
	const weatherData = (city, getWeather) => {
	
    const url =   process.env.BASE_URL + encodeURIComponent(city) + '&appid=' + process.env.SECRET_KEY
    request({url, json:true}, (error, {body})=> {
        if(error) {
            getWeather("Can't fetch data from open weather map api ", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            getWeather("Unable to find required data, try another location", undefined);
        } else {
            getWeather(undefined, {
                cityName: body.name, 
			    temperature: body.main.temp,
                temperatureMinimum: body.main.temp_min,
				humidity: body.main.humidity,
                description: body.weather[0].description
                
            })
        }
    })
}
    
    if(!city) {
        return res.json({
            "error": "You must enter city in search text box"
        })
    }

    weatherData(city, (error, {cityName,temperature,temperatureMinimum, humidity, description} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(cityName, temperature,temperatureMinimum, humidity, description);
        res.send({
            cityName,
			temperature,
            temperatureMinimum,
			humidity,
            description
            
        })
    })
});

router.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})

 
module.exports = router;