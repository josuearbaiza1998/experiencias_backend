import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbconfig = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    charset: process.env.CHARSET,
}

export const db = async () => {
    try {
        const conn = await mysql.createConnection(dbconfig);
        console.log('Conexión exitosa a la base de datos');
        return conn;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}