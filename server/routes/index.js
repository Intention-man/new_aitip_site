const Router = require("express")
const router = new Router()
const commonRouter = require("./commonRouter")
const staffRouter = require("./staffRouter")
const directionBachelorRouter = require("./directionBachelorRouter")
const additionalProgramRouter = require("./additionalProgramRouter")
const electionsAndContestsRouter = require("./electionsAndContestsRouter")
const partnersRouter = require("./partnersRouter")
const blockRouter = require("./blockRouter")
const userRouter = require("./userRouter")


router.use("/common", commonRouter)
router.use("/staff", staffRouter)
router.use("/direction_bachelor", directionBachelorRouter)
router.use("/additional_program", additionalProgramRouter)
router.use("/elections_and_contests", electionsAndContestsRouter)
router.use("/partners", partnersRouter)
router.use("/block", blockRouter)
router.use("/user", userRouter)


module.exports = router