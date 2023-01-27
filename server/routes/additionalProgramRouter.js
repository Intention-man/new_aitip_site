// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям directionBachelorController

const Router = require("express")
const router = new Router()
const additionalProgramController = require("../controllers/additionalProgramController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", additionalProgramController.create)
router.get("/", additionalProgramController.getAll)
router.get("/:id", additionalProgramController.getOne)

module.exports = router