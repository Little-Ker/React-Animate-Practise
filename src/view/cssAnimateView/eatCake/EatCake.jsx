import React from 'react'

import styles from './eatCake.module.sass'
    
function EatCake() {
  return (
    <div className={styles.eatCakeView}>
      <div className={styles.scene}>
        <h1 className={styles.title}>Where is my cake !!</h1>
        <div className={styles.person}>
          <div className={styles.hair}>
            <div className={styles.hair1}></div>
            <div className={styles.hair2}></div>
            <div className={styles.hair3}></div>
          </div>
          <div className={styles.face}>
            <div className={styles.eyes}>
              <div className={styles.eye}>
                <div className={styles.eyeBall}></div>
              </div>
              <div className={styles.eye}>
                <div className={styles.eyeBall}></div>
              </div>
            </div>
            <div className={styles.mouse}>
              <div className={styles.cake}></div>
            </div>
          </div>
        </div>
      </div>
    </div>   
  )
}
          
export default EatCake