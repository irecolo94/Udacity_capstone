// Require Express to run server and routes
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch')
const { v4: uuidv4 } = require('uuid');
// Start up an instance of app
const projectData = {}
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const app = express()
// Cors for cross origin allowance
app.use(cors())
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


// Initialize the main project folder
app.use(express.static('dist'))
console.log(__dirname)

// Setup Server

// SET UP routes

// get route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


// POST ROUTE FOR API CALLS

app.post('/results', async function (req,res) {
  let d = new Date()
  let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear()

  const app_key = process.env.API_KEY
  const baseURL = `http://api.geonames.org/searchJSON?q=${req.body.url}&maxRows=1&username=${app_key}`
  let response = await fetch(baseURL)
  let data = await response.json()
  console.log(data)

// Define Unique ID for each trip
  uuid = uuidv4();
  // console.log(uuid);

  const evaluation = {}

  evaluation.test = 'banana'
  evaluation.uid = uuid
  console.log(evaluation)

  evaluation.lat = data.geonames[0].lat
  evaluation.lng = data.geonames[0].lng
  evaluation.city = data.geonames[0].name
  evaluation.country = data.geonames[0].countryName
  evaluation.date = newDate
  evaluation.departure = req.body.future

  console.log(baseURL)
  console.log(evaluation)
  console.log((new Date(evaluation.departure)).getMonth())
  console.log(d)
  let departureDateMS = new Date(evaluation.departure).getTime()
  const daysDelta = departureDateMS - d.getTime()
  console.log(daysDelta)
  evaluation.difference = Math.ceil(daysDelta / (1000 * 60 * 60 *24));



  // Weatherbi calls:
  const weath_key = process.env.API_KEY_WEATHER
  const baseURL_two = `http://api.weatherbit.io/v2.0/forecast/daily?&lat=${evaluation.lat}&lon=${evaluation.lng}&key=${weath_key}`
  const baseURL_three = `https://api.weatherbit.io/v2.0/current?&lat=${evaluation.lat}&lon=${evaluation.lng}&key=${weath_key}&include=minutely`
  if(evaluation.difference >= 7){
    let newResponse = await fetch(baseURL_two)
    let weathData = await newResponse.json()
    console.log(weathData.data[1])
    evaluation.tempMax = weathData.data[1].max_temp
    evaluation.tempMin = weathData.data[1].min_temp
    evaluation.weatherDesc = weathData.data[1].weather.description

    // res.send(evaluation)

    console.log(evaluation)
  } else {
    let newResponse = await fetch(baseURL_three)
    let weathData = await newResponse.json()
    console.log(weathData.data[0])
    evaluation.temp = weathData.data[0].temp
    evaluation.weatherDesc = weathData.data[0].weather.description

    // res.send(evaluation)

    console.log(evaluation)
    }

    // Pixabay pics
  try {
    const pics_key = process.env.API_KEY_PICS
    const baseURLPics = `https://pixabay.com/api/?key=${pics_key}&q=${evaluation.country}+${evaluation.city}`
    let cityPics = await fetch(baseURLPics)
    let picsData = await cityPics.json()
    console.log(picsData.hits[1].webformatURL)

    evaluation.currentPic = picsData.hits[1].webformatURL

} catch(error) {
  const pics_key = process.env.API_KEY_PICS
  const baseURLPics = `https://pixabay.com/api/?key=${pics_key}&q=${evaluation.country}`
  let cityPics = await fetch(baseURLPics)
  let picsData = await cityPics.json()
  console.log(picsData.hits[1].webformatURL)

  evaluation.currentPic = picsData.hits[1].webformatURL
}

  projectData[uuid] = evaluation;

  const allTrips = Object.values(projectData)
  const thisTrip = allTrips[allTrips.length - 1]
  console.log(thisTrip)

  console.log(projectData);
  res.send(projectData)

})

console.log(projectData)



// Post route for deleting trips 
app.post('/delete', async function(req, res) {
  console.log(req.body.url)
  const toDelete = req.body.url
  console.log(projectData[toDelete])
  delete projectData[toDelete]
})

console.log(`Your API key is ${process.env.API_KEY}`);

app.listen(4041, function () {
  console.log('Example app listening on port 4041!')
})

module.exports = {app}
