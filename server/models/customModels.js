const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const CustomCard = sequelize.define("card", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isNews: {type: DataTypes.BOOLEAN, allowNull: false},
    cardName: {type: DataTypes.STRING, allowNull: false},
    pageName: {type: DataTypes.STRING, allowNull: false},
    pageIndex: {type: DataTypes.INTEGER, allowNull: false},
    header: {type: DataTypes.STRING, allowNull: false},
})


const Line = sequelize.define("line", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    kind: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
    cardId: {type: DataTypes.INTEGER, allowNull: false},
    cardIndex: {type: DataTypes.INTEGER, allowNull: false},
})


//RELATION

CustomCard.hasMany(Line,{as: "lines"})
Line.belongsTo(CustomCard)

module.exports = {CustomCard, Line}