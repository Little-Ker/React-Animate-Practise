import React, {
  useCallback, useEffect 
} from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import styles from './monsterLoading.module.sass'
  
function MonsterLoading() {

  const showLoading = useCallback(() => {
    let tl = gsap.timeline()
    tl.to('#loadingBar',{
      width: '100%',
      duration: 2,
      ease: 'none',
    }).to('#loadingMonster',{
      duration: 0.3,
      rotate: 180,
      scale: 0.1,
      ease: 'none',
    }).to('#loadingView',{
      duration: 0.3,
      opacity: 0,
      ease: 'none',
      onComplete: () => {
        tl.kill()
        tl = null
      },
    })
  }, [])

  useEffect(() => {
    showLoading()
  }, [])


  return (
    <div className={styles.monsterLoading}>
      <h1>Hello!!</h1>
      <div className={styles.monster}>
        <div className={styles.eye}>
          <div className={styles.eyeBall}></div>
        </div>
        <div className={styles.mouth}></div>
      </div>
      <div className={clsx(styles.monster, styles.blueMonster)}>
        <div className={styles.eye}>
          <div className={styles.eyeBall}></div>
        </div>
        <div className={styles.mouth}></div>
      </div>
      <div id={'loadingView'} className={styles.loading}>
        <div id={'loadingMonster'} className={styles.monster}>
          <div className={styles.eye}>
            <div className={styles.eyeBall}></div>
          </div>
          <div className={styles.mouth}></div>
        </div>
        <div className={styles.loadBar}>
          <div id={'loadingBar'} className={styles.bar}></div>
        </div>
      </div>
    </div> 
  )
}
          
export default MonsterLoading