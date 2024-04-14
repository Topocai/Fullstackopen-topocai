const Blog = require('../models/Blog')
const blogsRouter = require('express').Router()


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const newBlogData = new Blog(request.body)
  const newBlog = await newBlogData.save()
  response.status(201).json(newBlog)
})

  module.exports = blogsRouter