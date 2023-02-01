/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в staffRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const { CustomCard } = require("../models/customModels");


class CardController {
    async create(req, res, next) {
        try {
            let { isNews, cardName, pageName, pageIndex, header } = req.body
            let values = { isNews, cardName, pageName, pageIndex, header }
            const news = await CustomCard.create(values)
            return res.json(news)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async convertImages(req, res, next) {
        try {
            let imageList = req.files.imageList;
            if (!Array.isArray(imageList))
                imageList = [imageList];
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
        let { limit, page } = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let cards = await CustomCard.findAndCountAll({ limit, offset })
        return res.json(cards)
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

module.exports = new CardController