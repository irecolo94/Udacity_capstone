import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function createPDF(event) {
    // event.preventDefault()
    console.log("fuck!")
    const domElement = document.getElementById('all_trip')
    html2canvas(domElement, { onclone: (document) => {
      document.getElementById('save_pdf').style.visibility = 'hidden'
      // document.getElementById('try').style.visibility = 'hidden'
},
onCORS: false})
    .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg')
        window.open(imgData)
        const pdf = new jsPDF();
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('your-filename.pdf')
})
}

export { createPDF }
