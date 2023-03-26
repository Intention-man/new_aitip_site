// User model definition. Every is similar with definition attributes, during creation SQL tables

const sequelize = require("../../db")
const {DataTypes} = require("sequelize")


const User = sequelize.define("user", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, defaultValue: "ADMIN"}
    }
)


module.exports = {User}
