import imgSun from '../media/sun-regular.png';
import imgCloud from '../media/cloud-solid.png';
import imgSnow from '../media/snowflake-solid.png';
import imgRain from '../media/umbrella-solid.png';


function genAnswer(event) {
    event.preventDefault()


    let formText = document.getElementById('zip').value
    let depDate = document.getElementById('feelings').value;
    // let encodedText = encodeURI(formText)
    // Client.checkForName(formText)
    // const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    console.log("::: Form Submitted :::")
    fetch('http://localhost:4041/results', {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({url: formText, future: depDate})
          })
          .then(res => res.json())
          .then(function(res) {
            console.log(res)
            const allTrips = Object.values(res)
            console.log(allTrips)
            const thisTrip = allTrips[allTrips.length - 1]
            document.getElementById('data_title').innerHTML = '<h2>' +thisTrip.city + ' , ' + thisTrip.country + '...is waiting for you!'  + '</h2>'
            document.getElementById('date').innerHTML = 'date: ' + thisTrip.date;
            document.getElementById('longitude').innerHTML = 'longitude: ' + thisTrip.lng;
            document.getElementById('latitude').innerHTML = 'latitude: ' + thisTrip.lat;
            document.getElementById('content').innerHTML = 'your departure date: ' + depDate;
            if(thisTrip.difference >= 6){
              document.getElementById('weath_data').innerHTML = /*'<h3>expected weather:</h3>' + */'<div id="temp_max">' + thisTrip.tempMax + '°</div>' + '<div id="temp_min">' + thisTrip.tempMin + '°</div>'
            }
            else {document.getElementById('weath_data').innerHTML = /*'<h3>actual weather:</h3>' + */ '<div id="temp_max">' + thisTrip.temp + '°</div>'}
            // let str = thisTrip.weatherDesc;
            // if (str.includes('cloud') {} else if (str.includes('snow') {} else if (str.includes('sun'))
            document.getElementById('countdown').innerHTML = 'There are only ' + thisTrip.difference + ' days left to your trip'
            document.getElementById('img').innerHTML = '<img src="' + thisTrip.currentPic + '" alt="" id="img_small">'
            const weatherIcons = () => {
              let str = thisTrip.weatherDesc.toLowerCase()
              console.log(str)
              if (str.includes('cloud') == true) {
                document.getElementById('weirdIconTests').innerHTML =
                '<img src="' + imgCloud + '" alt="">'
              } else if (str.includes('sun') == true) {
                document.getElementById('weirdIconTests').innerHTML =
                '<img src="' + imgSun + '" alt="">'
              } else if (str.includes('rain') == true) {
                document.getElementById('weirdIconTests').innerHTML =
                '<img src="' + imgRain + '" alt="">'
              } else if (str.includes('snow') == true) {
                document.getElementById('weirdIconTests').innerHTML =
                '<img src="' + imgSnow + '" alt="">' }
              }
            weatherIcons();
            console.log(res)
          })
//        else {window.alert('Invalid url')}
}

// function to upload weather icons


          // } else if (str.includes('rain') == true)

export { genAnswer }
