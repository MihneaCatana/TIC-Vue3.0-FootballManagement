const Helpers = require('../helpers');
const {db} = require('../firebase/firebase')
const {collection, addDoc} = require("firebase/firestore");
const generateData = async (req, res) => {
    let initializationCount = req.body.count ? req.body.count : 5;

    for (let i = 0; i < initializationCount; i++) {
        for(let j =0;j < 11;j++)
        {
            let team = Helpers.teams()
            await  addDoc(collection(db,'teams'), team);

            for(let k=0;k<=21;k++)
            {
                let player = Helpers.players(team.name)
                await addDoc(collection(db,'players'), player)
            }

        }
    }
    return res.status(200).send({ message: "generated successfully" });
}

module.exports ={generateData}