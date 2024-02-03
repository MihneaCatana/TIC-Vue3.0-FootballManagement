const bcrypt = require("bcrypt");
const TokenService = require('../services/token')
const UserService = require("../services/user");
const {db} = require('../firebase/firebase')
const { collection, addDoc} = require("firebase/firestore")


const login = async (req, res) => {
    console.log("login", req.body)

    if(!req.body.email)
        res.status(406).send({message:"Invalid email "})

    let userFound = await UserService.findUserByEmail(req.body.email);
    console.log(userFound);
    if (!userFound) {
        return res
            .status(404)
            .send({ message: "No email related to an account was found" });
    }

    if(!req.body.password)
       return res.status(406).send({message:"Invalid password"})

    const validPass = bcrypt.compareSync(req.body.password, userFound.password);
    if (!validPass) {
        return res.status(400).send({ message: "Wrong password" });
    }


    const token = TokenService.createToken(userFound);
    res.send({
        token: "Bearer " + token
    });
};

const register = async (req, res) => {

    if(!req.body.email)
        res.status(406).send({message:"Invalid email "})

    let userFound = await UserService.findUserByEmail(req.body.email);
    if (userFound) {
        return res
            .status(409)
            .send({ message: "Exista deja un user cu acest email" });
    }
    const salt = bcrypt.genSaltSync(10);
    ePassword = bcrypt.hashSync(req.body.password, salt);
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: ePassword,
        creationDate: new Date()
    }

    try {
        const colRef = collection(db,'users')
        await  addDoc(colRef , user) ;
        return res.send({ message: "User created" });
    } catch (err) {
        return res.status(500).send({ message: "Error " + err })
    }
};

module.exports = {
    login,
    register
}