// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям PartnersController
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const partnerController = require("../controllers/partnerController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole("ADMIN"), partnerController.create)
router.post("/update", checkRole("ADMIN"), partnerController.updatePartner)
router.post("/remove/:id", checkRole("ADMIN"), partnerController.removePartner)

router.get("/", checkRole("ADMIN"), partnerController.getAll)
router.post("/", partnerController.create)
router.post("/update", partnerController.updatePartner)
router.post("/remove/:id", partnerController.removePartner)
router.get("/", partnerController.getAll)


module.exports = router