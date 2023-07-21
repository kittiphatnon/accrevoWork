const express = require('express');
const app = express();
const port = 8000;
const quaotation = require('./quaotation');
const invoice = require('./invoice');
const receipt = require('./receipt');
const purchaseRequisition = require('./purchaseRequisition');
const purchaseOrder = require('./purchaseOrder');


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
/* app.get('/pdf', (req, res) => {
  invoice.generateInvoice((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Receipt
/* app.get('/pdf', (req, res) => {
  receipt.generateReceipt((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Purchase Requisition
/* app.get('/pdf', (req, res) => {
  purchaseRequisition.generatePurchaseRequisition((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Purchase Order
app.get('/pdf', (req, res) => {
  purchaseOrder.generatePurchaseOrder((err, data) => {
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
