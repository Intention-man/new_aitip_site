// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям commonController

const Router = require("express")
const router = new Router()
const commonController = require("../controllers/commonController")
const checkRole = require("../middleware/checkRoleMiddleware")


router.post("/convert_files", commonController.convertFiles)
router.get("/", commonController.getAllFiles)


module.exports = router