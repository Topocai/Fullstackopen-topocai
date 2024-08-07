import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <nav>
      <Link style={padding} to="/">Anecdotes</Link>
      <Link style={padding} to="/create">Create new</Link>
      <Link style={padding} to="/about">About</Link>
    </nav>
  )
}

export default Menu
