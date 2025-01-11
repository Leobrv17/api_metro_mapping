import express from 'express'
import {
    getUsers,
    createUser,
    deleteUserById,
    getUsersById,
    loginUser,
} from "../controllers/user.controllers.js";
import authMiddleware from '../middlewares/auth.js'

// Create a new router
const router = express.Router()

// Define the routes and the functions that will be executed when those routes are requested
// The functions are imported from the controller(s)
router.get('/', getUsers) // Will match GET /users
router.post('/ ', loginUser) // Will match POST /users/login
router.get('/:id', getUsersById) // Will match GET /users/:id
router.delete('/:id', deleteUserById) // Will match DELETE /users/:id
router.post('/',authMiddleware, createUser) // Will match POST /users


// Export the router to be used on the app

export default router