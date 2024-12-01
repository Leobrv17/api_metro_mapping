import prisma from "../db.js";



/**
 * Returns all Connexions.
 * @returns {Array} - An array of Connexions
 */
export const getAll = async (sortBy, sortDirection) => {
    // Base options for selecting the necessary fields
    let options = {
        select: {
            id: true,
            fromStation: {
                select: {
                    id: true,
                    name: true,
                    x: true,
                    y: true
                }
            },
            toStation: {
                select: {
                    id: true,
                    name: true,
                    x: true,
                    y: true
                }
            }
        }
    };

    // Add sorting if a sortBy parameter is provided
    if (sortBy) {
        if (!sortDirection) sortDirection = 'asc'; // Default to ascending sort
        options.orderBy = {
            [sortBy]: sortDirection
        };
    }

    // Retrieve the data from the Connexion table
    return prisma.connexion.findMany(options);
};

/**
 * Returns a single connection by its id
 * @param {string} id - The id of the connection to get
 * @returns {object} - The connection object or null if not found
 */
export const getById = async (id) => {
    return prisma.connexion.findUnique({
        select: {
            id: true,
            fromStation: {
                select: {
                    id: true,
                    name: true,
                    x: true,
                    y: true
                }
            },
            toStation: {
                select: {
                    id: true,
                    name: true,
                    x: true,
                    y: true
                }
            }
        },
        where: {
            id
        }
    });
};

/**
 * Deletes a connection by its id
 * @param {string} id - The id of the connection to delete
 * @returns {boolean} - True if the connection was deleted, false if not found
 */
export const deleteById = async (id) => {
    // Check if the connection exists before attempting to delete
    const existingConnection = await getById(id);

    if (existingConnection) {
        await prisma.connexion.delete({
            where: {
                id
            }
        });
        return true; // Successfully deleted
    }

    return false; // Not found
};

/**
 * Create a new connection between two stations
 * @param {string} fromStationId - The ID of the starting station
 * @param {string} toStationId - The ID of the destination station
 * @returns {Promise<object>} - The created connection object
 */
export const create = async (fromStationId, toStationId) => {
    // Création de la connexion
    const connection = await prisma.connexion.create({
        data: {
            fromStationId,
            toStationId
        }
    });

    // Récupération de la connexion créée avec les détails des stations associées
    return prisma.connexion.findUnique({
        where: { id: connection.id },
        select: {
            id: true,
            fromStation: {
                select: {
                    id: true,
                    name: true,
                    x: true,
                    y: true
                }
            },
            toStation: {
                select: {
                    id: true,
                    name: true,
                    x: true,
                    y: true
                }
            }
        }
    });
};

