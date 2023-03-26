/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в directionBachelorRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const {DirectionBachelor, EntranceTest} = require("../models/defaultModels/admissionModels");



class DirectionBachelorController {
    async create(req, res, next) {
        try{
            let {name, code, profile, profession_advantages, profession_description,
                specialities, extramural_form_price, full_and_part_time_form_price, tests, file} = req.body
            // const {img} = req.files
            // let fileName = uuid.v4() + ".jpg"
            // await img.mv(path.resolve(__dirname, "..", "static", fileName))

            const splitedSpecialities = JSON.parse(specialities)
            
            let values = {name, code, profile, profession_advantages, profession_description, specialities: splitedSpecialities, extramural_form_price, full_and_part_time_form_price, img: file
            }

            const directionBachelor = await DirectionBachelor.create(values)

            if (tests) {
                tests = JSON.parse(tests)
                tests.forEach(test =>
                    EntranceTest.create({
                        subject: test.subject,
                        minPoints: test.minPoints,
                        isNecessary: test.isNecessary,
                        admissionByEGE: test.admissionByEGE,
                        directionBachelorId: directionBachelor.id
                    })
                )
            }
            return res.json(directionBachelor)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateDirection(req, res, next) {
        try {
            let {id, name, code, profile, profession_advantages, profession_description, specialities, extramural_form_price, full_and_part_time_form_price, file, tests} = req.body
            // const {img} = req.files
            // let fileName = uuid.v4() + ".jpg"
            // await img.mv(path.resolve(__dirname, "..", "static", fileName))
            const splitedSpecialities = JSON.parse(specialities)

            const direction = await DirectionBachelor.findOne({
                where: {id},
            })
            let values = {name, code, profile, profession_advantages, profession_description, specialities: splitedSpecialities, extramural_form_price, full_and_part_time_form_price, img: file
            }
            direction.update(values, {where: {id}})

            if (tests) {
                tests = JSON.parse(tests)
                // console.log(tests)
                for (const freshTest of tests) {
                    if (!freshTest.hasOwnProperty("directionBachelorId")) {
                        console.log(111)
                        await EntranceTest.create({
                            subject: freshTest.subject,
                            minPoints: freshTest.minPoints,
                            isNecessary: freshTest.isNecessary,
                            admissionByEGE: freshTest.admissionByEGE,
                            directionBachelorId: id
                        })
                    } else {
                        const test = await EntranceTest.findOne({
                            where: {id: freshTest.id},
                        })
                        console.log(freshTest)
                        console.log(test)
                        test.update({
                            subject: freshTest.subject,
                            minPoints: freshTest.minPoints,
                            isNecessary: freshTest.isNecessary,
                            admissionByEGE: freshTest.admissionByEGE,
                        }, {where: {id: freshTest.id}})
                    }
                }
            }
            return res.json(direction)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeDirection(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await DirectionBachelor.destroy({
            where: {id}
        })
        return res.json(id)
    }

    async removeTest(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await EntranceTest.destroy({
            where: {id}
        })
        return res.json(id)
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