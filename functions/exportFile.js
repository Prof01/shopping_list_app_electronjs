const {app} = require("electron");
const { dialog } = require("electron");
const fs = require('fs');
const path = require("path");

// Export File.
function exportFile(fileExt, fileType, data) {
	let toLocalPath = path.resolve(app.getPath('documents'), path.basename(''))
				dialog.showSaveDialog({
					defaultPath: toLocalPath, 
					filters: [
						{
						name: fileType,
						extensions: fileExt
					}
			]
		}).then(result => {
			const chosenPath = result.filePath;
			if(chosenPath){
				fs.writeFile(chosenPath, data, (err) => {
					if(err) {
						dialog.showErrorBox('Err', err)
						return;
					}
					console.log('Saved..');
				})
		}

		})
}

module.exports = exportFile;