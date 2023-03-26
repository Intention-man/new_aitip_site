/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в additionalProgramRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const {AdditionalProgram} = require("../models/defaultModels/admissionModels");


class AdditionalProgramController {
    async create(req, res, next) {
        try{
            let {name, kind, description, modules, hours, form, cost, supervisorName, supervisorDescription, programImg, supervisorImg} = req.body
            // console.log(name, kind, description, modules, hours, form, cost, supervisorName, supervisorDescription)
            // const {programImg, supervisorImg} = req.files
            // console.log(programImg, supervisorImg)
            // let fileNameProgramImg = uuid.v4() + ".jpg"
            // await programImg.mv(path.resolve(__dirname, "..", "static", fileNameProgramImg))
            // let fileNameSupervisorImg = uuid.v4() + ".jpg"
            // await supervisorImg.mv(path.resolve(__dirname, "..", "static", fileNameSupervisorImg))
            // console.log(fileNameProgramImg, fileNameSupervisorImg)

            const splitedModules = JSON.parse(modules)
            let values = {name, kind, description, modules: splitedModules, hours, form, cost, programImg, supervisorName, supervisorDescription, supervisorImg}

            const additionalProgram = await AdditionalProgram.create(values)
            return res.json(additionalProgram)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateProgram(req, res, next) {
        try {
            let {id, name, kind, description, modules, hours, form, cost, supervisorName, supervisorDescription, programImg, supervisorImg} = req.body
            const program = await AdditionalProgram.findOne({
                where: {id},
            })
            // console.log(programImg, supervizorImg)
            // let fileNameProgramImg = uuid.v4() + ".jpg"
            // await programImg.mv(path.resolve(__dirname, "..", "static", fileNameProgramImg))
            // let fileNameSupervizorImg = uuid.v4() + ".jpg"
            // await supervizorImg.mv(path.resolve(__dirname, "..", "static", fileNameSupervizorImg))
            // console.log(fileNameProgramImg, fileNameSupervizorImg)

            const splitedModules = JSON.parse(modules)
            let values = {name, kind, description, modules: splitedModules, hours, form, cost, programImg, supervisorName, supervisorDescription, supervisorImg}

            program.update(values, {where: {id}})
            return res.json(program)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeProgram(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await AdditionalProgram.destroy({
            where: {id}
        })
        return res.json(id)
    }

    // GETTERS

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