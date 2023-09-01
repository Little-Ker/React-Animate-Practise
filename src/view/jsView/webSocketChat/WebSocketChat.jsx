import React, {
  useState, useEffect, useCallback, useRef
} from 'react'
import io from 'socket.io-client'
import Login from './sub/login'
import Chat from './sub/chat'
import styles from './webSocketChat.module.sass'
  
const WebSocketChat = () => {
  const [socket, setSocket] = useState(null)
  const [name, setName] = useState('')
  const [isLoadingSuc, setIsLoadingSuc] = useState(false)
  
  const [allMessage, setAllMessage] = useState([])

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (socket) {
      socket.on('message', data => setAllMessage([...allMessage, data])) 
    }
  }, [socket, allMessage])

  useEffect(() => {
    if (socket) {
      socket.on('newUserResponse', data => setUsers([...users, data])) 
    }
  }, [socket, users])

  useEffect(() => {
    console.log('===users', users)
  }, [users])

  const webSocketInit = useCallback(() => {
    // 建立 WebSocket 連接
    const newSocket = io('http://localhost:4040') // 換成你的 WebSocket 伺服器地址
  
    const stateArr = [
      '正在連接中...',
      '連接成功可以傳訊息',
      '連接正在關閉中..',
      '連接已關閉or連接失敗',
    ]
  
    console.log('newSocket',newSocket)
  
    newSocket.on('connection', (e) => {
      console.log('tip:', stateArr[newSocket?.readyState || 0])
    })
  
    newSocket.on('disconnect', (e) => {
      console.log('tip:', stateArr[newSocket?.readyState || 0])
    })

    newSocket?.on('newUserResponse', (data) => {
      setUsers(data)
    })

  
    // 設定接收到訊息的監聽器
    // newSocket.on('message', (data) => {
    //   console.log('received message:', data)
    //   console.log('allMessage',allMessage)
    //   setAllMessage([...allMessage, data])
    // })
  
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])
  
  useEffect(() => {
    webSocketInit()
  }, [])
  
  return (
    <div className={styles.webSocketChat}>
      {(isLoadingSuc) ? (
        <Chat socket={socket} allMessage={allMessage} name={name} />
      ) : (
        <Login socket={socket} setIsLoadingSuc={setIsLoadingSuc} name={name} setName={setName}  />
      )}
    </div>
  )
}
  
export default WebSocketChat