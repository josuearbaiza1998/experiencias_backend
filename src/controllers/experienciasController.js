import { db } from "../conexion/db.js"

export const getReservas = async (req, res) => {
    try {
        const conn = await db();
        const query = `SELECT 
                        ee.id_experiencia AS experienciaId,
                        ed.fecha_experiencia AS fecha,
                        er.cupos AS cantidad,
                        u.nombre AS nombre
                    FROM experiencias_reservas er
                    LEFT JOIN usuarios u ON er.id_usuario = u.id_usuario
                    LEFT JOIN experiencias_encabezado ee ON er.id_experiencia = ee.id_experiencia
                    LEFT JOIN experiencias_detalle ed 
                        ON er.id_experiencia = ed.id_experiencia 
                        AND er.id_fecha = ed.id_fecha`;
        const [rows] = await conn.query(query);
        res.json(rows);
        conn.end();
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las experiencias" });
    }
}

export const disponibilidad = async (req, res) => {
    try {
        const conn = await db();
        const query = `SELECT
                        ed.fecha_experiencia AS fecha,
                        SUM( er.cupos ) AS cantidad 
                    FROM
                        experiencias_reservas er
                        LEFT JOIN experiencias_detalle ed ON er.id_experiencia = ed.id_experiencia AND er.id_fecha = ed.id_fecha 
                    GROUP BY
                        ed.fecha_experiencia 
                    ORDER BY
                        ed.fecha_experiencia`;
        const [rows] = await conn.execute(query);
        res.json(rows);
        conn.end();
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la disponibilidad" });
    }
}

export const agregarExperiencia = async (req, res) => {
    const { nombre, fecha_inicio } = req.body;
    try {
        const conn = await db();
        const query_experiencias_encabezado = `insert into experiencias_encabezado (nombre) values (?)`;
        const [result] = await conn.query(query_experiencias_encabezado, [nombre]);

        const id_experiencia = result.insertId;

        const query_experiencias_detalle = `insert into experiencias_detalle (id_experiencia, fecha_experiencia) values (?, ?)`;
        await conn.query(query_experiencias_detalle, [id_experiencia, fecha_inicio]);
        
        res.status(201).json({ message: "Experiencia agregada correctamente", id_experiencia });
        conn.end();
    } catch (error) {
        console.error("Error al agregar la experiencia:", error);
        res.status(500).json({ error: "Error al agregar la experiencia" });
    }
}

export const agregarReserva = async (req, res) => {
    const { id_experiencia, id_usuario, cupos, id_fecha } = req.body;

    try {
        const conn = await db();
        const query = `INSERT INTO experiencias_reservas (id_experiencia, id_usuario, cupos, id_fecha) VALUES (?, ?, ?, ?)`;
        await conn.query(query, [id_experiencia, id_usuario, cupos, id_fecha]);
        res.status(201).json({ message: "Reserva agregada correctamente" });
        conn.end();
    } catch (error) {
        console.error("Error al agregar la reserva:", error);
        res.status(500).json({ error: "Error al agregar la reserva" });
    }   
}

export const getExperiencias = async (req, res) => {
    try {
        const conn = await db();
        const query = 
        `SELECT
            ee.id_experiencia AS experienciaId,
            ee.nombre AS nombre,
            ed.fecha_experiencia AS fecha,
            ed.id_fecha AS id_fecha
        FROM
            experiencias_encabezado ee
            LEFT JOIN experiencias_detalle ed ON ee.id_experiencia = ed.id_experiencia`;
        const [rows] = await conn.query(query);
        res.json(rows);
        conn.end();
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las experiencias" });
    }
}

export const reservarExperiencia = async (req, res) => {
    const { id_experiencia, id_usuario, cupos, id_fecha } = req.body;

    try {
        const conn = await db();
        const query = `INSERT INTO experiencias_reservas (id_experiencia, id_usuario, cupos, id_fecha) VALUES (?, ?, ?, ?)`;
        await conn.query(query, [id_experiencia, id_usuario, cupos, id_fecha]);
        res.status(201).json({ message: "Reserva agregada correctamente" });
        conn.end();
    } catch (error) {
        console.error("Error al agregar la reserva:", error);
        res.status(500).json({ error: "Error al agregar la reserva" });
    }
}