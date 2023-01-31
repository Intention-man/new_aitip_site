/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в staffRouter
*/

const uuid = require("uuid")
const path = require("path")
const {Staffer} = require("../models/defaultModels/staffModel")
const ApiError = require("../error/ApiError")
const { Op } = require('sequelize')


class StaffController {
    async create(req, res, next) {
        console.log()
        try{
            let {name, post, academic_degree, academic_title, directions_bac, programs_add, bio_text, disciplines_and_courses_text, publications_text, projects_text, email, phone_number, adress} = req.body

            const splitedDirectionsBac = JSON.parse(directions_bac)
            const splitedProgramsAdd= JSON.parse(programs_add)
            console.log(splitedDirectionsBac, splitedProgramsAdd)

            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, "..", "static", fileName))

            const staff = await Staffer.create({name, post, academic_degree, academic_title, directions_bac: splitedDirectionsBac, programs_add: splitedProgramsAdd, bio_text, disciplines_and_courses_text, publications_text, projects_text, email, phone_number, adress, img: fileName})
            return res.json(staff)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let {directions_bac, program_add, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = limit * (page - 1)
        let staff;

        if (!directions_bac && !program_add) {
            staff = await Staffer.findAndCountAll({limit, offset, order: [
                ['name']]})
            console.log("staffController, f getAll noParams")
        }
        if (!directions_bac && program_add) {
            staff = await Staffer.findAndCountAll({limit, offset, order: [
                    ['name']], where: {subjects_add: {[Op.contains]: program_add}}})
        }
        if (!directions_bac && program_add) {
            staff = await Staffer.findAndCountAll({limit, offset, order: [
                    ['name']], where: {subjects_bac: {[Op.contains]: directions_bac}}})
        }
        if (directions_bac && program_add) {
            staff = await Staffer.findAndCountAll({limit, offset, order: [
                    ['name']], where: {[Op.and]: [{subjects_bac: {[Op.contains]: directions_bac}}, {subjects_add: {[Op.contains]: program_add}}]}})
        }
        return res.json(staff)
    }

    async getOne(req, res) {
        const {id} = req.params
        const staffer = await Staffer.findOne({
            where: {id},
        })
        return res.json(staffer)
    }
}

module.exports = new StaffController