setTimeout(function () {
    window.location.href = 'index.html';
    //alert("Boom!"); TESTE DO BOOOMMM
}, 5000);


const printer = require('node-native-printer');
const fs = require('fs');
const os = require('os');

const https = require('https');
const querystring = require('querystring');

const { Canvas } = require("canvas-constructor");

let cat_id = localStorage.getItem('cat.id');
let tipo_id = localStorage.getItem('tipo.id');
let categoria = localStorage.getItem('cat.nome');
let tipo = localStorage.getItem('tipo.nome');
let date = new Date();
let hour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
let now = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}.${date.getSeconds()}Z`;


const imprimir = (data) => {
    // var buf = layout(data);
    // fs.writeFileSync( os.tmpdir() + "/tmp.png", buf);

    let options = {
        "collate": true,
        "color": true,
        "copies": 1,
        "duplex": "Default",
        "Resolutions": "High"
    }
    let timestamp = data.hora_data.split('T');
    console.log(timestamp);
    //let hour = timestamp[1].split('.');
    let fullDate = timestamp[0].split('-').reverse().join('/');
    let text = `           REGISTRO  ACADÊMICO \n\n            ${fullDate}         ${hour} \n\n\n\n\n                           ${data.senha}\n\n\n\n\n Atendimento: ${tipo} \n Serviço: ${categoria} \n\n.` 
    // printer.print(os.tmpdir() + "/tmp.png", options, 'PrinterName');
    printer.printText(text);
};


let params = {
    'tipo': tipo_id, 
    'categoria': cat_id
};

let postData = querystring.stringify(params);

const getTipoSenhaAPI = (token) => {
    const tokenString = "Token " + token;
    

    let url = 'https://danielb.pythonanywhere.com/api/senha/';

    // Opções da requisição LER Informações do banco
    let options = {
        method: 'POST', // Requisição POST
        headers: {
            "Authorization": tokenString,
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    };


    let data = '';
    let apiRequest = https.request(url, options, function (response) { // requisição do REQUEST 'https'
        console.log('OK');
        console.log('statusCode:', response.statusCode);
        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            console.log('Done!');
            data = JSON.parse(data);
            console.log(data);
            imprimir(data);
        });
    });
    apiRequest.write(postData);
    
    apiRequest.end();
}

// Criar a conta para acesso API e depois gerar o token
let token = 'af27e40d5f4ace1a507555a8d8f30b6707e34f21';
window.onload = getTipoSenhaAPI(token);
