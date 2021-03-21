import html2canvas from 'html2canvas'
// import jsPdf from 'jspdf'

function createPDF(event) {
    // event.preventDefault()
    console.log("fuck!")
    const domElement = document.getElementById('app')
    html2canvas(domElement, { onclone: (document) => {
      document.getElementById('save_pdf').style.visibility = 'hidden';
}})
    .then((canvas) => {
        const img = canvas.toDataURL('image/jpeg')
        window.open(img)
        // const pdf = new jsPDF()
        // pdf.addImage(imgData, 'JPEG', 0, 0, width, height)
        // pdf.save('your-filename.pdf')
})
}

export { createPDF }

// import { jsPDF } from 'jspdf'
// // import html2canvas from 'html2canvas'
//
// function createPDF(event) {
//   event.preventDefault()
//   // Default export is a4 paper, portrait, using millimeters for units
//   const doc = new jsPDF();
//
//   doc.text("Hello world!", 10, 10);
//   doc.save("a4.pdf");
//   // pdf.addHTML(document.body, function(){
//   //   {
//   //     pdf.save("test.pdf")
//   //   })
// }
//
