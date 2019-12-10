const printer = require('node-native-printer');
const fs = require('fs');
const os = require('os');
const Canvas = require("canvas");


let printerList = printer.listPrinters();
console.log(printerList);
printer.setPrinter('EPSON TM-L90 Liner-Free (1)');


const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

 
// Write "Awesome!"
//ctx.font = '10px Corbel Light'
ctx.font = '10px serif';
ctx.textAlign = 'center'
ctx.fillText('Registro    Acadêmico', 100, 20);
ctx.textAlign = 'center'
ctx.font = '20px serif';
ctx.fillText('001', 100, 50);
ctx.textAlign = 'center'
ctx.font = '25px serif';
ctx.fillText('', 100, 100);

var buf = canvas.toBuffer();
fs.writeFileSync( os.tmpdir() + "/tmp.png", buf);

let options = {
    "collate": true,
    "color": true,
    "copies": 1,
    "duplex": "Default",
    "Resolutions": "High"
}


window.location.href = 'ticket.html';


//printer.print(os.tmpdir() + "/tmp.png", options, 'PrinterName');
