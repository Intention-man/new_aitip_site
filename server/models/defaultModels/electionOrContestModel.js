// ElectionsAndContests model definition. Every is similar with definition attributes, during creation SQL tables

const sequelize = require("../../db")
const {DataTypes} = require("sequelize")


const ElectionOrContest = sequelize.define("elections_and_contests", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, allowNull: false},
    kind: {type: DataTypes.STRING, allowNull: false},
    applicationsAcceptanceDateStart: {type: DataTypes.DATE, allowNull: false},
    applicationsAcceptanceDateEnd: {type: DataTypes.DATE, allowNull: false},
    applicationsAcceptancePlace: {type: DataTypes.TEXT, allowNull: false},
    eventDate: {type: DataTypes.DATE, allowNull: false},
    eventTime: {type: DataTypes.TIME, allowNull: false},
    eventPlace: {type: DataTypes.TEXT, allowNull: false},
})


module.exports = {ElectionOrContest}