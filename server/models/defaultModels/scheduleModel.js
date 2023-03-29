// Schedule models definition. Every is similar with definition attributes, during creation SQL tables

const sequelize = require("../../db")
const {DataTypes} = require("sequelize")


const Schedule = sequelize.define("schedule", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    kind: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    group: {type: DataTypes.STRING, allowNull: false, unique: true},
    fileLink: {type: DataTypes.STRING, allowNull: false},
})


module.exports = {Schedule}