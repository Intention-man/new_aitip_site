// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям additionalProgramController
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const additionalProgramController = require("../controllers/additionalProgramController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole("ADMIN"), additionalProgramController.create)
router.post("/update", checkRole("ADMIN"), additionalProgramController.updateProgram)
router.post("/remove/:id", checkRole("ADMIN"), additionalProgramController.removeProgram)
router.get("/", additionalProgramController.getAll)
router.get("/:id", additionalProgramController.getOne)

module.exports = router