// Модель таблицы Партнеры. Поля, их типы данных и свойства

const sequelize = require("../../db")
const {DataTypes} = require("sequelize")


const Partners = sequelize.define("partner", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    kind: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    logo: {type: DataTypes.STRING, allowNull: false},
    jointProjectsDescription: {type: DataTypes.TEXT},
    jointProjectsPhotos: {type: DataTypes.ARRAY(DataTypes.TEXT)}
})


module.exports = {Partners}