const {
    PSI,
    BrokenLink,
    Categories,
    Meta,
} = require('@dreipol/lighthouse-audits');

const config = require('./desktop');

config.audits = [
    PSI.PSISpeedScoreAudit,
    PSI.PSIUsabilityScoreAudit,

    PSI.PSIHTMLSizeAudit,
    PSI.PSIImgSizeAudit,
    PSI.PSICssSizeAudit,
    PSI.PSICssResourcesAudit,
    PSI.PSIJsSizeAudit,
    PSI.PSIJsResourcesAudit,

    BrokenLink.BrokenLinkAudit,

    Meta.MetaAudit,
];

config.gatherers = [
    PSI.PSIGatherer,
    BrokenLink.BrokenLinkGatherer,
    Meta.MetaGatherer,
];
/*
categories: {
    psi: Categories.PSI,
    dreipol: Categories.Dreipol,
},
*/

module.exports = config;
