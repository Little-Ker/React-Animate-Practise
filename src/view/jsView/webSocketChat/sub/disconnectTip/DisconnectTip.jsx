import React, {
  useEffect, useCallback
} from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import styles from './disconnectTip.module.sass'
    
const DisconnectTip = (props) => {
  const { isShowTip, setIsShowTip } = props

  const showLoading = useCallback(() => {
    let tl = gsap.timeline()
    tl.to('#disconnectTipOverlay',{
      visibility: 'visible',
      duration: 0,
    }, 'reset').to('#disconnectTip',{
      opacity: 0,
      display: 'flex',
      marginTop: 0,
      duration: 0,
    }, 'reset').to('#disconnectTip',{
      duration: 0.1,
      opacity: 1,
      marginTop: '-60px',
    }).to('#disconnectTip',{
      delay: 1,
      duration: 0.1,
      marginTop: 0,
      opacity: 0,
    }).to('#disconnectTipOverlay',{
      visibility: 'hidden',
      duration: 0,
      onComplete: () => {
        setIsShowTip(false)
        tl.kill()
        tl = null
      },
    })
  }, [])

  useEffect(() => {
    if (isShowTip) {
      showLoading()
    }
  }, [isShowTip])

  return (
    <div id={'disconnectTipOverlay'} className={styles.disconnectTip}>
      <div id={'disconnectTip'} className={styles.tip}>
        {'連線已中斷'}
      </div>
    </div>
  )
}

DisconnectTip.propTypes = {
  isShowTip: PropTypes.bool,
  setIsShowTip: PropTypes.func,
}
    
DisconnectTip.defaultProps = {
  isShowTip: false,
  setIsShowTip: () => {},
}
     
    
export default DisconnectTip