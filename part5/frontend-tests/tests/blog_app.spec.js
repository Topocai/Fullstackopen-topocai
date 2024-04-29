const { test, describe, beforeEach, expect } = require('@playwright/test')
const { rootUser, dummyBlog, dummyUser } = require('./blog_app_helper.js')

const helper = require('./blog_app_helper.js')

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await helper.createUser(request, rootUser.username, rootUser.name, rootUser.password)

    await page.goto('/')
  })

  test('Blog shows login form', async ({ page }) => {
    expect(await page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.loginAs(page, rootUser.username, rootUser.password)

      await expect(page.getByText(`${rootUser.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await helper.loginAs(page, 'root', 'wrong')

      await expect(page.getByText('invalid password')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await helper.loginAs(page, rootUser.username, rootUser.password)
    })

    test('blog can be created', async ({ page }) => {
      await helper.createBlog(page, dummyBlog.title, dummyBlog.author, dummyBlog.url)

      await expect(page.locator('.blog-container')).toBeVisible()
    })

    test('Blog can be liked', async ({ page }) => {
      await helper.createBlog(page, dummyBlog.title, dummyBlog.author, dummyBlog.url, true)

      await page.getByRole('button', { name: 'like' }).click()

      await page.getByText('1 likes').waitFor()
      await expect(page.getByText('1 likes')).toBeVisible()
    })

    test('New Blog can be removed', async ({ page }) => {
      await helper.createBlog(page, dummyBlog.title, dummyBlog.author, dummyBlog.url, true)

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      await page.locator('.blog-container').waitFor({ state: 'hidden' })

      expect(page.locator('.blog-container')).not.toBeVisible()
    })

    test('Blog cant be removed if not created by user', async ({ page, request }) => {
      await helper.createUser(request, dummyUser.username, dummyUser.name, dummyUser.password)
      await helper.createBlog(page, dummyBlog.title, dummyBlog.author, dummyBlog.url)

      await page.getByRole('button', { name: 'logout' }).click()

      await helper.loginAs(page, dummyUser.username, dummyUser.password)

      await page.getByRole('button', { name: 'view' }).click()
      expect(page.getByText('remove')).not.toBeVisible()
    })

    test('Blogs are ordered according to likes', async ({ page, request }) => {
      await request.post('/api/testing/randomBlogs')

      await page.reload()

      await page.getByRole('button', { name: 'view' }).first().click()
      await page.getByRole('button', { name: 'view' }).first().click()
      await page.getByRole('button', { name: 'view' }).first().click()

      const texts = await page.locator('.blog-container').allTextContents()
      expect(texts[0]).toContain('30 likes')
      expect(texts[1]).toContain('20 likes')
      expect(texts[2]).toContain('10 likes')
    })
  })
})
