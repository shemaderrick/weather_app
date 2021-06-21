const path = require('path')
const hbs = require('hbs')
const geolocate = require('./utils/geolocate')
const getWeather = require('./utils/weather')
const express = require('express')
const app = express()

//define paths for express configuration
const publicPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, './templates/views')
const partialspath = path.join(__dirname, './templates/partials')
app.use(express.static(publicPath))

//view engine configuration
app.set('view engine', 'hbs');
app.set('views', viewpath)
hbs.registerPartials(partialspath)


//routes
app.get('', (req, res) => {
 res.render('index', {
  title: "Home",
  name: 'Shema Derrick'
 })
})
app.get('/about', (req, res) => {
 res.render('about', {
  title: "About",
  name: 'Shema Derrick'
 })
})

app.get('/forecast', (req, res) => {
 if (!req.query.address) {
  return res.send({ error: "Address must be provided" })
 }

 geolocate(req.query.address, (error, { place, latitude, longitude } = {}) => {
  if (error) {
   return res.status(400).send({ error: error })
  }

  getWeather(longitude, latitude, (error, forecastdata) => {
   if (error) {
    return res.status(400).send({ error: error })
   }

   res.status(200).send({
    place: place,
    address: req.query.address,
    forecast: forecastdata.forecast,
    temperature: forecastdata.temperature
   })
  })

 })


})

app.get('*', (req, res) => {
 res.render('404', {
  error: "Page Not found"
 })

})
app.listen(3000, () => {
 console.log('listen.....')
})