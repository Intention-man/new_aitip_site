const Router = require("express")
const router = new Router()
const staffRouter = require("./staffRouter")
const directionBachelorRouter = require("./directionBachelorRouter")
const userRouter = require("./userRouter")


router.use("/staff", staffRouter)
router.use("/direction_bachelor", directionBachelorRouter)
router.use("/user", userRouter)



module.exports = router