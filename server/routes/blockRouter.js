// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям blockController

const Router = require("express")
const router = new Router()
const blockController = require("../controllers/blockController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", blockController.create)
router.get("/", blockController.getAllBlocks)
router.get("/lines", blockController.getAllLines)
router.post("/convert_files", blockController.convertFiles)

module.exports = router