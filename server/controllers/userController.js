/* Функции создания и получения данных между сервером и БД. Ссылки, по которым они работают написаны в userRouter
*/

const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User} = require("../models/defaultModels/userModels");


const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: "1h"})
}

class UserController {
    async registration(req, res, next) {
        console.log(1)
        const {email, password, role} = req.body

        if (!email || !password) {
            return next(ApiError.badRequest("Некорректный email или пароль"))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({email, password: hashPassword, role})
        console.log(1)
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal("Пароль или email неверен"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        res.json({token})
    }
}

module.exports = new UserController()