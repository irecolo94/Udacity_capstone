function deleteTrip(event) {
  // event.preventDefault()
  // const cards = document.querySelectorAll('.card_container')
  // cards.forEach((card) => {
  //   const id = card.id
  //   console.log(id)
  //   const button = document.querySelector(`[data-name=${CSS.escape(id)}]`)
  //   console.log(button)
  //   button.addEventListener('click', () => {
  //   card.remove();
  //   })
  // })
  const thisCard = document.getElementById(event)
  thisCard.remove()
  console.log(event)

  // const toDelete = document.getElementById(`'${trip.uid}'`)
  // const oldEntries = document.createElement('div')


}

export { deleteTrip }
