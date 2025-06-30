import jwt from "jsonwebtoken";
import { db } from "../conexion/db.js"
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const createUser = async (req, res) => {
    const { nombre, apellido, password, email } = req.body;
    const passdowString = password.toString();
    const passwordHash = await bcrypt.hash(passdowString, 10);

    try {
        const conn = await db();
        const query = "INSERT INTO usuarios (nombre, apellido, password, email) VALUES (?, ?, ?, ?)";
        const [result] = await conn.query(query, [nombre, apellido, passwordHash, email]);
        res.status(201).json({ id: result.insertId, nombre, apellido, email });
        conn.end();
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
}

// login dentro de authController 
export const loginUser = async (req, res) => {
    const { email, password} = req.body;
    const passwordString = password.toString();
    
    try {
        const conn = await db();
        const query = "SELECT id_usuario, nombre, apellido, password FROM usuarios WHERE email = ?";
        const [rows] = await conn.query(query, [email]);

        if (rows.length > 0){
            const user = rows[0];
            // comparacion entre lo que se envia y lo que se tiene en la base de datos
            const isMatch = await bcrypt.compare(passwordString, user.password);

            // si las contraseñas coinciden, se genera y devuelve el token
            if (isMatch == true) {
                const token = jwt.sign({ id: user.id_usuario }, SECRET_KEY, { expiresIn: '1h' });
                res.json({ token, user: { id: user.id_usuario, nombre: user.nombre, apellido: user.apellido } });
            } else {
                res.status(401).json({ error: "Contraseña incorrecta" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al iniciar sesion" });
    }
}