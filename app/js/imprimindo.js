setTimeout(function () {
    window.location.href = 'index.html';
    //alert("Boom!"); TESTE DO BOOOMMM
}, 5500);

// pacotes instalados
// versão node 8.16.2
// "bcrypt": "^3.0.7",
// "canvas": "^2.6.0",
// "canvas-constructor": "^3.1.0",
// "canvas-prebuilt": "^2.0.0-alpha.14",
// "edge-cs": "^1.2.1",
// "edge-js": "^13.0.1",
// "electron": "^7.1.4",
// "electron-edge-js": "^12.8.1",
// "node-cls": "^1.0.3",
// "node-gyp": "^6.0.1",
// "node-native-printer": "^1.0.0-beta.5"
// -----------------------------------------------
// Para fazer os pacotes da impessora funcionar foi necessario ir nos modulo do node e ir na pasta node-native-printer
// acessar o arquivo .env e trocar o NNP_PACKAGE=edge-js para NNP_PACKAGE=electron-edge-js 

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

// Criando data no format para o Django
let date = String(new Date());

function toISOString(s) {
  let months = {jan:'01',feb:'02',mar:'03',apr:'04',may:'05',jun:'06',
                jul:'07',aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'};
  let newDate = date.split(' ');

  return newDate[3] + '-' +
         months[newDate[1].toLowerCase()] + '-' +
         ('0' + newDate[2]).slice(-2) + 'T' +
         newDate[4] + '.' +newDate[5].substr(4) + 'Z';
}

let dateTime = toISOString(date);



const imprimir = (data) => {

    let options = {
        "collate": true,
        "color": true,
        "copies": 1,
        "duplex": "Default",
        "Resolutions": "High"
    }
    let timestamp = data.hora_data.split('T');
    console.log(timestamp);
    let hour = timestamp[1].split('.');
    let fullDate = timestamp[0].split('-').reverse().join('/');
    let text = `           REGISTRO  ACADÊMICO \n\n            ${fullDate}         ${hour[0]} \n\n\n\n\n                           ${data.senha}\n\n\n\n\n Atendimento: ${tipo} \n Serviço: ${categoria} \n\n.` 
    printer.printText(text);
};


let params = {
    'tipo': tipo_id, 
    'categoria': cat_id,
    'hora_data': dateTime
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
