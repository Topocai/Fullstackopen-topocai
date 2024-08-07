import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const UsersList = ({ users }) => {
  return (
    <article>
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <b>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </b>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
}

export default UsersList
