// Admission models definition. Every is similar with definition attributes, during creation SQL tables


const sequelize = require("../../db")
const {DataTypes} = require("sequelize")


const DirectionBachelor = sequelize.define("direction_bachelor", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    code: {type: DataTypes.STRING, allowNull: false, unique: true},
    profile: {type: DataTypes.TEXT, unique: true, allowNull: false},
    profession_advantages: {type: DataTypes.TEXT, allowNull: false},
    profession_description: {type: DataTypes.TEXT, allowNull: false},
    specialities: {type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false},
    extramural_form_price: {type: DataTypes.INTEGER, allowNull: false},
    full_and_part_time_form_price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.TEXT, allowNull: false}
})

// table, related DirectionBachelor with the many-to-1 relationship
const EntranceTest = sequelize.define("entrance_test", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    subject: {type: DataTypes.STRING, allowNull: false},
    minPoints: {type: DataTypes.INTEGER, allowNull: false},
    isNecessary: {type: DataTypes.BOOLEAN},
    admissionByEGE: {type: DataTypes.BOOLEAN}
})

const AdditionalProgram = sequelize.define("additional_program", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    kind: {type: DataTypes.TEXT, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    modules: {type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false},
    hours: {type: DataTypes.INTEGER, allowNull: false},
    form: {type: DataTypes.STRING, allowNull: false},
    cost: {type: DataTypes.INTEGER, allowNull: false},
    programImg: {type: DataTypes.TEXT, allowNull: false},
    supervisorName: {type: DataTypes.STRING, allowNull: false},
    supervisorDescription: {type: DataTypes.TEXT, allowNull: false},
    supervisorImg: {type: DataTypes.TEXT, allowNull: false}
})

//RELATION

DirectionBachelor.hasMany(EntranceTest,{as: "tests"})
EntranceTest.belongsTo(DirectionBachelor)

module.exports = {DirectionBachelor, AdditionalProgram, EntranceTest}