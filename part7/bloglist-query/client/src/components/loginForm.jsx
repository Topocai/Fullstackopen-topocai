import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onLoginHandler }) => {
  return (
    <form onSubmit={onLoginHandler} className="spawn-container">
      <div>
        username
        <input id="username" required />
      </div>
      <div>
        password
        <input id="password" type="password" required />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  onLoginHandler: PropTypes.func.isRequired,
}

export default LoginForm
