import {getAll, getById, create, deleteById, updateByName} from "../services/station.service.js";


export const getStations = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDir)
    res.json({
        success: true, data
    })
}

export const getStationById = async (req, res) => {
    const line = await getById(parseInt(req.params.id))

    // If the line is not found, we will return a 404 status code
    if (!line) {
        return res.status(404).json({
            success: false, message: 'Lines not found'
        })
    }

    // Otherwise we will return the line object
    return res.json({
        success: true, data: line
    })
}

export const deleteStationById = async (req, res) => {
    const hasBeenDeleted = await deleteById(parseInt(req.params.id))
    if (!hasBeenDeleted) {
        return res.status(404).json({
            success: false, message: 'line not found'
        })
    }

    return res.json({
        success: true, message: 'line deleted'
    })
}

export const createStation = async (req, res) => {
    const {name, x, y} = req.body

    const line = await create(name, x, y)

    // We will return the created line
    res.json({
        success: true, data: line
    })
}

export const updateStationCoordinatesByName = async (req, res) => {
    const { name } = req.params;  // Récupérer le nom de la station depuis les paramètres
    const { x, y } = req.body;    // Récupérer les nouvelles coordonnées depuis le corps de la requête

    // Vérification de la validité des coordonnées
    if (typeof x !== 'number' || typeof y !== 'number') {
        return res.status(400).json({
            success: false,
            message: 'Invalid coordinates. Both x and y must be numbers.',
        });
    }

    // Optionnel : validation supplémentaire pour vérifier que les coordonnées sont dans un intervalle logique
    if (x < -1000 || x > 1000 || y < -1000 || y > 1000) {
        return res.status(400).json({
            success: false,
            message: 'Coordinates are out of valid range. Please provide values between -1000 and 1000.',
        });
    }

    try {
        // Appeler le service pour mettre à jour la station
        const updatedStation = await updateByName(name, { x, y });

        // Vérifier si la station a été trouvée et mise à jour
        if (!updatedStation) {
            return res.status(404).json({
                success: false,
                message: `Station with name "${name}" not found.`,
            });
        }

        // Retourner la réponse avec la station mise à jour
        return res.json({
            success: true,
            data: updatedStation,
        });

    } catch (error) {
        // Gérer les erreurs inattendues
        console.error('Error updating station coordinates:', error);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the station. Please try again later.',
            error: error.message || error, // Inclure un message d'erreur détaillé
        });
    }
};
