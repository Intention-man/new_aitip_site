// Общие для всех БД таблиц функции

const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const {FileWrapper} = require("../models/fileWrapperModel");


class CommonController {
    async convertFiles(req, res, next) {
        try {
            let {files} = req.files;
            console.log(files)
            if (!Array.isArray(files))
                files = [files];
            let filesNamesList = []
            files.map(async file => {
                let fileLink;
                let fileLabel = file.name
                if (file.mimetype.split("/")[0] === "image") {
                    fileLink = uuid.v4() + ".jpg"
                } else {
                    fileLink = uuid.v4() + "." + file.name.split(".")[1]
                }
                await file.mv(path.resolve(__dirname, "..", "static", fileLink))
                filesNamesList.push(fileLink)

                const fileWrapper = await FileWrapper.create({
                    name: fileLabel,
                    fileLink: fileLink
                })
            })
            console.log(filesNamesList)
            return res.json(filesNamesList)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
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

    // async deleteAllUnusedFiles(req, res, next) {
    //     try {
    //         const deleteFile = './docs/deleteme.txt'
    //         if (fs.existsSync(deleteFile)) {
    //             fs.unlink(deleteFile, (err) => {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //                 console.log('deleted');
    //             })
    //         }
    //         console.log(filesNamesList)
    //         return res.json(filesNamesList)
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    // }
}

module.exports = new CommonController()