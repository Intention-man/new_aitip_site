// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям ScheduleController

const Router = require("express")
const router = new Router()
const scheduleController = require("../controllers/scheduleController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", scheduleController.create)
router.post("/update", scheduleController.updateSchedule)
router.post("/remove/:id", scheduleController.removeSchedule)
router.get("/", scheduleController.getAll)


module.exports = router