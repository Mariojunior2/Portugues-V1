import * as pdfjsLib from '/assets/pdfjs/pdf.mjs';
  
pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';

const url = '/assets/noticias/jornal.pdf';

let pdfDoc = null,
    pageNum = 1,
    canvas = document.getElementById('pdf-render'),
    ctx = canvas.getContext('2d');

function renderPage(num) {
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext);
  });
}

document.getElementById('prev').addEventListener('click', () => {
  if (pageNum <= 1) return;
  pageNum--;
  renderPage(pageNum);
});

document.getElementById('next').addEventListener('click', () => {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  renderPage(pageNum);
});

pdfjsLib.getDocument(url).promise.then(pdf => {
  pdfDoc = pdf;
  renderPage(pageNum);
  document.getElementById('page-count').textContent = pdfDoc.numPages;
});