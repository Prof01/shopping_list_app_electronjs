const {
	BrowserWindow
} = require('electron');
const url = require("url");
const path = require("path");

let addWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true
    },
    width: 300,
    height: 200,
    title: 'Add Shopping List'
});

// Handle create Add Window.
function createAddItem(){
	
	// Load the HTML File into the window
	addWindow.loadURL(url.format({
		pathname: path.join(__dirname, '../assets/html/addWindow.html'),
		protocol: 'file:',
		slashes: true
	})) // The code above means: file://dirname/addWindow.html
	
	
	// Gabbage collection handled
	addWindow.on('closed', function(){
		addWindow = null;
	})
}

module.exports = {createAddItem, addWindow};