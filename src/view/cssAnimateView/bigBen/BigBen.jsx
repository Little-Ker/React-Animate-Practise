import React from 'react'
import clsx from 'clsx'
import styles from './bigBen.module.sass'
  
function BigBen() {
  const topRecAry = [...Array(10).keys()]
  const bottomDecorateAry = [...Array(10).keys()]
  const boxAry = [...Array(20).keys()]
  const starAry = [...Array(30).keys()]

  return (
    <div className={styles.bigBenView}>
      <label htmlFor="checkbox">
        <input type="checkbox" id="checkbox" />
        <div className={styles.scene}>
          <h1 className={styles.title}>Big Ben</h1>
          <div className={styles.sky}></div>
          <div className={styles.sun}></div>
          <div className={styles.starSky}>
            {starAry.map((cur, index) => (
              <div key={cur} className={clsx(styles.star, styles[`star${index + 1}`])}></div>
            ))}
          </div>
          <div className={styles.moon}></div>
          <div className={clsx(styles.cloud, styles.cloudGroup1)}>
            <div className={styles.cloud1}></div>
            <div className={styles.cloud2}></div>
            <div className={styles.cloud3}></div>
          </div>
          <div className={clsx(styles.cloud, styles.cloudGroup2)}>
            <div className={styles.cloud1}></div>
            <div className={styles.cloud2}></div>
            <div className={styles.cloud3}></div>
          </div>
          <div className={styles.bg}>
            {boxAry.map((cur, index) => (
              <div key={cur} className={styles[`box${index+1}`]}></div>
            ))}
          </div>
          <div className={styles.building}>
            <div className={styles.roof}>
              <div className={clsx(styles.cross, styles.cross1)}></div>
              <div className={styles.roofWall}>
                <div className={styles.roofWall1}></div>
                <div className={styles.roofWall2}></div>
                <div className={styles.roofWall3}></div>
              </div>
            </div>
            <div className={styles.topWall1}></div>
            <div className={styles.topWall2}>
              <div className={clsx(styles.cross, styles.cross2)}></div>
              <div className={clsx(styles.cross, styles.cross3)}></div>
              <div className={styles.rectList}>
                {topRecAry.map(cur => (
                  <div key={cur} className={styles.rect}></div>
                ))}
              </div>
            </div>
            <div className={styles.centerWall}>
              <div className={styles.clock}>
                <div className={styles.centerDot}></div>
                <div className={styles.longHand}></div>
                <div className={styles.shorthand}></div>
              </div>
            </div>
            <div className={styles.bottomWall}>
              <div className={styles.bottomWall1}></div>
              <div className={styles.bottomWall2}>
                {bottomDecorateAry.map(cur => (
                  <div key={cur} className={styles.decorate}></div>
                ))}
              </div>
              <div className={styles.bottomWall3}></div>
            </div>
          </div>
        </div>
      </label>
    </div>   
  )
}
          
export default BigBen