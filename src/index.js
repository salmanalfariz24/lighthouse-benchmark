const chromeLauncher = require('chrome-launcher');
const printReport = require('./print');
const lhRunner = require('./lh-runner');
const { median, average, quantile } = require('./utils/collector');
const { METRICS } = require('./const');

function main(url, opts, config = null, runs = 1) {
	console.log('\n==== RUNNING BENCHMARK ====');
	return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(async (chrome) => {
		opts.port = chrome.port;

		const rangeHit = [];
		for (let index = 0; index < runs; index++) {
			rangeHit.push(index)
		}

		const reports = [];
		for (const i of rangeHit) {
			console.log(`Collecting ${i + 1} out of ${runs} runs`);
			const data = await lhRunner(url, opts, config);
			reports.push(data);
		}

		chrome.kill();

		console.log('\n==== RESULT SUMMARY ====');
		console.log(`
---------------------------------------------------------------------------------------------
Result for: ${url}
Test finish running on: ${new Date().toISOString()}
---------------------------------------------------------------------------------------------
		`);
		// console.log(JSON.stringify(reports, null, 2));

		const avg = average(reports, METRICS);
		printReport(avg, 'Average');

		const med = median(reports, METRICS);
		printReport(med, 'Median');

		const q75 = quantile(reports, METRICS, 0.75);
		printReport(q75, 'quantile 75');

		const q90 = quantile(reports, METRICS, 0.90);
		printReport(q90, 'quantile 90');

		process.exit(0);
	}).catch((error) => {
		console.log('[Error]: Fail to run chrome | ', error.toString());
		process.exit(1);
	});

}

const opts = {
	quiet: true,
	headless: true,
	disableStorageReset: true,
	blockedUrlPatterns: '*.googletagmanager',
	chromeFlags: ['--show-paint-rects', '--headless']
};

const conf = {
	extends: 'lighthouse:default',
	settings: {
		maxWaitForFcp: 15 * 1000,
		maxWaitForLoad: 35 * 1000,
		emulatedFormFactor: 'desktop',
		throttling: {
			rttMs: 40,
			throughputKbps: 10 * 1024,
			cpuSlowdownMultiplier: 1,
			requestLatencyMs: 0,
			downloadThroughputKbps: 0,
			uploadThroughputKbps: 0,
		},
		skipAudits: ['uses-http2'],
	},
};


try {
	main('https://31-beta-feature.tokopedia.com', opts, conf, 5);
} catch (error) {
	console.log('[benchmark] top level error: ', error);
}
