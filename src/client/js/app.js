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
            document.getElementById('data_title').innerHTML = 'Your trip to: ' + res.city + ' , ' + res.country;
            document.getElementById('date').innerHTML = 'date: ' + res.date;
            document.getElementById('city').innerHTML = 'longitude: ' + res.lng;
            document.getElementById('temp').innerHTML = 'latitude: ' + res.lat;
            document.getElementById('content').innerHTML = 'your departure date: ' + depDate;
            document.getElementById('max_temp').innerHTML = 'Max temp: ' + res.tempMax + ' expected weather: ' + res.weatherDesc;
            document.getElementById('countdown').innerHTML = 'There are only ' + res.difference + ' days left to your trip'
            document.getElementById('img').innerHTML = '<img src="' + res.currentPic + '" alt="" id="img_small">'
            console.log(res)
          })
//        else {window.alert('Invalid url')}
}

export { genAnswer }
