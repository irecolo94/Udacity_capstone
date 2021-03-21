function newTrip(event) {
  event.preventDefault()

  console.log('I am here')

  const newTrip = document.getElementById('new_trip')
  // const oldEntries = document.createElement('div')
  document.body.appendChild(newTrip)

}

export { newTrip }
