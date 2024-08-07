import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <article className="spawn-container">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <ul key={blog.id}>
            <li>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          </ul>
        ))
      ) : (
        <p>No blogs added yet</p>
      )}
    </article>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default BlogList
