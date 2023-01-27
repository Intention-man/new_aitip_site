// Модель панели с названиями блоков, передвигающейся вместе с пользователями. Поля, их типы данных и свойства

const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const Moving_bar = sequelize.define("anchor_link", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    page_name: {type: DataTypes.STRING, unique: true, allowNull: false},
    elements: {type: DataTypes.JSON, allowNull: false}
})

module.exports = {Moving_bar}