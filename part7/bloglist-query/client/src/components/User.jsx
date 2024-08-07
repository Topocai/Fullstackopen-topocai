import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <article>
      <Link to="/users">List</Link>
      <h3>- {user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.length > 0
          ? user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))
          : 'no blogs added yet'}
      </ul>
    </article>
  )
}

export default User
