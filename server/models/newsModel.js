// Модель таблицы выборов и конкурсов. Поля, их типы данных и свойства

const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const News = sequelize.define("news", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
})


module.exports = {News}