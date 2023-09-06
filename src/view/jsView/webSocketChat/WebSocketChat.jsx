import React, {
  useState, useEffect, useCallback
} from 'react'
import io from 'socket.io-client'
import Login from './sub/login'
import Chat from './sub/chat'
import styles from './webSocketChat.module.sass'
  
const WebSocketChat = () => {
  const [socket, setSocket] = useState(null)
  const [isLoadingSuc, setIsLoadingSuc] = useState(false)
  
  const [name, setName] = useState('')
  const [allMessage, setAllMessage] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!socket || !socket?.connected) return
    socket.on('message', data => setAllMessage([...allMessage, data])) 
  }, [socket, allMessage])

  useEffect(() => {
    if (!socket || !socket?.connected) return
    socket.on('userResponse', data => setUsers(data)) 
  }, [socket, users])

  const webSocketInit = useCallback(() => {
    // 建立 WebSocket 連接
    const newSocket = io('http://localhost:4040')
  
    const stateArr = [
      '正在連接中...',
      '連接成功可以傳訊息',
      '連接正在關閉中..',
      '連接已關閉or連接失敗',
    ]
  
    newSocket.on('connection', (e) => {
      console.log('tip:', stateArr[newSocket?.readyState || 0])
    })
  
    newSocket.on('disconnect', (e) => {
      console.log('tip:', stateArr[newSocket?.readyState || 0])
    })

    newSocket?.on('userResponse', (data) => {
      setUsers(data)
    })
  
    // 設定接收到訊息的監聽器
    // newSocket.on('message', (data) => {
    //   setAllMessage([...allMessage, data])
    // })
  
    setSocket(newSocket)

    return () => newSocket.disconnect()
  }, [])
  
  useEffect(() => {
    webSocketInit()
  }, [])
  
  return (
    <div className={styles.webSocketChat}>
      {(isLoadingSuc) ? (
        <Chat
          socket={socket}
          allMessage={allMessage}
          name={name}
          setIsLoadingSuc={setIsLoadingSuc}
          setAllMessage={setAllMessage}
        />
      ) : (
        <Login
          socket={socket}
          setIsLoadingSuc={setIsLoadingSuc}
          name={name}
          setName={setName}
        />
      )}
    </div>
  )
}
  
export default WebSocketChat