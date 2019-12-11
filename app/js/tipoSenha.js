const https = require('https');

// Function generica para criação de botão dinamica
const criaBtn = (idTagPai, classe, tipo, nome, valor, texto, acao) => {
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
const onclickBtn = ($event) => {
    console.log('Click no botão');
    let nome = $event.target.innerText;
    let id = $event.target.value;
    
    localStorage.setItem('tipo.id', id);
    localStorage.setItem('tipo.nome', nome);

    
    window.location.href = 'tipoServico.html'; // Passar p/ proxima página
}


//////////////////////////////////////////////////////////
const getTipoSenhaAPI = (token) => {
    const tokenString = "Token " + token;

    let url = 'https://danielb.pythonanywhere.com/api/senha/tipo/';

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

            for (var i = 0; i < data.length; i++) {
                let obj = data[i];
                criaBtn('#divBtn', "button margin", "button", "tipoSenha", obj.id, obj.nome, onclickBtn);
            }
        });
    });
    apiRequest.end();
}

// Criar a conta para acesso API e depois gerar o token
let token = 'af27e40d5f4ace1a507555a8d8f30b6707e34f21';
window.onload = getTipoSenhaAPI(token);