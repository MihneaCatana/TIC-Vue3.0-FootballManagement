const falso = require("@ngneat/falso")

const generateMockPlayer = (clubName) => {

    const positions = ["Attacker", "Midfielder", "Defender", "Goalkeeper"];
    const random = Math.floor(Math.random() * positions.length);

    return {
        name:falso.randFullName({ gender: 'male' }),
        birthdate: falso.randBetweenDate({ from: new Date('10/07/1983'), to: new Date('10/07/2008') }),
        nationality: falso.randCountry(),
        marketValue: falso.randNumber({ min: 1, max: 300000000 }),
        currentClub: clubName || falso.randFootballTeam(),
        position: positions[random],
        pastTeams: [{team:falso.randFootballTeam(), year: falso.randPastDate().getFullYear() - falso.randNumber({min:5, max:7})},{team:falso.randFootballTeam(), year: falso.randPastDate().getFullYear()- falso.randNumber({min:1, max:4})}]
    };
};

module.exports = generateMockPlayer;
