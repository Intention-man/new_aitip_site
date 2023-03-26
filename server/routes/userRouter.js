// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям userController
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.get("/auth", authMiddleware, userController.check)


module.exports = router