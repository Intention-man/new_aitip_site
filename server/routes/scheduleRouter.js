// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям ScheduleController
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const scheduleController = require("../controllers/scheduleController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", scheduleController.create)
router.post("/update", scheduleController.updateSchedule)
router.post("/remove/:id", scheduleController.removeSchedule)
router.get("/", scheduleController.getAll)


module.exports = router