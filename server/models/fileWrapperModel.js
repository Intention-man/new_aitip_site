const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const FileWrapper = sequelize.define("fileWrapper", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.TEXT, allowNull: false},
    countUsages: {type: DataTypes.INTEGER, defaultValue: 0}
})

module.exports = {FileWrapper}