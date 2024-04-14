const { test, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const Blog = require('../models/Blog')

const app = require('../app')

const api = supertest(app)

const initialBlogs = [
    {
        id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObjects = initialBlogs.map(blog => new Blog(blog))
    let promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id property isnt called "_id"', async () => {
    const response = await api.get('/api/blogs')

    const has_Id = response.body[0].hasOwnProperty('_id')
    const hasId = response.body[0].hasOwnProperty('id')

    assert.strictEqual((!has_Id && hasId), true)
})