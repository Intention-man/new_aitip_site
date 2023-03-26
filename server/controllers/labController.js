/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в labRouter
*/


const ApiError = require("../error/ApiError")
const {Laboratory} = require("../models/defaultModels/labModel");


class PartnersController {
    async create(req, res, next) {
        try{
            const {name, text1, cover, supervisor_name, supervisor_description, supervisor_photo, text2, carousel_photos_links, text3} = req.body
            const splitedCarouselPhotosLinks = JSON.parse(carousel_photos_links)

            let values = {name, text1, cover, supervisor_name, supervisor_description, supervisor_photo, text2,carousel_photos_links: splitedCarouselPhotosLinks, text3}
            const lab = await Laboratory.create(values)

            return res.json(lab)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateLab(req, res, next) {
        try {
            let {id, name, text1, cover, supervisor_name, supervisor_description, supervisor_photo, text2, carousel_photos_links, text3} = req.body
            console.log("Controller")
            const splitedCarouselPhotosLinks = JSON.parse(carousel_photos_links)
            const lab = await Laboratory.findOne({
                where: {id},
            })
            let values = {name, text1, cover, supervisor_name, supervisor_description, supervisor_photo, text2,carousel_photos_links: splitedCarouselPhotosLinks, text3}

            lab.update(values, {where: {id}})
            return res.json(lab)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeLab(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await Laboratory.destroy({
            where: {id}
        })
        return res.json(id)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let partners = await Laboratory.findAndCountAll({limit, offset})
        return res.json(partners)
    }
}

module.exports = new PartnersController