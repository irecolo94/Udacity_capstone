import html2PDF from 'jspdf-html2canvas';

function createPDF(event) {

  const domElement = document.getElementById(event)
  console.log(domElement)
  html2PDF(domElement, {
    html2canvas: {
      scrollX: 0,
      scrollY: -window.scrollY,
      onCORS: true
    },
    jsPDF: {
      format: 'a4'
    },
    imageType: 'image/jpeg',
    output: './media/geneate.pdf'
  })
}

export {
  createPDF
}
