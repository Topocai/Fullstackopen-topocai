import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onLoginHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
       <form onSubmit={(e) => onLoginHandler(e, { username, password })}>
         <div>
           username
           <input onChange={(e) => setUsername(e.target.value)}/>
         </div>
         <div>
           password
           <input type="password" onChange={(e) => setPassword(e.target.value)}/>
         </div>
         <button type='submit'>login</button>
       </form>
  )
}

LoginForm.propTypes = {
  onLoginHandler: PropTypes.func.isRequired
}

export default LoginForm
