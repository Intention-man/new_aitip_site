// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям blockController.
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const blockController = require("../controllers/blockController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post("/", checkRole("ADMIN"), blockController.create)
router.post("/update", checkRole("ADMIN"), blockController.updateBlock)
router.post("/move", checkRole("ADMIN"), blockController.moveBlocks)
router.post("/remove/:id", checkRole("ADMIN"), blockController.removeBlock)

router.get("/", blockController.getAllBlocks)
router.get("/lines", blockController.getAllLines)
router.get("/:id", blockController.getOneBlock)

module.exports = router