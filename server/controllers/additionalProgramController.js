/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в directionBachelorRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const {AdditionalProgram} = require("../models/admissionModels");



class AdditionalProgramController {
    async create(req, res, next) {
        try{
            let {name, kind, description, moduls, hours, form, cost, supervisorName, supervisorDescription} = req.body
            // console.log(name, kind, description, moduls, hours, form, cost, supervisorName, supervisorDescription)
            const {programImg, supervizorImg} = req.files
            console.log(programImg, supervizorImg)
            let fileNameProgramImg = uuid.v4() + ".jpg"
            await programImg.mv(path.resolve(__dirname, "..", "static", fileNameProgramImg))
            let fileNameSupervizorImg = uuid.v4() + ".jpg"
            await supervizorImg.mv(path.resolve(__dirname, "..", "static", fileNameSupervizorImg))
            console.log(fileNameProgramImg, fileNameSupervizorImg)

            const splitedModuls = JSON.parse(moduls)

            let values = {name, kind, description, moduls: splitedModuls, hours, form, cost, programImg: fileNameProgramImg, supervisorName, supervisorDescription, supervizorImg: fileNameSupervizorImg}

            const additionalProgram = await AdditionalProgram.create(values)

            return res.json(additionalProgram)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let additionalProgram = await AdditionalProgram.findAndCountAll({limit, offset})
        return res.json(additionalProgram)
    }

    async getOne(req, res) {
        const {id} = req.params
        console.log("Я в getOne")
        const program = await AdditionalProgram.findOne({
            where: {id},
        })
        return res.json(program)
    }
}

module.exports = new AdditionalProgramController