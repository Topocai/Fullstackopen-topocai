import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"

import { useEffect } from "react"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    const time = notification ? notification.time : 5000
    const timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, time)
    return () => {
      clearTimeout(timeout)
    }
  }, [notification])

  if(!notification) return null

  const style = {
    border: 'solid',
    borderColor: notification.color,
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification