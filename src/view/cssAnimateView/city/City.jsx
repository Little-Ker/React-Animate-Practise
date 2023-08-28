import React from 'react'
import clsx from 'clsx'
import styles from './city.module.sass'
    
function City() {
  const starAry = [...Array(30).keys()]
  console.log('starAry',starAry)

  return (
    <div className={styles.cityView}>
      <label htmlFor="checkbox">
        <input type="checkbox" id="checkbox" />
        <div className={styles.scene}>
          <h1 className={styles.title}>Click Change Sky!</h1>
          <h2 className={styles.dayText}>Day Sky</h2>
          <h2 className={styles.nightText}>Night Sky</h2>
          <div className={styles.sun}></div>
          <div className={styles.moon}></div>
          <div className={styles.starSky}>
            {starAry.map((cur, index) => (
              <div key={cur} className={clsx(styles.star, styles[`star${index + 1}`])}></div>
            ))}
          </div>
          <div className={styles.building}>
            <div className={styles.house1}>
              <div className={styles.window}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
              </div>
            </div>
            <div className={styles.house2}>
              <div className={styles.door}></div>
            </div>
            <div className={styles.house3}>
              <div className={styles.wall1}>
                <div className={styles.window}></div>
              </div>
              <div className={styles.wall2}>
                <div className={styles.window}></div>
              </div>
              <div className={styles.wall3}>
                <div className={styles.window}></div>
              </div>
              <div className={styles.roof}>
                <div className={styles.smallRoof}>
                  <div className={styles.cross}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>   
  )
}
          
export default City