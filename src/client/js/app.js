// IMPORT IMAGES
import imgSun from '../media/sun.png';
import imgCloud from '../media/cloud.png';
import imgSnow from '../media/snow.png';
import imgRain from '../media/umbrella.png';

//MAIN FUNCTION
function genAnswer(event) {
  event.preventDefault()

//Select inserted values
  let formText = document.getElementById('destination').value
  let depDate = document.getElementById('dep_date').value;

  console.log("::: Form Submitted :::")

  // send user data to server and then fetch projectData
  fetch('http://localhost:4041/results', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formText,
        future: depDate
      })
    })
    .then(res => res.json())
    .catch(error => alert(error + ' Enter a valid city!'))
    .then(function(res) {
      console.log(res)
      // select values from the server response
      const allTrips = Object.values(res)
      console.log(allTrips)

      // sort all trips according to the departure date
      allTrips.sort((a, b) => a.difference - b.difference)

      // set up variables to then update HTML of the cards
      const app = document.getElementById('all_trip')
      const old = document.getElementById('old_trips')
      let tripcard = '';
      let expiredTrips = '';

      // loop through all trips to update each card
      allTrips.forEach((trip) => { // if trip not expired yet
        if (document.getElementById(`"${trip.uid}"`) == null && trip.difference > 0) {
          const thisID = trip.uid

          let pieceEins = `<div class ="card_container" id="${trip.uid}">
                <div class="title data_title"><h2><u>${trip.city}</u> is waiting for you!</h2></div>
                <div class="countdown">There are only ${trip.difference} days left to your trip!</div>
                <div class="date">departure date: ${trip.departure}</div>
                <div class="entry_holder">
                    <div class="img">
                      <img src="${trip.currentPic}" alt="" class="img_small">
                    </div>

                      <div class="content">
                        <h4>basic infos - ${trip.countryFullName}</h4>
                        <p>capital city: ${trip.capital} <br>
                        population: ${trip.population} <br>
                        currency: ${trip.currence} <br>
                        main language: ${trip.language} <br>
                      </p>

                      </div>
                      `
          let pieceZwei = '';

          // define two cases for future forecast and actual weather
          const whichWeather = () => {
            if (`${trip.difference}` < 7) {
              pieceZwei = `<div class="weather">
                  <div class="weath_data">
                  <h6>current weather</h6><div class="weath_desc">${trip.weatherDesc}</div><div class="temp">${trip.temp}°</div></div>`
            } else if (`${trip.difference}` >= 7) {
              pieceZwei = `<div class="weather"><div class="weath_data">
                                <h6>weather forecast</h6>
                                <div class="weath_desc">${trip.weatherDesc}</div>
                                <div class="temp">${trip.tempMax}° ${trip.tempMin}°</div></div>`
            }
          }

          whichWeather();

          let pieceDrei = '';
          // define cases for weather icons
          const weatherIcons = () => {
            let str = `${trip.weatherDesc}`.toLowerCase()
            console.log(str)
            if (str.includes('cloud') == true) {
              pieceDrei = '<div class="weirdIconTests"><img src="' + imgCloud + '" alt=""></div>'

            } else if (str.includes('sun') == true || str.includes('clear') == true) {
              pieceDrei =
                '<div class="weirdIconTests"><img src="' + imgSun + '" alt=""></div>'
            } else if (str.includes('rain') == true) {
              pieceDrei = '<div class="weirdIconTests"><img src="' + imgRain + '" alt=""></div>'
            } else if (str.includes('snow') == true) {
              pieceDrei = '<div class="weirdIconTests"><img src="' + imgSnow + '" alt=""></div>'
            }
          }
          weatherIcons();

          // add button to delete trip from client and server
          // add button to save pdf the trip
          let pieceVier = `</div></div><button data-name='${thisID}' type="submit" name="button" value="submit" onClick="return Client.deleteTrip('${thisID}')" class="button_delete">remove Trip</button><button id="save_pdf" type="submit" name="button" value="submit" onclick="return Client.createPDF('${thisID}')" onsubmit="return createPDF('${thisID}')"> Save</button></div>`


          const all = pieceEins + pieceZwei + pieceDrei + pieceVier

          tripcard += all

        } else if (`${trip.difference}` <= 0) { //user case if trip already expired
          expiredTrips += `<div class="title data_title expired" id="${trip.uid}">Your trip to:&nbsp; <h4>${trip.city} , ${trip.country}</h4>&nbsp; with departure date &nbsp;<h4>${trip.departure}</h4> &nbsp; has expired!<button data-name='${trip.uid}' type="submit" name="button" value="submit" onClick="return Client.deleteTrip('${trip.uid}')" class="button_delete">remove Trip</button></div>`
        }

      })

      // update upcomping and expired trips
      app.innerHTML = tripcard
      old.innerHTML = expiredTrips


      console.log(res)
    })


}


export {
  genAnswer
}
