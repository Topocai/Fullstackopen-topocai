const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/User')

const helper = require('./test_helper')

const app = require('../app')
const { default: mongoose } = require('mongoose')

const api = supertest(app)
const bcrypt = require('bcrypt')

const dummyUser = helper.dummyUser

describe('Test for login', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const userObject = {...helper.rootUser}
        const passwordHash = await bcrypt.hash(userObject.password, 10)

        delete userObject.password

        const user = new User({ ...userObject, passwordHash })
        await user.save()
    })

    test('already existing user returns token', async () => {
        const response = await api.post('/api/login').send({...helper.rootUser})
        .expect(200)
        assert.strictEqual((response.body.token !== undefined), true)
    })

    test('non existing user returns 401', async () =>
        await api.post('/api/login').send({...dummyUser}).expect(401))

    test('wrong password returns 401', async () =>
        await api.post('/api/login').send({...helper.rootUser, password: 'wrong'}).expect(401))
})

after(() => {
    mongoose.connection.close()
})