const Blog = require('../models/Blog')
const User = require('../models/User')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const newBlogData = {...request.body}

  if(!newBlogData.title || !newBlogData.url)
    return response.status(400).json({ error: 'title or url missing' })

  const users = await User.find({})
  const userAuthor = users[0]

  newBlogData.user = userAuthor.id

  const newBlogSchema = new Blog(newBlogData)

  newBlogSchema.likes = 0;

  userAuthor.blogs = [...userAuthor.blogs].concat(newBlogSchema.id)
  await userAuthor.save()

  const newBlog = await newBlogSchema.save()
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