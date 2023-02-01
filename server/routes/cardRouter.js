// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям newsController

const Router = require("express")
const router = new Router()
const cardController = require("../controllers/cardController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", cardController.create)
router.post("/convert_images", cardController.convertImages)
router.get("/", cardController.getAll)


module.exports = router