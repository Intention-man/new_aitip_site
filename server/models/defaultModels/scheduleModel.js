// Модель таблицы Партнеры. Поля, их типы данных и свойства

const sequelize = require("../../db")
const {DataTypes} = require("sequelize")


const Schedule = sequelize.define("schedule", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    group: {type: DataTypes.STRING, allowNull: false, unique: true},
    fileLink: {type: DataTypes.STRING, allowNull: false},
})


module.exports = {Schedule}