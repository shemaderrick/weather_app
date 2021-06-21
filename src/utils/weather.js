const request = require('request')
const getWeather = (latitude, longitude, callback) => {
 const url = `http://api.weatherstack.com/current?access_key=ccffc467d56bac225cbc18262413dcf7&query= ${latitude},${longitude}`
 request({ url, json: true }, (error, { body }) => {

  if (error) {
   callback("Unable to connect to waether serveices", undefined)
  }
  else if (body.error) {
   callback("can not get location", undefined)
  }
  else callback(undefined, { forecast: body.current.weather_descriptions[0], country: body.location.country, temperature: body.current.temperature })
 })

}
module.exports = getWeather