const router = require("express").Router();
const TeamController = require("../controllers/teams");
const {authorize } = require("../middleware/authorize")

router.get("/", TeamController.getAllTeams);
router.get("/:league", TeamController.getTeamsByLeague);
router.post("/add",authorize, TeamController.addTeam);
router.put("/:teamId",authorize,TeamController.updateTeamById)
router.delete("/:teamId",authorize, TeamController.deleteTeamById)

module.exports = router;