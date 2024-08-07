import { useReducer, createContext, useEffect, useContext } from 'react'

const initialState = { message: null, color: 'green', time: 5 }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'notify/set':
      return action.payload
    case 'notify/clear':
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const clearNotification = () => ({ type: 'notify/clear' })

export const setNotification = (message, color = 'green', time = 5) => ({
  type: 'notify/set',
  payload: { message, color, time },
})

const useNotificationEffect = (notification, dispatch) => {
  useEffect(() => {
    const time = notification ? notification.time * 1000 : 5000
    const timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, time)
    return () => {
      clearTimeout(timeout)
    }
  }, [notification, dispatch])
}

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState,
  )

  useNotificationEffect(notification, notificationDispatch)
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const state = useContext(NotificationContext)
  if (state) return state[0]
  else return null
}

export const useNotificationDispatch = () => {
  const state = useContext(NotificationContext)
  if (state) return state[1]
  else return null
}

export default NotificationContext
