/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в directionBachelorRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const {DirectionBachelor, EntranceTest} = require("../models/admissionModels");



class DirectionBachelorController {
    async create(req, res, next) {
        console.log("Я в create")
        try{
            let {name, code, profile, profession_advantages, profession_description,
                specialities, extramural_form_price, full_and_part_time_form_price, tests} = req.body
            console.log("Получил данные из запроса")
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, "..", "static", fileName))
            console.log("Обработал в удобный мне формат")
            console.log(name, code, profile, profession_advantages, profession_description, specialities, extramural_form_price, full_and_part_time_form_price, fileName)
            console.log(typeof JSON.parse(specialities), JSON.parse(specialities))
            const splitedSpecialities = JSON.parse(specialities)
            
            let values = {name, code, profile, profession_advantages, profession_description, specialities: splitedSpecialities, extramural_form_price, full_and_part_time_form_price, img: fileName
            }
            console.log(typeof values, typeof specialities)

            const directionBachelor = await DirectionBachelor.create(values)
            console.log("Создал новое направление")

            if (tests) {
                tests = JSON.parse(tests)
                tests.forEach(test =>
                    EntranceTest.create({
                        subject: test.subject,
                        min_points: test.minPoints,
                        isNecessary: test.isNecessary,
                        directionBachelorId: directionBachelor.id
                    })
                )
            }

            console.log("Обработал тесты")

            return res.json(directionBachelor)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        console.log("Функция закончила свою работу")

    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)

        let directionBachelor = await DirectionBachelor.findAndCountAll({limit, offset})
        return res.json(directionBachelor)
    }

    async getOne(req, res) {
        const {id} = req.params
        console.log("Я в getOne")
        const direction = await DirectionBachelor.findOne({
            where: {id},
            include: [{model: EntranceTest, as: "tests"}]
        })
        return res.json(direction)
    }
}

module.exports = new DirectionBachelorController