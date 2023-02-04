// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям newsController

const Router = require("express")
const router = new Router()
const newsController = require("../controllers/blockController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", newsController.create)
router.post("/convert_images", newsController.convertFiles)
router.get("/", newsController.getAll)
// router.get("/:id", newsController.getOne)

module.exports = router