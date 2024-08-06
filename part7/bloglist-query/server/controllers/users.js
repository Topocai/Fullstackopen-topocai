const User = require('../models/User')
const userRouter = require('express').Router()

const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { id: 1, title: 1, url: 1, likes: 1 })
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.username || !body.password)
        return response.status(400).json({ error: 'username or password missing' })

    if(body.password.length < 3)
        return response.status(400).json({ error: 'password must be at least 3 characters long' })

    const passwordHash = await bcrypt.hash(body.password, 10)

    const userToSave = {
        username: body.username,
        name: body.name || body.username,
        passwordHash
    }

    console.log(userToSave)

    const user = new User(userToSave)
    const newUser = await user.save()
    response.status(201).json(newUser)
})

module.exports = userRouter