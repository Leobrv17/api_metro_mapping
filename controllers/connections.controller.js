import {getAll, getById, deleteById, create} from "../services/connections.service.js";

export const getConnections = async (req, res) => {
    // Récupération des paramètres de tri depuis la requête
    const data = await getAll(req.query.sortBy, req.query.sortDir);

    // Retourne la liste des connexions avec un statut de succès
    res.json({
        success: true,
        data
    });
};

export const getConnectionByIdHandler = async (req, res) => {
    // Récupération de l'ID depuis les paramètres de l'URL et conversion en entier
    const connection = await getById(req.params.id);

    // Si la connexion n'existe pas, renvoyer une erreur 404
    if (!connection) {
        return res.status(404).json({
            success: false,
            message: 'Connection not found'
        });
    }

    // Sinon, retourner les détails de la connexion
    return res.json({
        success: true,
        data: connection
    });
};

export const deleteConnectionByIdHandler = async (req, res) => {
    // Suppression de la connexion par son ID
    const hasBeenDeleted = await deleteById(req.params.id);

    // Si la connexion n'existe pas, renvoyer une erreur 404
    if (!hasBeenDeleted) {
        return res.status(404).json({
            success: false,
            message: 'Connection not found'
        });
    }

    // Sinon, retourner un message de succès
    return res.json({
        success: true,
        message: 'Connection deleted'
    });
};

export const createConnectionHandler = async (req, res) => {
    // Récupération des informations nécessaires depuis le corps de la requête
    const {fromStationId, toStationId} = req.body;

    // Création de la connexion entre les stations
    const connection = await create(fromStationId, toStationId);

    // Retourner la connexion créée avec un statut de succès
    res.json({
        success: true,
        data: connection
    });
};
