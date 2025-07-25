
const User = require('../models/User')
const becrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {
    try {
        const users_list = await User.find()
        res.json({
            data: users_list
        })

    } catch (error) {
        console.log(error)
    }
}


const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) return res.json({
            message: "User Already Registered"
        })

        const hashedPassword = await becrypt.hash(password, 10)

        await User.create({ name, email, password: hashedPassword })

        res.json({
            message: "User Registerd Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({
            message: " Ivalid credentials"
        })

        const isMatch = await becrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({
            message: " Ivalid credentials"
        })

        const payload = { user: { id: user.id } }
        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' })

        res.json({ message: 'successfully login', token })

        res.json({
            message: "User Registerd Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json({
            message: 'Sucess',
            user
        })
    } catch (error) {
        console.log(error)
    }
}









module.exports = { getAllUsers, register, login, getProfile }