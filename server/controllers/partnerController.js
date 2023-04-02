/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в partnersRouter
*/

const ApiError = require("../error/ApiError")
const {Partner} = require("../models/defaultModels/partnerModel");


class PartnerController {
    async create(req, res, next) {
        try{
            const {name, kind, logo, description, jointProjectsDescription, jointProjectsPhotos} = req.body
            const splitedJointProjectsPhotos = JSON.parse(jointProjectsPhotos)

            let values = {name, kind, description, logo, jointProjectsDescription, jointProjectsPhotos: splitedJointProjectsPhotos}
            const partners = await Partner.create(values)

            return res.json(partners)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updatePartner(req, res, next) {
        try {
            let {id, name, kind, logo, description, jointProjectsDescription, jointProjectsPhotos} = req.body
            console.log("Controller")
            const splitedJointProjectsPhotos = JSON.parse(jointProjectsPhotos)

            const partner = await Partner.findOne({
                where: {id},
            })
            console.log("partner: ", partner)
            let values = {name, kind, description, logo, jointProjectsDescription, jointProjectsPhotos: splitedJointProjectsPhotos}

            partner.update(values, {where: {id}})
            return res.json(partner)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removePartner(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await Partner.destroy({
            where: {id}
        })
        return res.json(id)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let partners = await Partner.findAndCountAll({limit, offset})
        return res.json(partners)
    }
}

module.exports = new PartnerController