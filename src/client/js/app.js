import imgSun from '../media/sun-regular.png';
import imgCloud from '../media/cloud-solid.png';
import imgSnow from '../media/snowflake-solid.png';
import imgRain from '../media/umbrella-solid.png';
import deleteTrip from './addNew'


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
            allTrips.sort((a, b) => a.difference - b.difference)
            const app = document.getElementById('all_trip')
            const old = document.getElementById('old_trips')
            let tripcard = '';
            let expiredTrips = '';
            allTrips.forEach((trip) => {
              if(document.getElementById(`"${trip.uid}"`) == null && trip.difference >= 0) {
                const mo = trip.uid
                console.log(mo)
                function get(one) {console.log(one)}
                get(mo)

                let pieceEins = `<div class ="card_container" id="${trip.uid}">
                <div class="title data_title"><h2> ${trip.city} , ${trip.country} ...is waiting for you! on the ${trip.departure}</h2></div>
                <div class="entry_holder">
                    <div class="img">
                      <img src="${trip.currentPic}" alt="" class="img_small" crossorigin="anonymous">
                    </div>
                    <div class="info">
                      <div class="date"> date: ${trip.date}</div>
                      <div class="longitude"></div>
                      <div class="latitude"></div>
                      <div class="content"></div>
                      <div class="countdown">There are only ${trip.difference} days left to your trip!</div>
                    </div>
                      ` // bis weath_data
                let pieceZwei = '';

                const whichWeather = () => {
                  if(`${trip.difference}` < 7) {
                  pieceZwei = `<div class="weather">
                  <div class="weath_data">
                  <h4>expected weather:</h4><div class="temp">${trip.temp}°</div></div>`
                } else if(`${trip.difference}` >= 7) {
                  pieceZwei = `<div class="weather">
                              <div class="weath_data">
                                <h4>expected weather:</h4>
                                <div class="temp_max">${trip.tempMax}° </div>
                                <div class="temp_min">${trip.tempMin}°</div></div>`
                }}

                whichWeather();

                let pieceDrei = '';

                const weatherIcons = () => {
                  let str = `${trip.weatherDesc}`.toLowerCase()
                  console.log(str)
                  if (str.includes('cloud') == true) {
                pieceDrei = '<div class="weirdIconTests"><img src="' + imgCloud + '" alt=""></div></div></div></div></div>'

                  } else if (str.includes('sun') == true) {
                    pieceDrei =
                    '<div class="weirdIconTests"><img src="' + imgSun + '" alt=""></div></div></div></div></div>'
                  } else if (str.includes('rain') == true) {
                    pieceDrei =   '<div class="weirdIconTests"><img src="' + imgRain + '" alt=""></div></div></div></div></div>'
                  } else if (str.includes('snow') == true) {
                    pieceDrei =   '<div class="weirdIconTests"><img src="' + imgSnow + '" alt=""></div></div></div></div></div>'
                  }
                }
                weatherIcons();

                let pieceVier = '<button data-name=' + mo + ' type="submit" name="button" value="submit" onclick="return Client.deleteTrip()" class="button_delete"> new Trip</button>'

                  const all = pieceEins + pieceZwei + pieceDrei + pieceVier

                  tripcard += all
                  // tripcard += `<div class="title data_title" id="${trip.uid}">...is waiting for you!<h2> ${trip.city} , ${trip.country} ...is waiting for you! on the ${trip.departure}</h2></div> <div class="entry_holder">
                  //     <div class="img">
                  //       <img src="${trip.currentPic}" alt="" class="img_small">
                  //     </div>
                  //     <div class="info">
                  //       <div class="date"> date: ${trip.date}</div>
                  //       <div class="longitude"></div>
                  //       <div class="latitude"></div>
                  //       <div class="content"></div>
                  //       <div class="countdown">There are only ${trip.difference} days left to your trip!</div>
                  //     </div>
                  //     <div class="weather">
                  //       <div class="weath_data">
                  //         <h3>expected weather:</h3>
                  //         <div class="temp_max">${trip.tempMax}° </div>
                  //         <div class="temp_min">${trip.tempMin}°</div>
                  //       </div>
                  //       <div class="weirdIconTests${trip.uid} icon">
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>`
              } else if (`${trip.difference}` < 0) {
                expiredTrips += `<div class="title data_title" id="${trip.uid}">has expired!<h2> ${trip.city} , ${trip.country} ...is waiting for you! on the ${trip.departure}</h2></div>`
              }

              // const weatherIcons = () => {
              //   let str = `${trip.weatherDesc}`.toLowerCase()
              //   console.log(str)
              //   if (str.includes('cloud') == true) {
              //     document.getElementsByClassName(`'weirdIconTests${trip.uid}'`).innerHTML =
              //     '<img src="' + imgCloud + '" alt="">'
              //   } else if (str.includes('sun') == true) {
              //     document.getElementsByClassName(`'weirdIconTests${trip.uid}'`).innerHTML =
              //     '<img src="' + imgSun + '" alt="">'
              //   } else if (str.includes('rain') == true) {
              //     document.getElementsByClassName(`'weirdIconTests${trip.uid}'`).innerHTML =
              //     '<img src="' + imgRain + '" alt="">'
              //   } else if (str.includes('snow') == true) {
              //     document.getElementsByClassName(`'weirdIconTests${trip.uid}'`).innerHTML =
              //     '<img src="' + imgSnow + '" alt="">' }
              //   }
                // weatherIcons();
            });
            app.innerHTML = tripcard
            old.innerHTML = expiredTrips
            // const thisTrip = allTrips[allTrips.length - 1]
            // document.getElementById('data_title').innerHTML = '<h2>' +thisTrip.city + ' , ' + thisTrip.country + '...is waiting for you!'  + '</h2>'
            // document.getElementById('date').innerHTML = 'date: ' + thisTrip.date;
            // document.getElementById('longitude').innerHTML = 'longitude: ' + thisTrip.lng;
            // document.getElementById('latitude').innerHTML = 'latitude: ' + thisTrip.lat;
            // document.getElementById('content').innerHTML = 'your departure date: ' + depDate;
            // if(thisTrip.difference >= 6){
            //   document.getElementById('weath_data').innerHTML = /*'<h3>expected weather:</h3>' + */'<div id="temp_max">' + thisTrip.tempMax + '°</div>' + '<div id="temp_min">' + thisTrip.tempMin + '°</div>'
            // }
            // else {document.getElementById('weath_data').innerHTML = /*'<h3>actual weather:</h3>' + */ '<div id="temp_max">' + thisTrip.temp + '°</div>'}
            // // let str = thisTrip.weatherDesc;
            // // if (str.includes('cloud') {} else if (str.includes('snow') {} else if (str.includes('sun'))
            // document.getElementById('countdown').innerHTML = 'There are only ' + thisTrip.difference + ' days left to your trip'
            // document.getElementById('img').innerHTML = '<img src="' + thisTrip.currentPic + '" alt="" id="img_small">'
            console.log(res)
          })
//        else {window.alert('Invalid url')}
}

// function to upload weather icons


          // } else if (str.includes('rain') == true)

export { genAnswer }
