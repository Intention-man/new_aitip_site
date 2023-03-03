/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в PartnersRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const {Partners} = require("../models/partnersModel");



class PartnersController {
    async create(req, res, next) {
        try{
            let {name, kind, description, jointProjectsDescription} = req.body
            const {logo, jointProjectsPhotoes} = req.files
            let fileList = []
            jointProjectsPhotoes.map(photo => {
                let fileName = uuid.v4() + ".jpg"
                photo.mv(path.resolve(__dirname, "..", "static", fileName))
                fileList.push(fileName)
            })
            console.log(fileList)
            let fileNameImg = uuid.v4() + ".jpg"
            await logo.mv(path.resolve(__dirname, "..", "static", fileNameImg))

            let values = {name, kind, description, logo: fileNameImg,jointProjectsDescription, jointProjectsPhotoes: fileList}
            const partners = await Partners.create(values)

            return res.json(partners)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateParther(req, res, next) {
        try {
            let {id, name, kind, description, jointProjectsDescription} = req.body
            const {logo, jointProjectsPhotoes} = req.files

            let fileList = []
            jointProjectsPhotoes.map(photo => {
                let fileName = uuid.v4() + ".jpg"
                photo.mv(path.resolve(__dirname, "..", "static", fileName))
                fileList.push(fileName)
            })
            console.log(fileList)
            let fileNameImg = uuid.v4() + ".jpg"
            await logo.mv(path.resolve(__dirname, "..", "static", fileNameImg))


            const partner = await Partners.findOne({
                where: {id},
            })
            let values = {name, kind, description, logo: fileNameImg,jointProjectsDescription, jointProjectsPhotoes: fileList}

            partner.update(values, {where: {id}})
            return res.json(partner)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeParther(req, res) {
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