import {getAll, getById, create, deleteById, login} from "../services/user.service.js";


export const getUsers = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDir)
    res.json({
        success: true, data
    })
}

export const getUsersById = async (req, res) => {
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

export const deleteUserById = async (req, res) => {
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

export const createUser = async (req, res) => {
    const {idt, password} = req.body

    const line = await create(idt,password)

    res.json({
        success: true, data: line
    })
}

export const loginUser = async (req, res, next) => {
    const { idt, password } = req.body
    let token

    try {
        token = await login(idt, password)
    } catch (err) {
        return next(err)
    }

    // We will return a success message if the login was successful and the token
    res.json({
        success: true,
        message: 'Login successful',
        token: token
    })
}