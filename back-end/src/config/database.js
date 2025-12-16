const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();

console.log('DB_SERVER: ', process.env.DB_SERVER);

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {encrypt: true, trustServerCertificate: true}
};

let pool;

const connectDB = async () => {
    try {
        pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.error("Database connection failed: ", error);
        throw error;
    }
}

module.exports = {connectDB, getPool: () => pool, sql};