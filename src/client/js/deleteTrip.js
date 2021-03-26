function deleteTrip(event) {

  const thisCard = document.getElementById(event)
  thisCard.remove()
  console.log(event)

  fetch('http://localhost:4041/delete', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: event})
        })

}

export { deleteTrip }
