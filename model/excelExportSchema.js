const styles = require('./styles');

//Array of objects representing heading rows (very top)
const heading = [
	[{value: 'My Shopping List - Powered By: KartArica Solutions', style: styles.headerDark}, {value: 'Powered By: KartAfrica Solutions', style: styles.headerDark}],
	['a2', 'b2'] // <-- It can be only values
  ];

  //Here you specify the export structure
const specification = {
	name: { // <- the key should match the actual data key
	  displayName: 'Item Name', // <- Here you specify the column header
	  headerStyle: styles.headerPink, // <- Header style
	  cellStyle: styles.cellGreen,
	  width: 220, // <- width in pixels
	},
	price: {
		displayName: 'Price (GHS)',
	  headerStyle: styles.headerPink,
	  cellStyle: styles.cellPink, // <- Cell style
	  width: 150, // <- width in pixels
	}
  }
   
 
  const merges = [
	{ start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
	{ start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
	{ start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
  ]
 

module.exports = {specification, merges, heading};