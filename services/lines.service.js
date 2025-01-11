import prisma from "../db.js";



/**
 * Returns all lines.
 * @returns {Array} - An array of lines
 */
export const getAll = async (sortBy, sortDirection) => {
    // If the sortBy parameter is provided, we will sort the users array
    let options = {
        select: {
            id: true,
            name: true,
            couleur: true,
            open: true

        }
    };
    if (sortBy) {
        if (!sortDirection) sortDirection = 'asc'
        options.orderBy = {
            [sortBy]: sortDirection
        }
    }

    return prisma.ligne.findMany(options)
}


/**
 * Returns a single line by its id
 * @param {number} id - The id of the line to get
 * @returns {object} - The line object or null if not found
 */
export const getById = async (id) => {
    return prisma.ligne.findUnique({
        select: {
            id: true,
            name: true,
            couleur: true,
            open: true
        },
        where: {
            id
        }
    })
}


/**
 * Deletes a line by its id
 * @param {number} id
 * @returns {boolean} - True if the line was deleted, false if not found
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
 * Create a new line with the given name, couleur, and open status
 * @param {string} name - The name of the line
 * @param {string} couleur - The color of the line
 * @param {boolean} open - The status of the line (true for open, false for closed)
 * @returns {Promise<object>} - An object containing the id and name of the created line
 */
export const create = async (name, couleur, open) => {
    // Création de la ligne
    const line = await prisma.ligne.create({
        data: {
            name,
            couleur,
            open
        }
    });
    return prisma.ligne.findUnique({
        where: {id: line.id},
        select: {
            id: true,
            name: true
        }
    });
};

export const addStationToLigne = async (ligneId, stationId) => {
    const ligne = await prisma.ligne.findUnique({
        where: { id: ligneId },
    });

    if (!ligne) {
        throw new Error(`Ligne with ID "${ligneId}" not found.`);
    }

    const station = await prisma.station.findUnique({
        where: { id: stationId },
    });

    if (!station) {
        throw new Error(`Station with ID "${stationId}" not found.`);
    }

    return prisma.ligne.update({
        where: { id: ligneId },
        data: {
            stations: {
                connect: { id: stationId }, // Connecter la station
            },
        },
        include: { stations: true },
    });
};