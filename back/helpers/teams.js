const falso = require("@ngneat/falso")
const leagueGenerator = require("./leagues")
const generateMockTeam = () => {

    const mockLeague = leagueGenerator();

    return {
        name: falso.randFootballTeam(),
        league: mockLeague,
        trophies:{
            league: falso.randNumber({min:0,max:30}),
            domestic: falso.randNumber({min:0,max:20}),
            international: falso.randNumber({min:0,max:15})
        },
        manager: falso.randFullName()
    };
};

module.exports = generateMockTeam ;
