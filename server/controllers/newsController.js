/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в staffRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const { Op } = require('sequelize')
const {News} = require("../models/newsModel");
const {ElectionsAndContests} = require("../models/electionsAndContestsModel");


class NewsController {
    async create(req, res, next) {
        try{
            let {name, content} = req.body
            let values = {name, content}
            const news = await News.create(values)
            return res.json(news)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async convertImages(req, res, next) {
        console.log()
        try {
            const {imageList} = req.files
            let imageNamesList = []
            imageList.map(photo => {
                let fileName = uuid.v4() + ".jpg"
                photo.mv(path.resolve(__dirname, "..", "static", fileName))
                imageNamesList.push(fileName)
            })
            console.log(imageNamesList)
            return res.json(imageNamesList)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let news = await News.findAndCountAll({limit, offset})
        return res.json(news)
    }

    //
    // async getOne(req, res) {
    //     const {id} = req.params
    //     const staffer = await Staffer.findOne({
    //         where: {id},
    //     })
    //     return res.json(staffer)
    // }
}

module.exports = new NewsController