import { db } from "../conexion/db.js"

export const getUsers = async (req, res) => {
    try {
        const conn = await db();
        const query = "SELECT id_usuario, nombre, apellido, password, email FROM usuarios";
        const [rows] = await conn.query(query);
        res.json(rows);
        conn.end();
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}

export const getUsersById = async (req, res) => {
    const { id } = req.params;
    try {
        const conn = await db();
        const query = "SELECT id_usuario, nombre, apellido, password, email FROM usuarios WHERE id_usuario = ?";
        const [rows] = await conn.query(query, [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
        conn.end();
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
}