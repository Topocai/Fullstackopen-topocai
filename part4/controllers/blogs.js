const Blog = require('../models/Blog')
const blogsRouter = require('express').Router()


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const newBlogData = new Blog(request.body)

  if(!newBlogData.title || !newBlogData.url)
    return response.status(400).json({ error: 'title or url missing' })

  newBlogData.likes = 0;

  const newBlog = await newBlogData.save()
  response.status(201).json(newBlog)
})

  module.exports = blogsRouter