// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям directionBachelorController
// Every response relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const directionBachelorController = require("../controllers/directionBachelorController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole("ADMIN"), directionBachelorController.create)
router.post("/update", checkRole("ADMIN"), directionBachelorController.updateDirection)
router.post("/remove/:id", checkRole("ADMIN"), directionBachelorController.removeDirection)
router.post("/remove_test/:id", checkRole("ADMIN"), directionBachelorController.removeTest)

router.get("/", directionBachelorController.getAll)
router.get("/:id", directionBachelorController.getOne)

module.exports = router