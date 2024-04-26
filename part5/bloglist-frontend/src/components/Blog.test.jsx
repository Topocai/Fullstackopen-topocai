import React from 'react'
// eslint-disable-next-line no-unused-vars
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import PostBlog from './blogForm'

import blogServices from '../services/blogs'

const getDummyBlog = async () => {
  const blogs = await blogServices.getAll()
  const dummyBlog = blogs[0]
  return dummyBlog
}

describe('Blog tests', () => {
  test('renders blog content without details', async () => {
    const dummyBlog = await getDummyBlog()
    const { container } = render(<Blog blog={dummyBlog} refreshBlogs={() => {}} />)

    const div = container.querySelector('.blog-container')
    const a = container.querySelector('a')

    expect(div).toHaveTextContent(dummyBlog.title) // Shows title
    expect(a).toBeNull() // But don't show url
  })

  test('renders blog content with details after click', async () => {
    const dummyBlog = await getDummyBlog()
    const { container } = render(<Blog blog={dummyBlog} refreshBlogs={() => {}} />)

    const user = userEvent.setup()
    const button = container.querySelector('button')

    await user.click(button)

    const div = container.querySelector('.blog-container')
    const a = container.querySelector('a')

    expect(div).toHaveTextContent(dummyBlog.title) // Show title
    expect(a).toHaveTextContent(dummyBlog.url) // And also details
  })

  test('clicking the button twice calls event handler twice', async () => {
    const dummyBlog = await getDummyBlog()
    const mockHandler = vi.fn()

    /**
     * Blog.jsx was modified for this test to work
     * only changes the likeHandler to call mockHandler
    */
    render(<Blog blog={dummyBlog} refreshBlogs={mockHandler} />)

    const user = userEvent.setup()
    const showButton = screen.getByText('view')

    await user.click(showButton)

    await user.click(screen.getByText('Like'))
    await waitFor(() => expect(screen.getByText('Like')).not.toBeDisabled()) //  Wait for button to be enabled to second click

    await user.click(screen.getByText('Like'))
    await waitFor(() => expect(screen.getByText('Like')).not.toBeDisabled()) //  Wait for buttonAction and mockHandler catches the click

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('Blog Form returns the right values', async () => {
    const onBlogPost = vi.fn()
    render(<PostBlog onBlogPost={onBlogPost} />)

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('Url')

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'Test Url')

    await user.click(screen.getByText('Create'))

    expect(onBlogPost.mock.calls[0][1]).toEqual({
      newBlogTitle: 'Test Title',
      newBlogAuthor: 'Test Author',
      newBlogUrl: 'Test Url'
    })
  })
})
