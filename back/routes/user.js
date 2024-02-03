const router = require("express").Router();
const AuthController = require("../controllers/auth")
const UserController = require("../controllers/users")
const {authorize} = require("../middleware/authorize")


router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.get("/:email", UserController.getUserByEmail)
router.get("/users/all", UserController.getAll)
router.put("/:userId", authorize, UserController.updateUserById)
router.delete("/:userId", authorize, UserController.deleteUserById)

module.exports = router;