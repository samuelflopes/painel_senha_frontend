// Fazendo uma requisição https
const https = require('https');

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

let onclickBtn = ($event) => {
    console.log('Click no botão');
    console.log($event.target);
    let id = $event.target.value;
    let nome = $event.target.innerText;
    console.log(id, nome);
    
    localStorage.setItem('cat.id', id);
    localStorage.setItem('cat.nome', nome);
    window.location.href = 'imprimindo.html'; // Redirecionando a uma nova Pagina;
}



// function btnGetSenha(){
//     var objSenha = document.getElementById("senha");
//     var objSenha = document.getElementById("senha");
// }

function getTipoSenhaAPI(token) {
    const tokenString = "Token " + token;

    let url = 'https://danielb.pythonanywhere.com/api/senha/categoria/';
    let options = {
        method: 'GET',
        headers: {
            "Authorization": tokenString
        }
    };
    let data = '';
    let apiRequest = https.request(url, options, function (response) {
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
//Criar a conta para acesso API e depois gerar o token
let token = 'af27e40d5f4ace1a507555a8d8f30b6707e34f21';
window.onload = getTipoSenhaAPI(token);