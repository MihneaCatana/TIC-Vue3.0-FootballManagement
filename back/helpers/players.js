const falso = require("@ngneat/falso")

const generateMockPlayer = (clubName) => {

    const positions = ["Attacker", "Midfielder", "Defender", "Goalkeeper"];
    const random = Math.floor(Math.random() * positions.length);

    return {
        name: falso.randFullName({gender: 'male'}),
        birthdate: falso.randBetweenDate({from: new Date('10/07/1983'), to: new Date('10/07/2008')}),
        nationality: falso.randCountry(),
        marketValue: falso.randNumber({min: 1, max: 300000000}),
        clubName: clubName || falso.randFootballTeam(),
        position: positions[random],
        pastTeams: [{
            team: falso.randFootballTeam(),
            year: falso.randPastDate().getFullYear() - falso.randNumber({min: 5, max: 7}),
            transferSum: falso.randNumber({min: 1, max: 300000000})
        },
            {
                team: falso.randFootballTeam(),
                year: falso.randPastDate().getFullYear() - falso.randNumber({min: 0, max: 4}),
                transferSum: falso.randNumber({min: 1, max: 300000000})
            }],
        stats: {
            goals: falso.randNumber({min: 0, max: 300}),
            assist: falso.randNumber({min: 0, max: 200}),
            redCards: falso.randNumber({min: 0, max: 15}),
            yellowCards: falso.randNumber({min: 0, max: 15}),
            averageScore: falso.randFloat({min: 1, max: 10})
        }
    };
};

module.exports = generateMockPlayer;
