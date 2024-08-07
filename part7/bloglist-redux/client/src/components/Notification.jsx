import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notify)

  if (!notification.message) return null

  const style = {
    border: 'solid',
    borderColor: notification.color,
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return <article style={style}>{notification.message}</article>
}

export default Notification
