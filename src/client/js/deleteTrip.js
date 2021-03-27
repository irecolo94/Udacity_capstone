function deleteTrip(event) {
  // Remove trip from client
  const thisCard = document.getElementById(event)
  thisCard.remove()
  console.log(event)
  //delete trip from app endpoint
  fetch('http://localhost:4041/delete', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: event
    })
  })

}

export {
  deleteTrip
}
