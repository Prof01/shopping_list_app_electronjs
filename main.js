const electron = require("electron");
const url = require("url");
const path = require("path");
const schema = require('./model/store');
const Store = require('electron-store');
const exportFile = require('./functions/exportFile');
const exportToExcel = require('./functions/exportToExcel');
const store = new Store({schema});
const developerTools = require('./functions/developerTools');

// Check to see if schemas has values or not.
const itemsSchema = store.get('items');
const usersSchema = store.get('users');
const userSchema = store.get('user');
const isLoggedInSchema = store.get('isLoggedIn');

	if(itemsSchema == undefined){
		store.set('items', [{developer: 'Mohammed-Subreel Abdulai', number: '+233246911347'}])
	} 
	if(usersSchema == undefined){
		store.set('users', [[{developer: 'Mohammed-Subreel Abdulai', number: '+233246911347'}]])
	} 
	if(userSchema == undefined){
		store.set('user', {})
	} 
	if(isLoggedInSchema == undefined){
		store.set('isLoggedIn', false)
	} 
   
const {
	app,
	BrowserWindow,
	Menu,
	ipcMain,
	ipcRenderer
} = electron;


// SET TO PRODUCTION
// process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;
let loginWindow;
let registerWindow;

// Listen for app Main Window to be ready
app.on('ready', function () {
	// Create a new window
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		}
	});

	// Load the HTML File into the window
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/assets/html/mainWindow.html'),
		protocol: 'file:',
		slashes: true
	})) // The code above means: file://dirname/mainWindow.html
	
	// Close Entire App when the main window is closed
	mainWindow.on('closed', function(){
		app.quit()
	});

	// Bild menu from template
	mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	// Insert the Menu
	Menu.setApplicationMenu(mainMenu);
});

// Handle create Add Window
function createAddItem(){
	addWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		width: 300,
		height: 200,
		title: 'Add Shopping List'
	});
	
	// Load the HTML File into the window
	addWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/assets/html/addWindow.html'),
		protocol: 'file:',
		slashes: true
	})) // The code above means: file://dirname/addWindow.html
	
	
	// Gabbage collection handled
	addWindow.on('closed', function(){
		addWindow = null;
	})
}

// Handle login User Window
function loginUser(params) {
	loginWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		width: 350,
		height: 250,
		title: 'User Login'
	});

	// Load the Login HTML File into the window
	loginWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/assets/html/login.html'),
		protocol: 'file:',
		slashes: true
	})) // The code above means: file://dirname/login.html
	
	
	// Gabbage collection handled
	loginWindow.on('closed', function(){
		addWindow = null;
	})
}


// Catch item:add
ipcMain.on('item:add', function(e, item){
	let allItems = store.get('items');

	if(allItems == undefined){
		store.set('items', [])
		allItems = store.get('items');
	
		console.log(allItems);
	} 
	
	allItems.push({
		name: item.name,
		price: item.price
	})
	store.set('items', allItems)
	// Sends the items to the DOM
	mainWindow.webContents.send('item:add', allItems);
		
	addWindow.close()
})

// Catch items:clear
ipcMain.on('items:clear', function(e, items){
	store.delete(items)
	store.set('items', [{developer: 'Mohammed-Subreel Abdulai', number: '+233246911347'}])
})

// let loginState = false;
const username = 'msubreel';
const userPassword = '12345678';

store.set('user', {
	name: username,
	password: userPassword
})

// Catch user:login
ipcMain.on('user:login', function(e, user){
	const name = user.name.toLowerCase();
	const password = user.password;
	let loggedIn = store.get("isLoggedIn")
	console.log(name);
	console.log(loggedIn);
	const user1 = store.get("user")
	if(name === user1.name & password === user1.password) {
		store.set('user', {
			name: username,
			password: userPassword
		})
		store.set('isLoggedIn', true)
		// loginState = true;
	}
	// mainWindow.webContents.send('user:login', user)
	console.log(loggedIn);
	// app.off(() => {
	// 	return;
	// })
	// app.on(() => {
		
	// })
	if(loggedIn) {
		mainMenuTemplate.push(
			{
				label: 'Draft'
			}
		)
	};
	// loginWindow.close()
})


// Create menu template
const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Add Item',
				accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
				click(){
					createAddItem()
				}
			},
			{
				label: 'Clear Items',
				accelerator: process.platform == 'darwin' ? 'Command+C' : 'Ctrl+C',
				click() {
					mainWindow.webContents.send('items:clear')
				}
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit()
				}
			},
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Print',
				accelerator: process.platform == 'darwin' ? 'Command+P' : 'Ctrl+P',
				click(){
					mainWindow.webContents.print();
				}
			},
			{
				label: 'Save',
				accelerator: process.platform == 'darwin' ? 'Command+S' : 'Ctrl+S',
				click(){
					// const doc = new jsPDF({
					// 	orientation: 'portrait',
					// 	unit: 'in',
					// 	format: [4, 2]
					// });
					// doc.text('Goodbye World') 
					// doc.save('list.pdf')

					exportFile(['pdf'], "Portable Document Format", "Hello World")
					// mainWindow.webContents.print();
				}
			},
			{
				label: 'Export',
				accelerator: process.platform == 'darwin' ? 'Command+E' : 'Ctrl+E',
				click(){
					exportToExcel()
				}
			},
		]
	},
	{
		label: 'Login/Register',
		click(){
			loginUser();
		}
	},
]

// If mac add empty object to menu, in other to show file menu
if(process.platform == 'darwin') return mainMenuTemplate.unshift({});

// If App on Development Show developer Tools
developerTools(mainMenuTemplate);

// Send Items to Load items:
// const loadItems = store.get('items')
// if(loadItems == undefined) {
// 	ipcRenderer.send('items:load', [])

// } else {
// 	ipcRenderer.send('items:load', loadItems)	
// }
