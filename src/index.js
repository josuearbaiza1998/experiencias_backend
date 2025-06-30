import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
const port = process.env.PUERTO || 3000;

const cors_allowed = ["http://localhost:5173", "http://localhost:3000"];

// middleware para permitir el acceso a la api desde el frontend
app.use(cors({
    origin: cors_allowed,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// middleware para parsear el cuerpo a formato json
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
    console.log(`servidor corriendo en el puerto ${port}`);
})