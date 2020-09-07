const lighthouse = require('lighthouse');

module.exports = async function runner(url, opts, config) {
	return lighthouse(url, opts, config).then(result => {
		const categories = result.lhr.categories || null;
		const audits = result.lhr.audits || null;

		return {
			performance: Math.round(categories['performance'].score * 100 || 0),
			accessibility: Math.round(categories['accessibility'].score * 100 || 0),
			'best-practices': Math.round(categories['best-practices'].score * 100 || 0),
			seo: Math.round(categories['seo'].score * 100 || 0),
			pwa: Math.round(categories['pwa'].score * 100 || 0),

			FCP: audits['first-contentful-paint'].numericValue || 0,
			LCP: audits['largest-contentful-paint'].numericValue || 0,
			TBT: audits['total-blocking-time'].numericValue || 0,
			TTI: audits['interactive'].numericValue || 0,
			CLS: audits['cumulative-layout-shift'].numericValue || 0,
			SI: audits['speed-index'].numericValue || 0,
		};
	}).catch((error) => {
		console.log('[Error]: Fail to collect metrics | ', error.toString());
	});
};
