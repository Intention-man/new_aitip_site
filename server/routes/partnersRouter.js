// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям PartnersController

const Router = require("express")
const router = new Router()
const partnersController = require("../controllers/partnersController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", partnersController.create)
router.post("/update", partnersController.updatePartner)
router.post("/remove/:id", partnersController.removePartner)
router.get("/", partnersController.getAll)


module.exports = router