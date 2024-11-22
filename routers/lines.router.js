import express from 'express'
import {getLines, getLineById, deleteLineById, createLine} from "../controllers/lines.controller.js";

// Create a new router
const router = express.Router()

// Define the routes and the functions that will be executed when those routes are requested
// The functions are imported from the controller(s)
router.get('/', getLines) // Will match GET /users
router.get('/:id', getLineById) // Will match GET /users/:id
router.delete('/:id', deleteLineById) // Will match DELETE /users/:id
router.post('/', createLine) // Will match POST /users

// Export the router to be used on the app
export default router