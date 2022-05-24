const router = require('express').Router()
const  request = require('request');

router.get('/weather', (req, res) => {
	const  city = req.query.city;
	const weatherData = (city, callback) => {
	
    const url =   process.env.BASE_URL + encodeURIComponent(city) + '&appid=' + process.env.SECRET_KEY
    request({url, json:true}, (error, {body})=> {
        if(error) {
            callback("Can't fetch data from open weather map api ", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Unable to find required data, try another location", undefined);
        } else {
            callback(undefined, {
                cityName: body.name, 
			    temperature: body.main.temp,
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

    weatherData(city, (error, {cityName,temperature, humidity, description} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(cityName, temperature, humidity, description);
        res.send({
            cityName,
			temperature,
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