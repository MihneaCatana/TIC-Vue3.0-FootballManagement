const Helpers = require('../helpers');
const {db} = require('../firebase/firebase')
const {collection, addDoc} = require("firebase/firestore");
const leagueGenerator = require("../helpers/leagues");
const generateData = async (req, res) => {
    let initializationCount = req.body.count ? req.body.count : 6;

    for (let i = 0; i < initializationCount; i++) {

        let league = leagueGenerator();
        for(let j =0;j < 4;j++)
        {
            let team = Helpers.teams(league)
            await  addDoc(collection(db,'teams'), team);

            for(let k=0;k<=14;k++)
            {
                let player = Helpers.players(team.name)
                await addDoc(collection(db,'players'), player)
            }

        }
    }
    return res.status(200).send({ message: "generated successfully" });
}

module.exports ={generateData}