import express from 'express';
import { getUsers } from '../controllers/userController.js';
import { loginUser, createUser } from '../controllers/authController.js';
import { getReservas, disponibilidad, agregarExperiencia, getExperiencias, reservarExperiencia } from '../controllers/experienciasController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const routes = express.Router();

// ruta de prueba
routes.get("/users", authMiddleware, getUsers);

// experiencias routes
routes.get("/experiencias", authMiddleware, getExperiencias)
routes.get("/reservas", authMiddleware, getReservas);
routes.get("/disponibilidad", authMiddleware, disponibilidad);
routes.post("/agregar_experiencia", authMiddleware, agregarExperiencia);
routes.post("/reservarExperiencia", authMiddleware, reservarExperiencia);


// auth routes
routes.post("/login", loginUser);
routes.post("/create_users", createUser);

export default routes;