/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в staffRouter
*/

const uuid = require("uuid")
const path = require("path")
const {Staffer} = require("../models/defaultModels/staffModel")
const ApiError = require("../error/ApiError")
const { Op } = require('sequelize')
const {CustomBlock, Line} = require("../models/customModels");


class StaffController {
    async create(req, res, next) {
        console.log()
        try{
            let {name, post, academic_degree, academic_title, directions_bac, programs_add, bio_text, disciplines_and_courses_text, publications_text, projects_text, email, phone_number, adress} = req.body

            const splitedDirectionsBac = JSON.parse(directions_bac)
            const splitedProgramsAdd= JSON.parse(programs_add)
            console.log(splitedDirectionsBac, splitedProgramsAdd)

            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, "..", "static", fileName))

            const staff = await Staffer.create({name, post, academic_degree, academic_title, directions_bac: splitedDirectionsBac, programs_add: splitedProgramsAdd, bio_text, disciplines_and_courses_text, publications_text, projects_text, email, phone_number, adress, img: fileName})
            return res.json(staff)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateStaffer(req, res, next) {
        try {
            let {id, isNews, header, pageLink, ordinal, lines, prevLinesIdList} = req.body
            const block = await CustomBlock.findOne({
                where: {id},
            })
            block.update({isNews: isNews, header: header, pageLink: pageLink, ordinal: ordinal}, {where: {id}})

            if (lines) {
                console.log(lines)
                lines = JSON.parse(lines)
                prevLinesIdList = JSON.parse(prevLinesIdList)
                for (let prevId of prevLinesIdList) {
                    let isInsideAlready = false
                    for (let line of lines) {
                        if (line.id === prevId) {
                            isInsideAlready = true
                            Line.update({
                                    kind: line.kind,
                                    params: line.params,
                                    text: line.text,
                                    filesNames: line.filesNames !== undefined ? line.filesNames : [],
                                    addressFileType: line.addressFileType,
                                    lineOrdinal: line.lineOrdinal,
                                    blockId: block.id
                                },
                                {where: {id: line.id}})
                        }
                    }
                    if (isInsideAlready === false)  {
                        await Line.destroy({
                            where: {
                                id: prevId
                            }
                        })
                        prevLinesIdList.filter(id => id !== prevId)
                    }
                }
                for (const line of lines) {
                    let isAppearedJustNow = true
                    for (const prevId of prevLinesIdList) {
                        if (line.id === prevId) {
                            isAppearedJustNow = false
                        }
                    }
                    isAppearedJustNow && await Line.create({
                        kind: line.kind,
                        params: line.params,
                        text: line.text,
                        filesNames: line.filesNames !== undefined ? line.filesNames : [],
                        addressFileType: line.addressFileType,
                        lineOrdinal: line.lineOrdinal,
                        blockId: block.id
                    })
                }
            }
            return res.json(block)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeStaffer(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await Staffer.destroy({
            where: {id}
        })
        return res.json(id)
    }

    // getters

    async getAll(req, res) {
        let {directions_bac, program_add, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = limit * (page - 1)
        let staff;

        if (!directions_bac && !program_add) {
            staff = await Staffer.findAndCountAll({limit, offset, order: [
                ['name']]})
            console.log("staffController, f getAll noParams")
        }
        if (!directions_bac && program_add) {
            staff = await Staffer.findAndCountAll({limit, offset, order: [
                    ['name']], where: {subjects_add: {[Op.contains]: program_add}}})
        }
        if (!directions_bac && program_add) {
            staff = await Staffer.findAndCountAll({limit, offset, order: [
                    ['name']], where: {subjects_bac: {[Op.contains]: directions_bac}}})
        }
        if (directions_bac && program_add) {
            staff = await Staffer.findAndCountAll({limit, offset, order: [
                    ['name']], where: {[Op.and]: [{subjects_bac: {[Op.contains]: directions_bac}}, {subjects_add: {[Op.contains]: program_add}}]}})
        }
        return res.json(staff)
    }

    async getOne(req, res) {
        const {id} = req.params
        const staffer = await Staffer.findOne({
            where: {id},
        })
        return res.json(staffer)
    }
}

module.exports = new StaffController