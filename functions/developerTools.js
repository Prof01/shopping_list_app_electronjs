
function developerTools(mainMenuTemplate) {
    // Add Developer tools if not in production
    if(process.env.NODE_ENV !== 'production') {
        mainMenuTemplate.push(
            {
                label: 'Developer tools',
                submenu: [
                    {
                        label: 'Toogle DevTools',
                        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                        click(item, focusedWindow){
                            focusedWindow.toggleDevTools()
                        }
                    },
                    {
                        role: 'reload'
                    }
                ]
            }
            )
    }

}

module.exports = developerTools;