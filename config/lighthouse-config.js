module.exports = {
    extends: 'lighthouse:default',
    settings: {},
    passes: [
        {
            passName: 'extraPass',
            gatherers: [
                'js-usage',
            ],
        },
    ],
    audits: [
        'byte-efficiency/unused-javascript',
    ],
    // @ts-ignore TODO(bckenny): type extended Config where e.g. category.title isn't required
    categories: {
        performance: {
            auditRefs: [
                { id: 'unused-javascript', weight: 0, group: 'load-opportunities' },
            ],
        },
    },
};
