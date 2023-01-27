// Модель сотрудника: поля, которые будут у каждого сотрудника, их типы данных и свойства.

const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const Staffer = sequelize.define("staffer", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false},
        post: {type: DataTypes.STRING, allowNull: false},
        academic_degree: {type: DataTypes.STRING},
        academic_title: {type: DataTypes.STRING},
        directions_bac: {type: DataTypes.ARRAY(DataTypes.STRING)},
        programs_add: {type: DataTypes.ARRAY(DataTypes.STRING)},
        bio_text: {type: DataTypes.STRING},
        disciplines_and_courses_text: {type: DataTypes.STRING},
        publications_text: {type: DataTypes.STRING},
        projects_text: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING, allowNull: false},
        phone_number: {type: DataTypes.STRING, allowNull: false},
        adress: {type: DataTypes.STRING, allowNull: false},
        img: {type: DataTypes.STRING, allowNull: false},
    }
)

module.exports = {Staffer}
