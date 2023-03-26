// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям LabController

const Router = require("express")
const router = new Router()
const labController = require("../controllers/labController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", labController.create)
router.post("/update", labController.updateLab)
router.post("/remove/:id", labController.removeLab)
router.get("/", labController.getAll)


module.exports = router