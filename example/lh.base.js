const {
    PSI,
    BrokenLink,
    Categories,
} = require('@dreipol/lighthouse-audits');

module.exports = function (config) {

    // configure path to be reported
    config.paths = [
        '/',
    ];

    //save generated reports here. Relative to the location of the config file
    config.folder = "./reports";

    // define a budget for the project
    config.budget = {
        performance: 90,
        pwa: 70,
        accessibility: 70,
        'best-practices': 70,
        dreipol: 95,
        seo: 95,
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

    // Add config for some gatherers
    config.report.passes[0].psi = {
        maxCssBytes: 1048576, // 1Mb
        maxHtmlBytes: 1048576, // 1Mb
        maxJsBytes: 1048576, // 1Mb
        maxImgBytes: 1048576, // 1Mb
    };

    // Add custom data gatherers
    config.report.passes[0].gatherers.push(
        PSI.PSIGatherer,
        BrokenLink.BrokenLinkGatherer,
    );

    // Add default categories
    config.report.categories.psi = Categories.PSI;
    config.report.categories.dreipol = Categories.Dreipol;

    return config;
};
