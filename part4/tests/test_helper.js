const Blog = require('../models/Blog')

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const existingBlog = async () => {
    const blogs = await blogsInDb()
    return blogs[0]
}

const existingId = async () => {
    const blog = await existingBlog()
    return blog.id
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const dummyUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen'
}

const rootUser = {
    username: 'root',
    name: 'Superuser',
    password: 'shrek'
}

module.exports = {
    blogsInDb,
    existingId,
    existingBlog,
    usersInDb,
    dummyUser,
    rootUser
}