const METRICS = {
    performance: {
        name: 'Performance',
        precision: 0,
    },
    accessibility: {
        name: 'Accessibility',
        precision: 0,
    },
    'best-practices': {
        name: 'Best Practices',
        precision: 0,
    },
    seo: {
        name: 'SEO',
        precision: 0,
    },
    pwa: {
        name: 'PWA',
        precision: 0,
    },
    FCP: {
        name: 'First Contentful Paint',
        precision: 4,
    },
    LCP: {
        name: 'Largest Contentful Paint',
        precision: 4,
    },
    TBT: {
        name: 'Total Blocking Time',
        precision: 4,
    },
    TTI: {
        name: 'Time To Interactive',
        precision: 4,
    },
    CLS: {
        name: 'Cumulative Layout Shift',
        precision: 4,
    },
    SI: {
        name: 'Speed Index',
        precision: 4,
    },
};

module.exports = {
    METRICS,
};