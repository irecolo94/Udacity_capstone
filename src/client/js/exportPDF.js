import html2PDF from 'jspdf-html2canvas';

function createPDF(event) {

  const domElement = document.getElementById(event)
  console.log(domElement)

  html2PDF(domElement, {
    margin: [15,15],
    html2canvas: {
      scrollX: 0,
      scrollY: -window.scrollY,
      onCORS: true,
      scale: 2,
      letterRendering: true,
      // windowWidth: domElement.scrollWidth,
      windowHeight: domElement.scrollHeight
    },
    jsPDF: {
      unit: 'pt', format: 'letter', orientation: 'landscape'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    imageType: 'image/jpeg',
    output: './media/geneate.pdf'
  })
}

export {
  createPDF
}
