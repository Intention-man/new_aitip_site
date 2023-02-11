// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям blockController

const Router = require("express")
const router = new Router()
const blockController = require("../controllers/blockController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", blockController.create)
router.post("/update", blockController.updateBlock)
router.post("/convert_files", blockController.convertFiles)

router.get("/", blockController.getAllBlocks)
router.get("/lines", blockController.getAllLines)
router.get("/:id", blockController.getOneBlock)

module.exports = router