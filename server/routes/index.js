const Router = require("express")
const router = new Router()
const commonRouter = require("./commonRouter")
const staffRouter = require("./staffRouter")
const scheduleRouter = require("./scheduleRouter")
const directionBachelorRouter = require("./directionBachelorRouter")
const additionalProgramRouter = require("./additionalProgramRouter")
const electionsAndContestsRouter = require("./electionsAndContestsRouter")
const partnersRouter = require("./partnersRouter")
const blockRouter = require("./blockRouter")
const userRouter = require("./userRouter")


router.use("/block", blockRouter)
router.use("/common", commonRouter)
router.use("/staff", staffRouter)
router.use("/schedule", scheduleRouter)
router.use("/direction_bachelor", directionBachelorRouter)
router.use("/additional_program", additionalProgramRouter)
router.use("/elections_and_contests", electionsAndContestsRouter)
router.use("/partners", partnersRouter)
router.use("/user", userRouter)


module.exports = router