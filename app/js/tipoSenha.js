const https = require('https');

// Function generica para criação de botão dinamica
function criaBtn(idTagPai, classe, tipo, nome, valor, texto, acao) {
    var element = document.createElement("button");
    element.className = classe;
    element.type = tipo;
    element.name = nome;
    element.value = valor;
    element.textContent = texto;
    element.onclick = acao;

    var tagPai = document.querySelector(idTagPai);
    tagPai.append(element);
}

// Ação dos butões ao serem clicados
function onclickBtn() {
    console.log('Click no botão');
    window.location.href='tipoServico.html'; // Passar p/ proxima página
        // In page 1.
    require('electron').remote.getGlobal('sharedObject').element.value = 'valor'
}

function getTipoSenhaAPI(token) {
    const tokenString = "Token " + token;

    let url = 'https://danielb.pythonanywhere.com/api/senha/tipo/';

    // Opções da requisição LER Informações do banco
    let options = {
        method: 'GET', // Requisição GET
        headers: {
            "Authorization": tokenString
        }
    };

    // 
    let data = '';
    let apiRequest = https.request(url, options, function(response) { // requisição do REQUEST 'https'
        console.log('OK');
        console.log('statusCode:', response.statusCode);

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            console.log('Done!');
            data = JSON.parse(data);
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                let obj = data[i];
                criaBtn('#divBtn', "button margin", "button", "tipoSenha", obj.id, obj.nome, onclickBtn);
            }
        });
    });
    apiRequest.end();
}
// Criar a conta para acesso API e depois gerar o token
let token = 'c05a60720dc95aba6542c9aa673d87701a6a607b';
window.onload = getTipoSenhaAPI(token);