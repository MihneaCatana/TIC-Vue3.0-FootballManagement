const {db} = require("../firebase/firebase")
const {collection, getDocs, updateDoc, deleteDoc, doc, addDoc} = require("firebase/firestore");

const playersRef = collection(db, 'players')
const getAllPlayers = async (req, res) => {

    const snapshot = await getDocs(playersRef);

    let players = []
    snapshot.forEach(doc => {
        let currentPart = {...doc.data()}
        currentPart.id = doc.id;
        players.push(currentPart)
    })

    if (players.length === 0)
        return res.status(404).send({message: "No player found!"})

    return res.status(200).send(players)
}

const addPlayer = async (req, res) => {

    try {

        const player = {
            name: req.body.name,
            birthdate: req.body.birthdate,
            nationality: req.body.nationality,
            marketValue: req.body.marketValue,
            clubName: req.body.clubName,
            position: req.body.position
        }

        await addDoc(playersRef, player);
        res.status(200).json({message: "Player added"});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const updatePlayerById = async (req, res) => {

    try {
        const playerId = req.params.playerId;

        if (!playerId)
            return res.status(404).json({message: "Player not found!"})

        const updatedPlayerRef = doc(db, 'players', playerId)
        await updateDoc(updatedPlayerRef, {
            name: req.body.name,
            birthdate: req.body.birthdate,
            nationality: req.body.nationality,
            marketValue: req.body.marketValue,
            clubName: req.body.clubName,
            position: req.body.position
        })
        res.status(200).json({message: "Player updated!"});

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deletePlayerById = async (req, res) => {

    try {
        const playerId = req.params.playerId;

        if (!playerId)
            return res.status(404).json({message: "Player not found!"})

        const deletePlayerRef = doc(db, 'players', playerId)
        await deleteDoc(deletePlayerRef)
        res.status(200).json({message: "Player deleted"});
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}


module.exports = {getAllPlayers, addPlayer, updatePlayerById, deletePlayerById}