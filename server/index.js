// Main server file, that starts server app work and connect to database by db.js


require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const admission_models = require("./models/defaultModels/admissionModels")
const elections_and_contests_model = require("./models/defaultModels/electionOrContestModel")
const lab_models = require("./models/defaultModels/labModel")
const user_models = require("./models/defaultModels/userModels")
const staffer_models = require("./models/defaultModels/staffModel")
const partners_model = require("./models/defaultModels/partnerModel")
const schedule_model = require("./models/defaultModels/scheduleModel")
const custom_models = require("./models/customModels")
const file_wrapper_model = require("./models/fileWrapperModel")
const PORT = process.env.PORT || 7000
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const app = express()
const path = require("path")
// const postgres = require('postgres');

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "static")))
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()