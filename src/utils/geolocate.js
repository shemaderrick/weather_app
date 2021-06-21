
const request = require('request')

const geolocate = (address, callback) => {
 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hlbWFkZXJyaWNrIiwiYSI6ImNrcTBvMWRqazAwNXMybm5ybmtlaWl2azEifQ.3v5HPS0OsasYNU6p0Rifew&limit=1'

 request({ url, json: true }, (error, { body }) => {

  if (error) {
   callback("Unable to connect to web services", undefined)
  }
  else if (body.features.length === 0) {
   callback("can't get location", undefined)
  } else callback(undefined, {
   place: body.features[0].place_name,
   latitude: body.features[0].center[0], longitude: body.features[0].center[1]
  })
 })
}
module.exports = geolocate