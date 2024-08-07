import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const ToggeableComponent = forwardRef(
  ({ children, hideLabel, showLabel }, refs) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      }
    })

    if (visible) {
      return (
        <div className="toggeable">
          <button onClick={toggleVisibility}>{hideLabel}</button>
          {children}
        </div>
      )
    } else {
      return (
        <div className="toggeable">
          <button onClick={toggleVisibility}>{showLabel}</button>
        </div>
      )
    }
  },
)

ToggeableComponent.displayName = 'Toggeable'

ToggeableComponent.propTypes = {
  children: PropTypes.node.isRequired,
  hideLabel: PropTypes.string.isRequired,
  showLabel: PropTypes.string.isRequired,
}

export default ToggeableComponent
