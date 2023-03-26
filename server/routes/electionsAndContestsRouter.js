// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям electionsAndContestsController
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const electionsAndContestsController = require("../controllers/electionsAndContestsController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", electionsAndContestsController.create)
router.post("/update", electionsAndContestsController.updateEAC)
router.post("/remove/:id", electionsAndContestsController.removeEAC)
router.get("/", electionsAndContestsController.getAll)


module.exports = router