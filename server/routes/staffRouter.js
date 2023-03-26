// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям staffController
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

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