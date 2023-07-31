const { jsPDF } = require('jspdf');
const fs = require('fs');
const https = require('https');
const wordcut = require('wordcut');
const thaiBaht = require('./thaiBaht');
const engBaht = require('./engBaht');
const { get } = require('http');

const items = {
    documentItems: [
        {date: '01/01/2021', detail: 'ค่าเช่าบ้าน', amount: 10000.10},
        {date: '02/01/2021', detail: 'ค่าข้าว', amount: 10100.12},
        {date: '03/01/2021', detail: 'ค่าเดินทาง', amount: 12000.04},
        {date: '04/01/2021', detail: 'ค่านู่นนี่', amount: 14560.65},
        {date: '05/01/2021', detail: 'ค่านั่น', amount: 104680.78},
        {date: '06/01/2021', detail: 'ค่าอะไร', amount: 16786870.12},
    ],
    position: 'ผู้จัดการ',
    receiptNo: '0001',
    documentDate: '01/01/2021',
    receivePerson: 'นาย สมชาย ใจดี',
    approvePerson: 'นาย สมศักดิ์ ใจดี',
}

process.on('uncaughtException', function (err) {
    console.log(err);
});

async function generateCertification(callback) {
    const doc = new jsPDF();
    
    //หาจุดกึ่งกลางของช่อง
    function getStartPoint(text, width) {
        const textWidth = doc.getTextWidth(text);
        return (width - textWidth) / 2;
    }
    
    function getNumberStart(text, width) {
        const textWidth = doc.getTextWidth(text);
        return width - textWidth - 2;
    }

    //ดาวน์โหลดรูป
    function downloadImage(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (response) => {
                const chunks = [];
                
                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                
                response.on('end', () => {
                    const imageData = Buffer.concat(chunks);
                    resolve(imageData);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
    async function addImageToPDF(url,x,y,width,height){
        const imageData = await downloadImage(url);
        doc.addImage(imageData, "JPEG", x, y, width, height);
    }
    
    //import ภาษาไทย
    doc.addFont('THSarabunNew.ttf', 'THSarabunNew', 'normal');
    doc.addFont('THSarabunNewBold.ttf', 'THSarabunNew', 'bold');
    doc.setFontSize(12);
    doc.setFont('THSarabunNew','bold');
    
    
    await addImageToPDF('https://images.unsplash.com/photo-1690122991917-a06094f2e65d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=434&q=80', 95, 10, 20, 20);
    doc.setFontSize(20);
    doc.text('ใบรับรองแทนใบเสร็จรับเงิน', getStartPoint('ใบรับรองแทนใบเสร็จรับเงิน', 210), 40);
    doc.setFontSize(12);
    doc.text('จ่ายให้', 10 ,50)
    doc.text('เลขที่',120,50)
    doc.text('วันที่',120,60)
    doc.setDrawColor(141,141,141);
    doc.rect(10, 70, 190, 90);

    //ข้อมูลในส่วนบน
    doc.setFont('THSarabunNew','normal');
    doc.text(items.receivePerson, 30, 50);
    doc.text(items.receiptNo, 130, 50);
    doc.text(items.documentDate, 130, 60);

    //หัวตาราง
    doc.rect(10, 70, 190, 10);
    doc.text('วัน/เดือน/ปี', getStartPoint('วัน/เดือน/ปี',20) + 10, 75);
    doc.text('รายละเอียดรายจ่าย', getStartPoint('รายละเอียดรายจ่าย',120) + 30, 75);
    doc.text('บาท', getStartPoint('บาท',30) +150, 75);
    doc.text('สต.', getStartPoint('สต.',20) + 180, 75);

    //เส้นกั้นระหว่างช่อง
    doc.line(30,70,30,160);
    doc.line(150,70,150,160);
    doc.line(180,70,180,160);

    //เส้นแนวนอน
    doc.line(10,88,200,88);
    doc.line(10,96,200,96);
    doc.line(10,104,200,104);
    doc.line(10,112,200,112);
    doc.line(10,120,200,120);
    doc.line(10,128,200,128);
    doc.line(10,136,200,136);
    doc.line(10,144,200,144);
    doc.line(10,152,200,152);
    
    //ช้อมูลในตาราง
    for (const [index, item] of items.documentItems.entries()) {
        doc.setFont('THSarabunNew','normal');
        doc.text(item.date , 12, 85 + index*8);
        doc.text(item.detail, 32, 85+ index*8);
        doc.text(item.amount.toFixed(2).toString().split('.')[0], getNumberStart(item.amount.toFixed(2).toString().split('.')[0],30)+150, 85 + index*8);
        doc.text(item.amount.toFixed(2).toString().split('.')[1], getNumberStart(item.amount.toFixed(2).toString().split('.')[1],20)+180, 85 + index*8);
    }

    doc.setDrawColor(0,0,0);

    //Footer
    doc.text('ข้าพเจ้า' ,10 , 170);
    doc.text('ตำแหน่ง',105,170);
    doc.text('ขอรับรองว่า รายจ่ายข้างต้นนี้ไม่อาจเรียกเก็บใบเสร็จรับเงินจากผู้ได้รับได้ และข้าพเจ้าได้จ่ายไปในงานของทางกิจการโดยแท้',10,180);

    //ข้อมูลส่วนล่าง
    doc.text(items.receivePerson, 30, 170);
    doc.text(items.position, 120, 170);

    //ลายเซ็น
    doc.text('ลงชื่อ', 115, 200);
    doc.setLineWidth(0.1);
    doc.line(122.5, 202, 185, 202);
    doc.text('ผู้เบิกจ่าย', 186, 200);
    doc.line(122.5, 212, 185, 212);
    doc.text('(', 122.5, 210);
    doc.text(')', 185, 210);
    
    doc.text('ลงชื่อ', 115, 230);
    doc.setLineWidth(0.1);
    doc.line(122.5, 232, 185, 232);
    doc.text('ผู้อนุมัติ', 186, 230);
    doc.line(122.5, 242, 185, 242);
    doc.text('(', 122.5, 240);
    doc.text(')', 185, 240);

    //ลงชื่อ
    doc.text(items.receivePerson, getStartPoint(items.receivePerson, 62.5)+122.5, 210);
    doc.text(items.approvePerson, getStartPoint(items.approvePerson, 62.5)+122.5, 240);

    const pdfPath = `./output-${Date.now()}.pdf`;
    let saveDoc = doc
    
    saveDoc.save(pdfPath);
    
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
}


module.exports = {
    generateCertification
};
