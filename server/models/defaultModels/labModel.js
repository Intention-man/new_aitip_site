// Модель таблицы Партнеры. Поля, их типы данных и свойства

const sequelize = require("../../db")
const {DataTypes} = require("sequelize")


const Laboratory = sequelize.define("lab", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    text1: {type: DataTypes.TEXT, allowNull: false},
    cover: {type: DataTypes.STRING, allowNull: false},
    supervisor_name: {type: DataTypes.STRING, allowNull: false},
    supervisor_description: {type: DataTypes.TEXT, allowNull: false},
    supervisor_photo: {type: DataTypes.STRING, allowNull: false},
    text2: {type: DataTypes.TEXT, allowNull: false},
    carousel_photos_links: {type: DataTypes.ARRAY(DataTypes.TEXT)},
    text3: {type: DataTypes.TEXT, allowNull: false},
})


module.exports = {Laboratory}