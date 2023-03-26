// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям PartnersController
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const partnersController = require("../controllers/partnersController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", partnersController.create)
router.post("/update", partnersController.updatePartner)
router.post("/remove/:id", partnersController.removePartner)
router.get("/", partnersController.getAll)


module.exports = router