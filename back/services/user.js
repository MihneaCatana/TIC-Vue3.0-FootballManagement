const {query,where, collection, getDocs} = require("firebase/firestore");
const db = require("../firebase/firebase").db

const findUserByEmail = async(email) => {
    let queryUser = await  query(collection(db,"users"), where("email", "==", email))

    let userFound;

    await getDocs(queryUser).then((querySnapshot)=>{
        if(!querySnapshot.empty){
            userFound = querySnapshot.docs[0].data();
            console.log("USER FOUND",userFound)
        } else {
            console.log("User not found!")
        }
    })
    return userFound;
};

module.exports = {findUserByEmail};