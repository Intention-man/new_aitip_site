const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const CustomBlock = sequelize.define("block", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isNews: {type: DataTypes.BOOLEAN, allowNull: false},
    header: {type: DataTypes.STRING, allowNull: false},
    pageLink: {type: DataTypes.STRING, allowNull: false},
    ordinal: {type: DataTypes.INTEGER, allowNull: false},

})


const Line = sequelize.define("line", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    kind: {type: DataTypes.INTEGER, allowNull: false},
    params: {type: DataTypes.JSON},
    text: {type: DataTypes.ARRAY(DataTypes.TEXT)},
    filesNames: {type: DataTypes.ARRAY(DataTypes.TEXT)},
    addressFileType: {type: DataTypes.STRING},
    lineOrdinal: {type: DataTypes.INTEGER, allowNull: false},
    blockId: {type: DataTypes.INTEGER, allowNull: false},
})


//RELATION

CustomBlock.hasMany(Line,{as: "lines"})
Line.belongsTo(CustomBlock)

module.exports = {CustomBlock, Line}