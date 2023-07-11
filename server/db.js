// Sequelize (="DB object") definition by server/.env data

const {Sequelize} = require("sequelize");

// Для подключения к локальной БД
// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_TABLE_PASSWORD,
//     {
//         dialect: "postgres",
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         password: process.env.DB_TABLE_PASSWORD
//     }
// )

// Для подключения к БД на neon

module.exports = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        host: process.env.PGHOST,
        port: 5432,
        password: process.env.PGPASSWORD
    }
);
