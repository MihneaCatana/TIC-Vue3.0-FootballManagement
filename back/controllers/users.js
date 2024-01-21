const {doc, updateDoc, deleteDoc} = require("firebase/firestore");
const {db} = require("../firebase/firebase");
const updateUserById = async (req,res) =>{

    try {
        const userId = req.params.userId;
        if(!userId)
            return res.status(404).json({message:"User not found!"})

        const updatedUserRef = doc(db,'users', userId)
        await updateDoc(updatedUserRef, {
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
        })
        res.status(200).json({ message: "User updated!" });

    }catch (err) {
        res.status(500).json({message:err.message})
    }
}

const deleteUserById = async (req,res) =>{

    try {
        const userId = req.params.userId;
        if(!userId)
            return res.status(404).json({message:"User not found!"})

        const deleteUserRef = doc(db,'users', userId)
        await deleteDoc(deleteUserRef)
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

module.exports = {updateUserById, deleteUserById }