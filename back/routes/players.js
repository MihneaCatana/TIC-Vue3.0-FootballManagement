const router = require("express").Router();
const PlayerController = require("../controllers/players");
const {authorize } = require("../middleware/authorize")

router.get("/", PlayerController.getAllPlayers);
router.post("/add",authorize, PlayerController.addPlayer);
router.put("/:playerId",authorize, PlayerController.updatePlayerById)
router.delete("/:playerId",authorize, PlayerController.deletePlayerById)

module.exports = router;