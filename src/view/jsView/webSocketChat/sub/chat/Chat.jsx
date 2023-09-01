import React, {
  useState, useCallback, useEffect 
} from 'react'
import PropTypes from 'prop-types'
import styles from './chat.module.sass'
import clsx from 'clsx'
      
const Chat = (props) => {
  const { socket, setIsLoadingSuc, allMessage, name } = props
  const [message, setMessage] = useState('')

  // 訊息變多 bar 要滾動
  useEffect(() => {
    const scrollHeight = document.getElementById('chatBody').scrollHeight
    document.getElementById('chatBody').scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    })
  }, [allMessage])

  const leaveChatFn = useCallback(() => {
    socket?.disconnect()
    setIsLoadingSuc(false)
  }, [socket])

  const sendMessageFn = useCallback(() => {
    if (socket && message !== '') {
      const messageData = {
        id: socket.id,
        message: message,
        name: name,
      }
      socket.emit('sendMessage', messageData)
      setMessage('')
    }
  }, [message, socket])
  
  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <p className={styles.chatName}>{'聊天室'}</p>
        <button onClick={leaveChatFn} className={styles.leaveBtn}>{'離開聊天'}</button>
      </div>
      <div id={'chatBody'} className={styles.body}>
        {allMessage.map((cur, index) => {
          if (cur.id === socket.id) { // 自己的訊息
            return (<div key={index} className={clsx(styles.dialog, styles.myselfBox)}>
              <p className={styles.chat}>{cur.message}</p>
            </div>)
          } else if (cur.id === 'tip') {
            return (<p key={index} className={styles.tip}>{cur.message}</p>)
          }  else {
            return (<div key={index} className={clsx(styles.dialog, styles.otherBox)}>
              <div className={styles.photo}>{cur.name}</div>
              <p className={styles.chat}>{cur.message}</p>
            </div>)
          }
        })}
      </div>
      <div className={styles.footer}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="輸入訊息"
        />
        <button onClick={sendMessageFn}>{'傳送訊息'}</button>
      </div>
    </div>
  )
}
  
Chat.propTypes = {
  socket: PropTypes.object,
  setIsLoadingSuc: PropTypes.func,
  allMessage: PropTypes.array,
  name: PropTypes.string,
}
    
Chat.defaultProps = {
  socket: null,
  setIsLoadingSuc: () => {},
  allMessage: [],
  name: '',
}
      
export default Chat