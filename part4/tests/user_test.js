const { test, beforeEach, after, describe } = require('node:test')
const supertest = require('supertest')
const User = require('../models/User')

const helper = require('./test_helper')

const app = require('../app')
const { default: mongoose } = require('mongoose')

const api = supertest(app)
const bcrypt = require('bcrypt')

const dummyUser = helper.dummyUser

describe('Test for users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const userObject = {...helper.rootUser}
        const passwordHash = await bcrypt.hash(userObject.password, 10)

        delete userObject.password

        const user = new User({ ...userObject, passwordHash })
        await user.save()
    })

    test('already existing user', async () => 
        await api.get('/api/users').expect(200).expect((res) => res.body.name === 'Superuser'))

    test('creation of user works', async () => 
        await api.post('/api/users').send({...dummyUser}).expect(201).expect((res) => res.body.name === dummyUser.name))

    test('Creation of a user without password or username returns 400', async () => 
        await api.post('/api/users').send({...dummyUser, password: null}).expect(400))

    test('Creation of an existing username returns 409', async () => 
        await api.post('/api/users').send({...dummyUser, username: 'root'}).expect(409))

    test('Creation of a user with too short password returns 400', async () => 
        await api.post('/api/users').send({...dummyUser, password: 'sa'}).expect(400))

    test('Creation of a user with too short username returns 400', async () => 
        await api.post('/api/users').send({...dummyUser, username: 'm'}).expect(400))
})

after(() => {
    mongoose.connection.close()
})