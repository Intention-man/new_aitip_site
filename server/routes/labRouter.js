// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям LabController
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const labController = require("../controllers/labController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole("ADMIN"), labController.create)
router.post("/update", checkRole("ADMIN"), labController.updateLab)
router.post("/remove/:id", checkRole("ADMIN"), labController.removeLab)

router.get("/", labController.getAll)


module.exports = router