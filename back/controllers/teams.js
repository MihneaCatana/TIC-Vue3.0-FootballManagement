const {db} = require("../firebase/firebase")
const {collection, getDocs, updateDoc, deleteDoc,doc, addDoc, query, where} = require("firebase/firestore");

const teamsRef = collection(db,'teams')
const getAllTeams = async (req,res) =>{

    const snapshot = await getDocs(teamsRef);

    let teams = []
    snapshot.forEach(doc => {
        let currentPart = {...doc.data()}
        currentPart.id = doc.id;
        teams.push(currentPart)
    })

    if(teams.length === 0)
        return res.status(404).send({message:"No team found!"})

    return res.status(200).send(teams)
}

const getTeamsByLeague = async (req,res) => {

    let queryLeague = await query(teamsRef, where("league.name", "==", req.params.league))

    const snapshot = await getDocs(queryLeague);

    let teamsFound= [];
    snapshot.forEach(doc => {
        let currentPart = {...doc.data()}
        currentPart.id = doc.id;
        teamsFound.push(currentPart)
    })

    if(teamsFound.length === 0)
        return res.status(404).send({message:"No team found!"})

    return res.status(200).send(teamsFound)

}

const addTeam = async (req,res) =>{

    try {
        const trophies = req.body.trophies || 0;

        const team = {
            name: req.body.name,
            manager: req.body.manager,
            league: req.body.league,
            trophies: trophies
        }

        await addDoc(teamsRef, team);
        res.status(200).json({ message: "Team added" });

    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateTeamById = async (req,res) =>{

    try {
        const teamId = req.params.teamId;

        if(!teamId)
            return res.status(404).json({message:"Team not found!"})

        const trophies = req.body.trophies || 0;

        const updatedPlayerRef = doc(db,'teams', teamId)
        await updateDoc(updatedPlayerRef, {
            name: req.body.name,
            manager: req.body.manager,
            league: req.body.league,
            trophies: trophies
        })
        res.status(200).json({ message: "Player updated!" });

    }catch (err) {
        res.status(500).json({message:err.message})
    }
}

const deleteTeamById = async (req,res) =>{

    try {
        const teamId = req.params.teamId;

        if(!teamId)
            return res.status(404).json({message:"Team not found!"})

        const deleteTeamRef = doc(db,'teams', teamId)
        await deleteDoc(deleteTeamRef)
        res.status(200).json({ message: "Team deleted" });
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}


module.exports = {getAllTeams,getTeamsByLeague,addTeam,updateTeamById, deleteTeamById}