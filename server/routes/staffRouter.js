// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям staffController


const Router = require("express")
const router = new Router()
const staffController = require("../controllers/staffController")
const checkRole = require("../middleware/checkRoleMiddleware")


router.post("/", staffController.create)
router.post("/update", staffController.updateStaffer)
router.post("/remove/:id", staffController.removeStaffer)
router.get("/", staffController.getAll)
router.get("/:id", staffController.getOne)


module.exports = router