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
        autoHideMenuBar:true,
        show: false,
        webPreferences:{
            nodeIntegration:true
        }
    });
    // CARREGANDO A URL DA PAGINA COM O CONTEUDO PRINCIPAL
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    // ready-to-show, é executado quando o html estiver pronto para ser exibido.
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();

         //Abre as ferramentas de desenvolvimento quando o app é iniciado
        mainWindow.webContents.openDevTools();
    });

    //tipoSenha.loadURL(`file://${__dirname}/app/tipoSenha.html`);

});

app.on('window-all-close',() =>{
    app.quit();
});

// In the main process.
global.sharedObject = {
    id: 'Preferencial',
    id: 'Não Preferencial'
}






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