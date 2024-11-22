import express from 'express'
import {getStations, createStation, deleteStationById, getStationById} from "../controllers/station.controller.js";

// Create a new router
const router = express.Router()

// Define the routes and the functions that will be executed when those routes are requested
// The functions are imported from the controller(s)
router.get('/', getStations) // Will match GET /users
router.get('/:id', getStationById) // Will match GET /users/:id
router.delete('/:id', deleteStationById) // Will match DELETE /users/:id
router.post('/', createStation) // Will match POST /users

// Export the router to be used on the app
export default router