const {app} = require("electron");
const excel = require('node-excel-export');
const {specification, merges, heading} = require('../model/excelExportSchema');
const Store = require('electron-store');
const schema = require('../model/store');
const store = new Store({schema});
const exportFile = require('./exportFile');

function exportToExcel() {
    
    const storeItems = store.get('items');
    let dataset;
    let totalAmount = 0;
    let prices = [0];

    if(storeItems === undefined){
        dataset = [];
    } else {
        // Assign Dataset the Array of Items
        dataset = storeItems;

        // Calculate the total sum and assign it to totalAmount
        storeItems.forEach(({price}, ind) => {
            if(ind){
                prices.push(parseFloat(price))
            }
            const sum = prices.reduce((a, b) => {
                return a + b;
            }, 0);
            totalAmount = sum.toFixed(2);
        })
    }

    total = {
        name: 'Total',
        price: totalAmount
    }

    dataset.push(total)
    // Create the excel report.
    // This function will return Buffer
    const report = excel.buildExport(
        [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
            {
                name: 'Report', // <- Specify sheet name (optional)
                heading: heading, // <- Raw heading array (optional)
                merges: merges, // <- Merge cell ranges
                specification: specification, // <- Report specification
                data: dataset // <-- Report data
            }
        ]
        );
    
    exportFile(['xlsx', 'xls'], "Excel Workbook", report)	

}

module.exports = exportToExcel;