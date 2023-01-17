// Модели таблиц с информацией, связанной с поступлением. Поля, их типы данных и свойства

const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const DirectionBachelor = sequelize.define("direction_bachelor", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    code: {type: DataTypes.STRING, unique: true, allowNull: false},
    profile: {type: DataTypes.TEXT, allowNull: false},
    profession_advantages: {type: DataTypes.TEXT, allowNull: false},
    profession_description: {type: DataTypes.TEXT, allowNull: false},
    specialities: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
    extramural_form_price: {type: DataTypes.INTEGER, allowNull: false},
    full_and_part_time_form_price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})


const EntranceTest = sequelize.define("entrance_test", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    subject: {type: DataTypes.STRING, allowNull: false},
    min_points: {type: DataTypes.INTEGER, allowNull: false},
    isNecessary: {type: DataTypes.BOOLEAN}
})

//RELATION

DirectionBachelor.hasMany(EntranceTest,{as: "tests"})
EntranceTest.belongsTo(DirectionBachelor)

module.exports = {DirectionBachelor, EntranceTest}