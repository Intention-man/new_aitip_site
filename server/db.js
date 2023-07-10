// Sequelize (="DB object") definition by server/.env data

// import pg from 'pg';
//
// const { Pool } = pg;

// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// })
//
// module.exports = pool

const {Sequelize} = require("sequelize");

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

// import pg from 'pg';

// const { Pool } = pg;
//
// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// })

// module.exports = pool


// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: "postgres",
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         password: process.env.DB_TABLE_PASSWORD
//     }
// )


// dialectOptions: {
//     ssl: {
//         require: true,
//         rejectUnauthorized: false
//     }
// },

// module.exports = new Sequelize
// ('postgres://MishailAJ:ydpO3ZcEx7en@eu-central-1.aws.neon.tech/neondb?sslmode=no-verify')

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// module.exports = new Sequelize(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`)

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

// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: "postgres",
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         password: process.env.DB_TABLE_PASSWORD
//     }
// )