import {getAll, getById, create, deleteById} from "../services/station.service.js";


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