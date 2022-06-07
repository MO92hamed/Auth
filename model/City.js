const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    city: String,
    temperature: String,
    temperatureMinimum: String,
	humidity: String,
    description: String
})

module.exports = mongoose.model('City', citySchema)