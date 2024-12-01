import express from 'express';
import {
    getConnections,
    getConnectionByIdHandler,
    deleteConnectionByIdHandler,
    createConnectionHandler
} from "../controllers/connections.controller.js";

// Création d'un nouveau routeur
const router = express.Router();

// Définir les routes et les fonctions associées aux requêtes correspondantes
// Les fonctions sont importées depuis le fichier des contrôleurs
router.get('/', getConnections); // Gère GET /connections
router.get('/:id', getConnectionByIdHandler); // Gère GET /connections/:id
router.delete('/:id', deleteConnectionByIdHandler); // Gère DELETE /connections/:id
router.post('/', createConnectionHandler); // Gère POST /connections

// Exporter le routeur pour l'utiliser dans l'application
export default router;
