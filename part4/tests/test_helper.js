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



module.exports = {
    blogsInDb,
    existingId,
    existingBlog
}