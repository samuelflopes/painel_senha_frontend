
const https = require('https');

//Acessando cada posição

const divsSelect  = (data) => {

        // .value = data[0].senha.guiche;
        var div1 = document.getElementById('senhaAtualNumero');
        div1.innerText = "" + data.slice(-1)[0].senha +" "+ data.slice(-1)[0].guiche;

        // .value = data[1].senha.guiche;
        var div2 = document.getElementById('ultimaSenhaNumero');
        div2.innerText = "" + data.slice(-2)[0].senha +" "+ data.slice(-2)[0].guiche;

        // .value = data[2].senha.guiche;
        var div3 = document.getElementById('anteriorSenhaNumero');
        div3.innerText = "" + data.slice(-3)[0].senha +" "+ data.slice(-3)[0].guiche;

        // .value = data[3].senha.guiche;
        var div4 = document.getElementById('antepenultimaSenhaNumero');
        div4.innerText = "" + data.slice(-4)[0].senha +" "+ data.slice(-4)[0].guiche;
    
}


//////////////////////////////////////////////////////////
const getSenhaAPI = (token) => {
    const tokenString = "Token " + token;

    let url = 'https://danielb.pythonanywhere.com/api/senha/fila/';

    // Opções da requisição LER Informações do banco
    let options = {
        method: 'GET', // Requisição GET
        headers: {
            "Authorization": tokenString
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
            divsSelect(data);
        });
    });

    apiRequest.end();
}

// Criar a conta para acesso API e depois gerar o token
let token = '6af3a823498cf3696aaefd8fae0b8cfea4747e46';

// chamando as senhas na fila pela primeira vez
getSenhaAPI(token);


// chamando a função para verificar se há novas senhas na fila a cada 6 segundos 
setInterval(function () {
    getSenhaAPI(token);
}, 10000);

