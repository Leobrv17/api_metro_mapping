import {getAll, getById, deleteById, create} from "../services/lines.service.js";

export const getLines = async (req, res) => {
    // Calling the service function with the sortBy and sortDir parameters from the query string
    // The query string is an object containing all the parameters sent in the URL after the ? character
    // These values can be null or undefined if not provided
    const data = await getAll(req.query.sortBy, req.query.sortDir)
    res.json({
        success: true, data
    })
}

export const getLineById = async (req, res) => {
    // Calling the service function with the id parsed as an integer, the id is a path parameter from the URL, it's a string, declared in the router
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

export const deleteLineById = async (req, res) => {
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

export const createLine = async (req, res) => {
    // We will get the username and password from the request body
    const {name, couleur, open} = req.body

    // We will call the service function with the username and password
    const line = await create(name, couleur, open)

    // We will return the created line
    res.json({
        success: true, data: line
    })
}