import prisma from "../db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


/**
 * Returns all user.
 * @returns {Array} - An array of user
 */
export const getAll = async (sortBy, sortDirection) => {
    // If the sortBy parameter is provided, we will sort the users array
    let options = {
        select: {
            id: true,
            idt: true,
            password: true,
        }
    };
    if (sortBy) {
        if (!sortDirection) sortDirection = 'asc'
        options.orderBy = {
            [sortBy]: sortDirection
        }
    }

    return prisma.user.findMany(options)
}


/**
 * Returns a single station by its id
 * @param {number} id - The id of the station to get
 * @returns {object} - The station object or null if not found
 */
export const getById = async (id) => {
    return prisma.user.findUnique({
        select: {
            select: {
                id: true,
                idt: true,
                password: true,
            },
            where: {
                id
            }
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
        await prisma.user.delete({
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
 * @returns {Promise<object>} - An object containing the id and name of the created station
 * @param idt
 * @param password
 */
export const create = async (idt, password) => {
    // Vérification si un utilisateur avec cet idt existe déjà
    const count = await prisma.user.count({
        where: {
            idt: idt // Vérifier si l'idt existe déjà dans la base de données
        }
    });

    if (count > 0) throw new Error('Username already exists'); // Si l'utilisateur existe, on lève une exception

    // Cryptage du mot de passe avec bcrypt
    const encryptedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // Création du nouvel utilisateur
    const newUser = await prisma.user.create({
        data: {
            idt: idt,
            password: encryptedPassword,
        }
    });

    // Récupération et retour de l'utilisateur créé
    return prisma.user.findUnique({
        where: {
            id: newUser.id // Recherche de l'utilisateur créé par son ID
        },
        select: {
            id: true,
            idt: true,
        }
    });
};


export const login = async (idt, password) => {
    try {
        // Recherche de l'utilisateur par ID (idt)
        const user = await prisma.user.findUnique({
            where: {
                idt: idt // Recherche unique de l'utilisateur avec idt
            }
        });

        // Vérification si l'utilisateur existe
        if (!user) {
            throw new Error('User not found');
        }

        // Comparaison du mot de passe en texte brut avec le mot de passe crypté
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Génération du token JWT
        const token = jwt.sign(
            {
                id: user.id,
                idt: user.idt
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h' // Le token expire après 1 heure
            }
        );

        return token; // Retour du token généré
    } catch (error) {
        // Gestion d'erreur spécifique pour différents types d'erreurs
        if (error.message === 'User not found') {
            throw new Error('The provided username does not exist.');
        }
        if (error.message === 'Invalid password') {
            throw new Error('The password provided is incorrect.');
        }

        throw new Error('An unexpected error occurred during login.');
    }
};
