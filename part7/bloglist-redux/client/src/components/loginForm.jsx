import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onLoginHandler }) => {
  return (
    <form onSubmit={onLoginHandler}>
      <div>
        username
        <input id="username" />
      </div>
      <div>
        password
        <input id="password" type="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  onLoginHandler: PropTypes.func.isRequired,
}

export default LoginForm
