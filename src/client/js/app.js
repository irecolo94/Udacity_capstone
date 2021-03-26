import imgSun from '../media/sun.png';
import imgCloud from '../media/cloud.png';
import imgSnow from '../media/snow.png';
import imgRain from '../media/umbrella.png';


function genAnswer(event) {
  event.preventDefault()


  let formText = document.getElementById('destination').value
  let depDate = document.getElementById('dep_date').value;

  console.log("::: Form Submitted :::")
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
    .then(function(res) {
      console.log(res)
      const allTrips = Object.values(res)
      console.log(allTrips)
      allTrips.sort((a, b) => a.difference - b.difference)
      const app = document.getElementById('all_trip')
      const old = document.getElementById('old_trips')
      let tripcard = '';
      let expiredTrips = '';
      allTrips.forEach((trip) => {
        if (document.getElementById(`"${trip.uid}"`) == null && trip.difference > 0) {
          const mo = trip.uid

          let pieceEins = `<div class ="card_container" id="${trip.uid}">
                <div class="title data_title"><h2> ${trip.city} , ${trip.country} ...is waiting for you!</h2></div>
                <div class="countdown">There are only ${trip.difference} days left to your trip!</div>
                <div class="entry_holder">
                    <div class="img">
                      <img src="${trip.currentPic}" alt="" class="img_small" crossorigin="anonymous">
                    </div>
                    <div class="info">
                      <div class="date">departure date: ${trip.departure}</div>
                      <div class="content"></div>
                      </div>
                      ` // bis weath_data
          let pieceZwei = '';

          const whichWeather = () => {
            if (`${trip.difference}` < 7) {
              pieceZwei = `<div class="weather">
                  <div class="weath_data">
                  <h6>current weather</h6><div class="weath_desc">${trip.weatherDesc}</div><div class="temp">${trip.temp}°</div></div>`
            } else if (`${trip.difference}` >= 7) {
              pieceZwei = `<div class="weather"><div class="weath_data">
                                <h6>weather forecast</h6>
                                <div class="weath_desc">${trip.weatherDesc}</div>
                                <div class="temp_max">${trip.tempMax}° </div>
                                <div class="temp_min">${trip.tempMin}°</div></div>`
            }
          }

          whichWeather();

          let pieceDrei = '';

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

          let pieceVier = `</div></div></div><button data-name='${mo}' type="submit" name="button" value="submit" onClick="return Client.deleteTrip('${mo}')" class="button_delete">remove Trip</button><button id="save_pdf" type="submit" name="button" value="submit" onclick="return Client.createPDF('${mo}')" onsubmit="return createPDF('${mo}')"> Save</button></div>`


          const all = pieceEins + pieceZwei + pieceDrei + pieceVier

          tripcard += all

        } else if (`${trip.difference}` <= 0) {
          expiredTrips += `<div class="title data_title expired" id="${trip.uid}"><h2> ${trip.city} , ${trip.country} has expired! on the ${trip.departure}</h2></div>`
        }

      });
      app.innerHTML = tripcard
      old.innerHTML = expiredTrips


      console.log(res)
    })

}


export {
  genAnswer
}
