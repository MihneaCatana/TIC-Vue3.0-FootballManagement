const falso = require("@ngneat/falso")

const generateMockLeague = () => {

    const country = falso.randCountry();

    return {
        name:  country + " League",
        nation:  country,
        tier: falso.rand(['First', 'Second', 'Third']) + " Tier",
    };
};

module.exports = generateMockLeague;
