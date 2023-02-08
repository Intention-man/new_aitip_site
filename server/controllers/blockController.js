/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в blockRouter
*/

const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")
const {CustomBlock, Line} = require("../models/customModels");


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
                            addressFileType: line.addressFileType,
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

    async updateBlock(req, res, next) {
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
                            // const id = line.id
                            // const lineRecord = await Line.findOne({
                            //     where: {id},
                            // })
                            // console.log(lineRecord)
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

    async getOneBlock(req, res) {
        const {id} = req.params
        const block = await CustomBlock.findOne({
            where: {id},
            include: [{model: Line, as: "lines"}]
        })
        return res.json(block)
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
                if (file.mimetype.split("/")[0] === "image") {
                    fileName = uuid.v4() + ".jpg"
                } else {
                    fileName = uuid.v4() + "." + file.name.split(".")[1]
                }

                file.mv(path.resolve(__dirname, "..", "static", fileName))
                filesNamesList.push(fileName)
            })
            console.log(filesNamesList)
            return res.json(filesNamesList)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BlockController