/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в partnersRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const {Partners} = require("../models/defaultModels/partnerModel");


class PartnersController {
    async create(req, res, next) {
        try{
            const {name, kind, logo, description, jointProjectsDescription, jointProjectsPhotos} = req.body
            const splitedJointProjectsPhotos = JSON.parse(jointProjectsPhotos)

            let values = {name, kind, description, logo, jointProjectsDescription, jointProjectsPhotos: splitedJointProjectsPhotos}
            const partners = await Partners.create(values)

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

            const partner = await Partners.findOne({
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
        await Partners.destroy({
            where: {id}
        })
        return res.json(id)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let partners = await Partners.findAndCountAll({limit, offset})
        return res.json(partners)
    }
}

module.exports = new PartnersController