// Подключение к базе данных


const {Sequelize} = require("sequelize");

// module.exports = new Sequelize(
//     process.env.PGDATABASE,
//     process.env.PGUSER,
//     process.env.PGPASSWORD,
//     {
//         dialect: "postgres",
//         host: process.env.PGHOST,
//         port: process.env.DB_PORT,
//         password: process.env.DB_TABLE_PASSWORD
//     }
// )
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_TABLE_PASSWORD
    }
)