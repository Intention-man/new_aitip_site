// Common for every table functions, related to files

const uuid = require("uuid");
const path = require("path");
const fs = require('fs');
const ApiError = require("../error/ApiError");
const {FileWrapper} = require("../models/fileWrapperModel");


class CommonController {
    // add file to server/static and create new record in file_wrapper table. Returns link to this file (= encoded file name in static)
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
                filesLinksList.push(fileLink);
                console.log("fileLink: " + fileLink)
                await file.mv(path.resolve(__dirname, "..", "static", fileLink));
                console.log(1 + " " + filesLinksList);
                const fileWrapper = await FileWrapper.create({
                    name: fileLabel,
                    fileLink: fileLink
                })
            })
            console.log(2 + " " + filesLinksList)
            return res.json(filesLinksList)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // increase or decrease file usages after saving changes at one of admin panels
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
            file.update({
                id: file.id,
                name: file.name,
                fileLink: file.fileLink,
                countUsages: newCountUsages
            }, {where: {id: file.id}})
        }
        return res.json(newCountUsages)
    }

    // now, unused function of remove 1 file by id
    async removeFile(req, res) {
        console.log(req.params)
        let {id} = req.params
        console.log(id)
        await FileWrapper.destroy({
            where: {id}
        })
        return res.json(id)
    }

    // "optimization function": delete all files from static, that there are in static, but not in file_wrapper and all files from static and file_wrapper, that has no (=0) countUsages (it has written in file_wrapper table)
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
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // getAllFiles
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