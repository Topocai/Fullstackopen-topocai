const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const Blog = require('../models/Blog')

const helper = require('./test_helper')

const app = require('../app')
const { default: mongoose } = require('mongoose')

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

describe.only('Initial blogs', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        let blogObjects = initialBlogs.map(blog => new Blog(blog))
        let promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    describe('Blog structure', () => {
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
    })
    
    describe('Blogs posts', () => {
        test('post works', async () => {
            const newBlog = {
                title: 'A new blog',
                author: 'Topocai',
                url: 'https://topocai.github.io'
            }
            
            await api.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
            const response = await api.get('/api/blogs')
        
            const titles = response.body.map(r => r.title)
        
            assert.strictEqual(response.body.length, initialBlogs.length + 1)
            assert(titles.includes('A new blog'))
        })
        
        test('blog without likes sets to 0', async () => {
            const newBlog = {
                title: 'A new blog',
                author: 'Topocai',
                url: 'https://topocai.github.io'
            }
        
            await api.post('/api/blogs').send(newBlog)
            .expect((res) => delete res.body.id)
            .expect(201, {
                ...newBlog,
                likes: 0
            })
        })
        
        test('blog without url or title returns 400', async () => {
            const newBlog = {
                author: 'Topocai'
            }
        
            await api.post('/api/blogs').send(newBlog)
            .expect(400)
        })
    })

    describe('Blogs delete', () => {
      test('delete works', async () => {
        const idToDelete = await helper.existingId()
 
        await api.delete(`/api/blogs/${idToDelete}`)
        .expect(204)
      })

      test('Delete an inexistent blog returns 404', async () => await api.delete('/api/blogs/777744444').expect(404))
    })

    describe('Blogs update', () => {
      test('update works', async () => {
        const blogToUpdate = await helper.existingBlog()

        const updatedBlog = {
          ...blogToUpdate,
          likes: 999
        }
        
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog)
        .expect(200, {...blogToUpdate, likes: 999})
      })

      test('Update without likes property returns 400', async () => {
        const blogToUpdate = await helper.existingBlog()

        const updatedBlog = {
          ...blogToUpdate,
          likes: undefined
        }

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog)
        .expect(400)
      })
    })
})

after(async () => {
    mongoose.connection.close()
})