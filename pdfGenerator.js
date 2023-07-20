const { jsPDF } = require('jspdf');
const fs = require('fs');
const https = require('https');

const items = {
  name: 'best'
};

const imgUrl = "https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80";

function generatePDF(callback) {
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text('Invoice Number:', 150, 70);
  doc.text(items.name, 60, 100);

  // Download the image and add it to the PDF
  https.get(imgUrl, (response) => {
    const chunks = [];

    response.on('data', (chunk) => {
      chunks.push(chunk);
    });

    response.on('end', () => {
      const imageData = Buffer.concat(chunks);

      doc.addImage(imageData, "JPEG", 15, 40, 18, 12); // Adjust the dimensions as needed

      const pdfPath = `./output-${Date.now()}.pdf`;

      doc.save(pdfPath);
      fs.readFile(pdfPath, (err, data) => {
        if (err) {
          console.error(`Error reading PDF file: ${err}`);
          callback(err);
        } else {
          callback(null, data);
        }

        fs.unlink(pdfPath, (err) => {
          if (err) {
            console.error(`Error deleting PDF file: ${err}`);
          }
        });
      });
    });
  }).on('error', (err) => {
    console.error(`Error downloading image: ${err}`);
    callback(err);
  });
}

module.exports = {
  generatePDF
};
