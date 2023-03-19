// Общие для всех БД таблиц функции

const uuid = require("uuid");
const path = require("path");
const fs = require('fs');
const ApiError = require("../error/ApiError");
const {FileWrapper} = require("../models/fileWrapperModel");


class CommonController {
    async convertFiles(req, res, next) {
        try {
            let {files} = req.files;
            console.log(files)
            if (!Array.isArray(files))
                files = [files];
            let filesLinksList = []
            files.map(async file => {
                let fileLink;
                let fileLabel = file.name
                if (file.mimetype.split("/")[0] === "image") {
                    fileLink = uuid.v4() + ".jpg"
                } else {
                    fileLink = uuid.v4() + "." + file.name.split(".")[1]
                }
                await file.mv(path.resolve(__dirname, "..", "static", fileLink))
                filesLinksList.push(fileLink)

                const fileWrapper = await FileWrapper.create({
                    name: fileLabel,
                    fileLink: fileLink
                })
            })
            console.log(filesLinksList)
            return res.json(filesLinksList)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateFileUsages(req, res) {
        let {fileLink, delta} = req.body
        console.log(fileLink, delta)
        const file = await FileWrapper.findOne({
            where: {fileLink},
        })
        let newCountUsages = -1
        if (file) {
            console.log(Object.values(file))
            newCountUsages = Number(file.countUsages) + Number(delta)
            console.log(newCountUsages)
            file.update({id: file.id, name: file.name, fileLink: file.fileLink, countUsages: newCountUsages}, {where: {id: file.id}})
        }
        return res.json(newCountUsages)
    }

    async removeFile(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await FileWrapper.destroy({
            where: {id}
        })
        return res.json(id)
    }

    async deleteAllUnusedFiles(req, res, next) {
        try {
            const directoryPath = path.resolve(__dirname, "..", "static");
            // let filesWrappers = await FileWrapper.findAndCountAll()

            fs.readdir(directoryPath, async (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    const filePath = path.join(directoryPath, file);
                    const stats = fs.statSync(filePath);
                    const fileLink = file
                    const fileWrapper = await FileWrapper.findOne({
                        where: {fileLink},
                    })
                    if (fileWrapper && stats.isFile() && fileWrapper.countUsages > 0) {
                        console.log(fileWrapper.name + " " + fileWrapper.countUsages)
                        // fs.unlinkSync(filePath);
                        // console.log(`Deleted ${filePath}`);
                    } else if (fileWrapper && stats.isFile() && fileWrapper.countUsages === 0) {
                        fs.unlinkSync(filePath);
                        await FileWrapper.destroy({
                            where: {fileLink}
                        })
                        console.log(filePath + " удален по причине 0 использований (судя по данным таблицы FileWrappers)")
                    } else if (stats.isFile() && !fileWrapper) {
                        fs.unlinkSync(filePath);
                        console.log(filePath + " удален по причине отсутствия в таблице FileWrappers")
                    }
                }
            });
            // const deleteFile = './docs/deleteme.txt'
            // if (fs.existsSync(deleteFile)) {
            //     fs.unlink(deleteFile, (err) => {
            //         if (err) {
            //             console.log(err);
            //         }
            //         console.log('deleted');
            //     })
            // }
            // console.log(filesNamesList)
            // return res.json(filesNamesList)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllFiles(req, res, next) {
        try {
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 10000
            let offset = limit * (page - 1)
            let allFiles = await FileWrapper.findAndCountAll({limit, offset})
            return res.json(allFiles)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CommonController()