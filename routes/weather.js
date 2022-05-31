const router = require('express').Router()
const  request = require('request');
const mongoose = require('mongoose')

const getWeather = new mongoose.Schema({
        cityName: String, 
		temperature: String,
        temperatureMinimum: String,
		humidity: String,
        description: String
})

const cityModel = mongoose.model('City', getWeather)

router.get('/weather', async(req, res) => {
	const  city =  req.query.city;
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

    const weather = getWeather
    weatherData(city, (error, weather) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(weather);
        res.send({weather })
    })

   // try {
   //     const weatherSaved = await weather.save()
   //     res.send({ weather: weather.cityName })
   // }catch (err){
   //     res.status(400).send(err)
   // }
});

router.post('/weather', async(req, res) => {
    const newWeather = new cityModel()

    newWeather.cityName = getWeather.cityName
    newWeather.temperature = getWeather.temperature
    newWeather.temperatureMinimum = getWeather.temperatureMinimum
    newWeather.humidity = getWeather.humidity
    newWeather.description = getWeather.description

    newWeather.save(function(err, weather) {
        if(err) {
            res.send('error saving data')
        }else {
            res.send(newWeather)
        }
    })
})

router.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})

 
module.exports = router;