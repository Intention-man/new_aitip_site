require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const admission_models = require("./models/admissionModels")
const moving_bar_models = require("./models/movingBarModels")
const user_models = require("./models/userModels")
const staffer_models = require("./models/staffModel")
const elections_and_contests_model = require("./models/electionsAndContestsModel")
const partners_model = require("./models/partnersModel")
const PORT = process.env.PORT || 7000
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const app = express()
const path = require("path")

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "static")))
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()

// Do not expose your Neon credentials to the browser
// .env


// app.js
// const postgres = require('postgres');
//
// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
//
// const sql = postgres(URL, { ssl: 'require' });
//
// async function getPgVersion() {
//     const result = await sql`select version()`;
//     console.log(result);
// }
//
// getPgVersion();
