// Main da Aplicação geral
const {app,BrowserWindow,ipcMain} = require('electron');
let mainWindow = null;

//JANELA PRINCIPAL

//App inicializa a janela
app.on('ready',() =>{ //APP GERENCIA EVENTOS
    //print da Aplicação
    console.log('Aplicação inicial');
    mainWindow = new BrowserWindow({
        fullscreen: true,
        //width:800,
        //height:600,
        autoHideMenuBar: true,

        show: false,
        webPreferences:{
            nodeIntegration:true
        }
    });
    // CARREGANDO A URL DA PAGINA COM O CONTEUDO PRINCIPAL
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    //ready-to-show, é executado quando o html estiver pronto para ser exibido.
    mainWindow.on(ready-to-show,()=>{
        mainWindow.show();

        //Abre as ferramentas de desenvolvimento quando o app é iniciado
        mainWindow.webContents.openDevTools();
    });
});

app.on('window-all-closed',() => {
    app.quit();

});


