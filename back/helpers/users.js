const falso = require("@ngneat/falso")
const generateMockUser = () => {

    const roles = ["Manager", "Scouter", "Reporter", "Ultras"];
    const random = Math.floor(Math.random() * positions.length);

    return {
        name: falso.randFullName(),
        email: falso.randEmail({provider:'gmail', suffix:'com'}),
        password: falso.randPassword(),
        type :{
            role: roles[random],
            organization: falso.randFootballTeam()
        }
    };
};

module.exports = generateMockUser;
