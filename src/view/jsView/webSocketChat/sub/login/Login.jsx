import React, {
  useState, useCallback 
} from 'react'
import PropTypes from 'prop-types'
import styles from './login.module.sass'
import clsx from 'clsx'
    
const Login = (props) => {
  const { socket, setIsLoadingSuc, setName, name  } = props
  const [tip, setTip] = useState('')

  const onEnterChat = useCallback(() => {
    if (socket) {
      setTip('')
      const userData = {
        name: name,
        id: socket.id,
      }
      socket.emit('newUserResponse', userData)

      const newUserMessage = {
        id: 'tip',
        message: `${name}已加入聊天室`,
      }
      socket.emit('sendMessage', newUserMessage)
      setIsLoadingSuc(true)
      return
    }
    setTip('*連線失敗')
  }, [name])

  return (
    <div className={styles.login}>
      <div className={styles.loginBox}>
        <p className={styles.nameTitle} >{'請輸入名字：'}</p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <p className={styles.tip}>{tip}</p>
        <button className={clsx(name.length === 0 && styles.disabledBtn)} disabled={name.length === 0} onClick={() => { onEnterChat('sendMessage') }}>{'進入聊天室'}</button>
      </div>
    </div>
  )
}

Login.propTypes = {
  socket: PropTypes.object,
  setIsLoadingSuc: PropTypes.func,
  setName: PropTypes.func,
  name: PropTypes.string,
  message: PropTypes.array,
}
  
Login.defaultProps = {
  socket: null,
  setIsLoadingSuc: () => {},
  setName: () => {},
  name: '',
  message: [],
}
    
export default Login