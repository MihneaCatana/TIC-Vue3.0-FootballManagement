const {doc, updateDoc, deleteDoc, getDocs, collection} = require("firebase/firestore");
const {db} = require("../firebase/firebase");
const UserService = require("../services/user");

const getAll = async (req, res) => {

    const snapshot = await getDocs(collection(db, 'users'));

    let users = []
    snapshot.forEach(doc => {
        let currentPart = {...doc.data()}
        currentPart.id = doc.id;
        delete currentPart.password
        users.push(currentPart)
    })

    if (users.length === 0)
        return res.status(404).send({message: "No Users found!"})

    return res.status(200).send(users)
}


const getUserByEmail = async (req, res) => {

    let userFound = await UserService.findUserByEmail(req.params.email);

    if (!userFound) {
        return res.status(404).json({message: "User not found!"})
    }

    delete userFound.password;
    return res.status(200).send(userFound)

}

const updateUserById = async (req, res) => {

    try {
        const userId = req.params.userId;
        if (!userId)
            return res.status(404).json({message: "User not found!"})

        const updatedUserRef = doc(db, 'users', userId)
        await updateDoc(updatedUserRef, {
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
        })
        res.status(200).json({message: "User updated!"});

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deleteUserById = async (req, res) => {

    try {
        const userId = req.params.userId;
        if (!userId)
            return res.status(404).json({message: "User not found!"})

        const deleteUserRef = doc(db, 'users', userId)
        await deleteDoc(deleteUserRef)
        res.status(200).json({message: "User deleted"});
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {getAll, getUserByEmail, updateUserById, deleteUserById}