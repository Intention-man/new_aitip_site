/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в staffRouter
*/


const ApiError = require("../error/ApiError")
const { Op } = require('sequelize')
const {Schedule} = require("../models/defaultModels/scheduleModel");
const {Partners} = require("../models/defaultModels/partnersModel");


class ScheduleController {
    async create(req, res, next) {
        try{
            let {name, group, fileLink} = req.body
            const schedule = await Schedule.create({name, group, fileLink})
            return res.json(schedule)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateSchedule(req, res, next) {
        try {
            let {id, name, group, fileLink} = req.body
            const schedule = await Schedule.findOne({
                where: {id},
            })
            schedule.update({name, group, fileLink}, {where: {id}})

            return res.json(schedule)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeSchedule(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await Schedule.destroy({
            where: {id}
        })
        return res.json(id)
    }

    // getters

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let schedule = await Schedule.findAndCountAll({limit, offset})
        return res.json(schedule)
    }

    async getOne(req, res) {
        const {id} = req.params
        const schedule = await Schedule.findOne({
            where: {id},
        })
        return res.json(schedule)
    }
}

module.exports = new ScheduleController