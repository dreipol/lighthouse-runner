const {
    PSI,
    BrokenLink,
    Categories,
} = require('@dreipol/lighthouse-audits');

function extendConfig (config) {

    // configure path to be reported
    config.paths = [
        '/',
    ];

    // define a budget for the project
    config.budget = {
        performance: 90,
        pwa: 90,
        accessibility: 90,
        'best-practices': 90,
        dreipol: 90,
        seo: 90,
        psi: 90
    };


    // add custom audits
    config.report.audits.push(
        PSI.PSISpeedScoreAudit,
        PSI.PSIUsabilityScoreAudit,

        PSI.PSIHTMLSizeAudit,
        PSI.PSIImgSizeAudit,
        PSI.PSICssSizeAudit,
        PSI.PSICssResourcesAudit,
        PSI.PSIJsSizeAudit,
        PSI.PSIJsResourcesAudit,

        BrokenLink.BrokenLinkAudit,
    );

    // add custom data gatherer
    config.report.passes[0].gatherers.push(
        PSI.PSIGatherer,
        BrokenLink.BrokenLinkGatherer,
    );


    config.report.categories.psi = Categories.PSI;
    config.report.categories.dreipol = Categories.Dreipol;


    return config;
};

module.exports = extendConfig(require('@dreipol/lighthouse-config/config/base/desktop'));