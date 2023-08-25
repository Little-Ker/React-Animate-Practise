import React from 'react'

import styles from './dog.module.sass'
    
function Dog() {
  return (
    <div className={styles.dogView}>
      <div className={styles.scene}>
        <div className={styles.dog}>
          <div className={styles.ears}>
            <div className={styles.ear1}>
              <div className={styles.innerEar1}></div>
            </div>
            <div className={styles.ear2}>
              <div className={styles.innerEar2}></div>
            </div>
          </div>
          <div className={styles.eyes}>
            <div className={styles.eye}>
              <div className={styles.eyeBall}></div>
            </div>
            <div className={styles.eye}>
              <div className={styles.eyeBall}></div>
            </div>
          </div>
          <div className={styles.bottomFace}>
            <div className={styles.nose}></div>
            <div className={styles.mouse}>
              <div className={styles.tongue}></div>
            </div>
          </div>
        </div>
        <div className={styles.desktop}></div>
      </div>
    </div>   
  )
}
          
export default Dog