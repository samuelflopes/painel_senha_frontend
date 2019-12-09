// Fazendo uma requisição https
const https = require ('https');

function criaBtn(idTagPai,classe,tipo,nome,valor,texto,acao){
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

function onclickBtn(){
    console.log('Click no botão');
}

function getTipoSenhaAPI(token){
    const tokenString = "Token" + token;

    let url = 'https://danielb.pythonanywhere.com/api/senha/tipo/';
    let options = {
        method: 'GET',
        headers: {
        "Authorization": tokenString
        }};
        let data = '';
        let apiRequest = http.require(url,options,function(response){
            console.log('OK');
            console.log('statusCode:', response.statusCode);

            response.on('data', chunk => {
                data +=chunk;
            });
            response.on('end',()=>{
                console.log('Done!');
                data = JSON.parse(data);
    
                for (var i = 0; i < data.length; i++){
                    let obj = data[i];
                    criaBtn('#divBtn',"button margin","button","tipoSenha",obj.id,obj.nome,onclick);
                }
            });
        });
        apiRequest.end();
}
//Criar a conta para acesso API e depois gerar o token
let token = 'xxxx';
window.onload = getTipoSenhaAPI(token);