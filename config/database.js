import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: password.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {encrypt: true, trustServerCertificate: true}
};

export const pool = await sql.connect(dbConfig);
export { sql };
