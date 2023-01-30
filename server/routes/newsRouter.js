// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям newsController

const Router = require("express")
const router = new Router()
const newsController = require("../controllers/newsController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", newsController.create)
router.post("/convert_images", newsController.convertImages)
router.get("/", newsController.getAll)
// router.get("/:id", newsController.getOne)

module.exports = router