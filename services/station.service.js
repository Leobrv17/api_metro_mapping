import prisma from "../db.js";



/**
 * Returns all station.
 * @returns {Array} - An array of station
 */
export const getAll = async (sortBy, sortDirection) => {
    // If the sortBy parameter is provided, we will sort the users array
    let options = {
        select: {
            id: true,
            name: true,
            x: true,
            y: true
        }
    };
    if (sortBy) {
        if (!sortDirection) sortDirection = 'asc'
        options.orderBy = {
            [sortBy]: sortDirection
        }
    }

    return prisma.station.findMany(options)
}


/**
 * Returns a single station by its id
 * @param {number} id - The id of the station to get
 * @returns {object} - The station object or null if not found
 */
export const getById = async (id) => {
    return prisma.station.findUnique({
        select: {
            id: true,
            name: true,
            x: true,
            y: true
        },
        where: {
            id
        }
    })
}


/**
 * Deletes a station by its id
 * @param {number} id
 * @returns {boolean} - True if the station was deleted, false if not found
 */
export const deleteById = async (id) => {
    if (await getById(id)) {
        await prisma.ligne.delete({
            where: {
                id
            }
        })
        return true
    }
    return false
}


/**
 * Create a new station with the given name and coordinates (x, y)
 * @param {string} name - The name of the station
 * @param {number} x - The x-coordinate of the station
 * @param {number} y - The y-coordinate of the station
 * @returns {Promise<object>} - An object containing the id and name of the created station
 */
export const create = async (name, x, y) => {
    // Création de la station
    const station = await prisma.station.create({
        data: {
            name,
            x,
            y
        }
    });

    // Récupération de la station créée avec uniquement les champs id et name
    return prisma.station.findUnique({
        where: { id: station.id },
        select: {
            id: true,
            name: true
        }
    });
};

