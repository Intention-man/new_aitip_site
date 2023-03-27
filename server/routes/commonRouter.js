// Относительные ссылки в серверных запросах, связанных с БД. Работающие благодаря функциям commonController
// Every response's relative reference associate with controller function, which execute the request and return the response. If response - GET-type, it returns what we need; if POST-type - returns data similar with what we sent (to confirm that the execution was successful)

const Router = require("express")
const router = new Router()
const commonController = require("../controllers/commonController")
const checkRole = require("../middleware/checkRoleMiddleware")


router.post("/convert_files", checkRole("ADMIN"), commonController.convertFiles)
router.post("/update_file_usages", checkRole("ADMIN"), commonController.updateFileUsages)
router.post("/delete_all_unused_files", checkRole("ADMIN"), commonController.deleteAllUnusedFiles)

router.get("/", commonController.getAllFiles)


module.exports = router