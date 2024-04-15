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

blogsRouter.put('/:id', async (request, response) => {

  const likes = request.body.likes

  if (likes === undefined)
    return response.status(400).json({ error: 'likes missing' })

  const blogToUpdate = await Blog.findById(request.params.id)

  const newBlog = {
    ...blogToUpdate._doc,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

  module.exports = blogsRouter