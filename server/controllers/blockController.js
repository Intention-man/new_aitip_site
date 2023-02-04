/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в blockRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const {CustomBlock, Line} = require("../models/customModels");
const {EntranceTest} = require("../models/defaultModels/admissionModels");
const {underscoredIf} = require("sequelize/lib/utils");


class BlockController {
    async create(req, res, next) {
        try {
            let {isNews, header, pageLink, ordinal, lines} = req.body
            let values = {isNews, header, pageLink, ordinal}
            const block = await CustomBlock.create(values)

            if (lines) {
                console.log(lines)
                lines = JSON.parse(lines)
                lines.forEach(line => {
                    console.log(line)
                    Line.create({
                        kind: line.kind,
                        params: line.params,
                        text: line.text,
                        filesNames: line.filesNames !== undefined ? line.filesNames : [],
                        lineOrdinal: line.lineOrdinal,
                        blockId: block.id
                    })
                    console.log(`done ${line.lineOrdinal}`)
                }
                )
            }
            return res.json(block)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async convertFiles(req, res, next) {
        try {
            let {files} = req.files;
            console.log(files)
            if (!Array.isArray(files))
                files = [files];
            let filesNamesList = []
            files.map(file => {
                let fileName;
                if (file.mimetype.split("/")[0] === "image") {fileName = uuid.v4() + ".jpg"} else {fileName = uuid.v4() + "." + file.name.split(".")[1]}

                file.mv(path.resolve(__dirname, "..", "static", fileName))
                filesNamesList.push(fileName)
            })
            console.log(filesNamesList)
            return res.json(filesNamesList)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllBlocks(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let blocks = await CustomBlock.findAndCountAll({limit, offset})
        return res.json(blocks)
    }

    async getAllLines(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10000
        let offset = limit * (page - 1)
        let lines = await Line.findAndCountAll({limit, offset})
        return res.json(lines)
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

module.exports = new BlockController