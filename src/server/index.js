// Require Express to run server and routes
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch')
// Start up an instance of app

const evaluation = {}
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

// app.get('/all', (req, res) => {
//   res.send(projectData);
// });
//
// // post route
// app.post('/addEntry', (req, res) => {
//   newEntry = {
//     temperature: req.body.temperature,
//     city: req.body.city,
//     date: req.body.date,
//     userresponse: req.body.userresponse,
//   };
//   projectData = newEntry;
// });

app.post('/results', async function (req,res) {
  let d = new Date()
  let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear()

  const app_key = process.env.API_KEY
  const baseURL = `http://api.geonames.org/searchJSON?q=${req.body.url}&maxRows=1&username=${app_key}`
  let response = await fetch(baseURL)
  let data = await response.json()
  console.log(data)

  // const evaluation = {}
  evaluation.lat = data.geonames[0].lat,
  evaluation.lng = data.geonames[0].lng
  evaluation.date = newDate
  evaluation.feeel = req.body.future
  // evaluation.userresponse: newFeel

  res.send(evaluation)
  console.log(baseURL)
  console.log(evaluation)
})

app.listen(4041, function () {
  console.log('Example app listening on port 4041!')
})
// console.log(`Your API key is ${apiKey}`)
console.log(`Your API key is ${process.env.API_KEY}`);
