//main
// Pesquisar cada função do const
const {app, BrowserWindow} = require('electron');

// JANELA PRINCIPAL
//App inicializa a janela 
app.on('ready', () => { // (APP, GERENCIA EVENTOS)
    // Print Aplicação
    console.log('Starting Application...')
    let mainWindow = new BrowserWindow({
        fullscreen: true,
        autoHideMenuBar: true,
        show: false,
        webPreferences:{
            nodeIntegration: true
        }
    });
    // CARREGANDO A URL DA PAGINA COM O CONTEUDO PRINCIPAL
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    // ready-to-show, é executado quando o html estiver pronto para ser exibido.
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        // mainWindow.webContents.openDevTools();

    });


});

app.on('window-all-close',() =>{
    app.quit();
});

