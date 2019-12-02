//main
// Pesquisar cada função do const
const {app,BrowserWindow,ipcMain} = require('electron');

// JANELA PRINCIPAL
//App inicializa a janela 
app.on('ready', () => { // (APP, GERENCIA EVENTOS)
    // Print Aplicação
    console.log('Aplicação inicial')
    let mainWindow = new BrowserWindow({
        fullscreen: true,
        width:800, //fullscreen  browser electron
        height:600,
        autoHideMenuBar:true,
        //x:50, // Separação de 50px no eixo X
        //y:50, // Separação de 50 px no eixo Y
        //resizable:false // Perguntar se a janela pode ser redimencionada ou não;
        show: false,
        webPreferences:{
            nodeIntegration:true
        }
    });
    // CARREGANDO A URL DA PAGINA COM O CONTEUDO PRINCIPAL
    //console.log(`${__dirname}`); 
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    // ready-to-show, é executado quando o html estiver pronto para ser exibido.
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    //tipoSenha.loadURL(`file://${__dirname}/app/tipoSenha.html`);

});

app.on('window-all-close',() =>{
    app.quit();
});









/*
// JANELA DE TIPO DE SENHA
let tipoSenha = null;
ipcMain.on('iniciar',() => {

    if (tipoSenha == null){
        let tipoSenha = new BrowserWindow({
            width:600,
            height:400,
            alwaysOnTop: true,
            frame: false // tira a barra de opções superior
    });
    tipoSenha.on('closed', ()=>{
        tipoSenha = null;
    })
}
tipoSenha.loadURL(`file://${__dirname}/app/tipoSenha.html`);
});

ipcMain.on('fechar-janela-sobre',() => {
    tipoSenha.close();
});
*/