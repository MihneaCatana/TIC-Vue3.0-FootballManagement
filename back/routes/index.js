const router = require('express').Router();
const playerRouter = require("./players");
const teamRouter = require("./teams")
const userRouter = require("./user")

const GenerationController = require("../controllers/generate")

router.get("/generate", GenerationController.generateData)
router.use("/player", playerRouter);
router.use("/team", teamRouter)
router.use("/user",userRouter)

module.exports=router;