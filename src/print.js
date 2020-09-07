const { table, getBorderCharacters } = require('table');

const opts = {
	columns: {
		0: {
			width: 30
		},
	},
	drawHorizontalLine: (index, size) => {
		return index === 0 || index === 1 || index === size;
	}
};

module.exports = function print(report, name) {
	const keys = Object.keys(report);

	const data = [['Metrics', 'Value']];
	keys.forEach((key) => {
		data.push([key, report[key]]);
	});


	const output = table(data, opts);    
    console.log(`\n======== ${name} ========`);
	console.log(output);
};