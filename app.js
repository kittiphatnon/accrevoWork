const express = require('express');
const app = express();
const port = 8000;
const quaotation = require('./quaotation');
// const invoice = require('./invoice');
// const receipt = require('./receipt');
// const purchaseRequisition = require('./purchaseRequisition');
// const purchaseOrder = require('./purchaseOrder');
// const billingNote = require('./billingNote');
// const goodsReceipt = require('./goodsReceipt');
// const serviceReceipt = require('./serviceReceipt');
// const payableNote = require('./payableNote');
// const paymentVoucher = require('./paymentVoucher');
const certificationofExpenses = require('./certificationofExpenses');

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
/* app.get('/pdf', (req, res) => {
  purchaseOrder.generatePurchaseOrder((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Billing Note
/* app.get('/pdf', (req, res) => {
  billingNote.generateBillingNote((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Goods Receipt
/* app.get('/pdf', (req, res) => {
  goodsReceipt.generateGoodsReceipt((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Service Receipt
/* app.get('/pdf', (req, res) => {
  serviceReceipt.generateServiceReceipt((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Payable Note
/* app.get('/pdf', (req, res) => {
  payableNote.generatePayableNote((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Payment Voucher
/* app.get('/pdf', (req, res) => {
  paymentVoucher.generatepaymentVoucher((err, data) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    }
  });
}); */

//Certification of Expenses
app.get('/pdf', (req, res) => {
  certificationofExpenses.generateCertification((err, data) => {
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
