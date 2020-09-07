const math  = require('mathjs');
const { sortAsc } = require('./abstraction');

function median(arr, metrics) {
	const keys = Object.keys(metrics);
	const report = {};
	
    keys.forEach((key) => {
		const { name, precision } = metrics[key];
		const values = arr.map((value) => value[key]);
		const sort = sortAsc(values);

		const result = math.median(sort);
		report[name] = math.round(result, precision);
    });
    
    return report;
};

function average(arr, metrics) {
	const keys = Object.keys(metrics);
	const report = {};

    keys.forEach((key) => {
		const { name, precision } = metrics[key];
		const values = arr.map((value) => value[key]);
		const sort = sortAsc(values);

		const result = math.mean(sort)
		report[name] = math.round(result, precision);
	});
	
	return report;
}

function quantile(arr, metrics, q) {
	const keys = Object.keys(metrics);
	const report = {};

    keys.forEach((key) => {
		const { name, precision } = metrics[key];
		const values = arr.map((value) => value[key]);
		const sort = sortAsc(values);

		const result = math.quantileSeq(sort, q);
		report[name] = math.round(result, precision);
	});
	
	return report;
}

module.exports = {
	median,
	average,
	quantile,
};
