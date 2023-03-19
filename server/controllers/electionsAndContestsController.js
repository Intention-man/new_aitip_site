/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в electionsAndContestsRouter
*/


const ApiError = require("../error/ApiError")
const {ElectionsAndContests} = require("../models/defaultModels/electionsAndContestsModel");



class ElectionsAndContestsController {
    async create(req, res, next) {
        try{
            let {name, kind, applicationsAcceptanceDateStart, applicationsAcceptanceDateEnd, applicationsAcceptancePlace, eventDate, eventTime, eventPlace} = req.body

            let values = {name, kind, applicationsAcceptanceDateStart, applicationsAcceptanceDateEnd, applicationsAcceptancePlace, eventDate, eventTime, eventPlace}

            const electionsAndContests = await ElectionsAndContests.create(values)

            return res.json(electionsAndContests)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateEAC(req, res, next) {
        try {
            let {id, name, kind, applicationsAcceptanceDateStart, applicationsAcceptanceDateEnd, applicationsAcceptancePlace, eventDate, eventTime, eventPlace} = req.body

            const eAC = await ElectionsAndContests.findOne({
                where: {id},
            })

            let values = {name, kind, applicationsAcceptanceDateStart, applicationsAcceptanceDateEnd, applicationsAcceptancePlace, eventDate, eventTime, eventPlace}

            eAC.update(values, {where: {id}})
            return res.json(eAC)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeEAC(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await ElectionsAndContests.destroy({
            where: {id}
        })
        return res.json(id)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let electionsAndContests = await ElectionsAndContests.findAndCountAll({limit, offset})
        return res.json(electionsAndContests)
    }
}

module.exports = new ElectionsAndContestsController