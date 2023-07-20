const express = require('express');
const app = express();
const port = 8000;
const quaotation = require('./quaotation');
const invoice = require('./invoice');
 //Quaotation
/* app.get('/pdf', (req, res) => {
  quaotation.generateQuatation((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Invoice
app.get('/pdf', (req, res) => {
  invoice.generateInvoice((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
