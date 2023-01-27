// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям directionBachelorController

const Router = require("express")
const router = new Router()
const directionBachelorController = require("../controllers/directionBachelorController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", directionBachelorController.create)
router.get("/", directionBachelorController.getAll)
router.get("/:id", directionBachelorController.getOne)

module.exports = router