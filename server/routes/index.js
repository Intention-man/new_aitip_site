// Every router - explorer between server controller class and client API functions set (from "client/src/http" folder). Where (in index.js) we associate each router with their relative reference by which we API functions send (GET and POST) responses to server

const Router = require("express")
const router = new Router()
const commonRouter = require("./commonRouter")
const staffRouter = require("./staffRouter")
const scheduleRouter = require("./scheduleRouter")
const directionBachelorRouter = require("./directionBachelorRouter")
const additionalProgramRouter = require("./additionalProgramRouter")
const LabRouter = require("./labRouter")
const electionOrContestRouter = require("./electionsOrContestRouter")
const partnersRouter = require("./partnerRouter")
const blockRouter = require("./blockRouter")
const userRouter = require("./userRouter")


router.use("/block", blockRouter)
router.use("/common", commonRouter)
router.use("/staff", staffRouter)
router.use("/schedule", scheduleRouter)
router.use("/direction_bachelor", directionBachelorRouter)
router.use("/additional_program", additionalProgramRouter)
router.use("/lab", LabRouter)
router.use("/elections_and_contests", electionOrContestRouter)
router.use("/partners", partnersRouter)
router.use("/user", userRouter)


module.exports = router