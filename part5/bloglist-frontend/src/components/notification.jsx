import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, color }) => {
  if (message === null) return null
  const colorToUse = color || 'green'
  const styleSheet = {
    color: colorToUse,
    borderLeft: `2px solid ${colorToUse}`
  }
  return (
    <div className="notification" style={styleSheet}>
        {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string
}

export default Notification
