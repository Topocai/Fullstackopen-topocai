import { useNotificationValue } from '../hooks/notification'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification.message) return null

  const style = {
    border: 'solid',
    borderColor: notification.color,
    padding: 10,
    borderWidth: 1,
  }

  return <article style={style}>{notification.message}</article>
}

export default Notification
