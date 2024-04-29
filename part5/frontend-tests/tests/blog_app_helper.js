const loginAs = async (page, username, password) => {
  await page.locator('div').filter({ hasText: /^username$/ }).getByRole('textbox').fill(username)
  await page.locator('div').filter({ hasText: /^password$/ }).getByRole('textbox').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url, view = false, alreadyOpen = false) => {
  if (!alreadyOpen) {
    await page.getByRole('button', { name: 'new blog' }).click()
  }

  await page.getByPlaceholder('title').fill(title)
  await page.getByPlaceholder('author').fill(author)
  await page.getByPlaceholder('url').fill(url)

  await page.getByRole('button', { name: 'Create' }).click()

  if (view) {
    await page.getByRole('button', { name: 'view' }).click()
  }
}

const createUser = async (request, username, name, password) => {
  await request.post('/api/users', {
    data: {
      username,
      name,
      password
    }
  })
}

const rootUser = {
  username: 'root',
  name: 'Superuser',
  password: 'salainen'
}

const dummyUser = {
  username: 'mluukkai',
  name: 'Matti Luukkainen',
  password: 'salainen'
}

const dummyBlog = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
}

module.exports = {
  loginAs,
  createBlog,
  createUser,
  rootUser,
  dummyUser,
  dummyBlog
}
