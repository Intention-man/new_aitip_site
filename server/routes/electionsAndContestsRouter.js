// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям ElectionsAndContestsController

const Router = require("express")
const router = new Router()
const electionsAndContestsController = require("../controllers/electionsAndContestsController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", electionsAndContestsController.create)
router.get("/", electionsAndContestsController.getAll)


module.exports = router