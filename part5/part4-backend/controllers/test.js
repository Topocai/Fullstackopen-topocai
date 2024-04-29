const Blog = require('../models/Blog')
const User = require('../models/User')
const testRouter = require('express').Router()

testRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

const dummyBlogs = [
    {
        title: 'First Blog',
        author: 'First Author',
        url: 'First Url',
        likes: 10
    },
    {
        title: 'Second Blog',
        author: 'Second Author',
        url: 'Second Url',
        likes: 20
    },
    {
        title: 'Third Blog',
        author: 'Third Author',
        url: 'Third Url',
        likes: 30
    }
]

testRouter.post('/randomBlogs', async (req, response) => {
    const dummyUser = await User.findOne({})
    const userId = dummyUser.id
    let blogObjects = dummyBlogs.map( blog => {
        blog.user = userId
        return new Blog(blog)
    })
    let promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    response.status(204).end()
})

module.exports = testRouter