import React from 'react'
import clsx from 'clsx'
import styles from './bigBen.module.sass'

import bigBen from '../../../assets/images/bigBen.svg'
    
function BigBen() {
  const topRecAry = [...Array(10).keys()]

  return (
    <div className={styles.bigBenView}>
      <img className={styles.test} src={bigBen} alt="" />
      <label htmlFor="checkbox">
        <input type="checkbox" id="checkbox" />
        <div className={styles.scene}>
          {/* <h1 className={styles.title}>Click Change Sky!</h1> */}
          <div className={styles.sky}></div>
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
              <div className={styles.rectList}>
                {topRecAry.map((cur, index) => (
                  <div key={cur} className={clsx(styles.rect, styles[`rect${index+1}`])}></div>
                ))}
              </div>
              <div className={clsx(styles.cross, styles.cross3)}></div>
            </div>
            {/* <div className={styles.centerWall}>
              <div className={styles.clock}>
                <div className={styles.centerDot}></div>
                <div className={styles.longHand}></div>
                <div className={styles.shorthand}></div>
              </div>
            </div>
            <div className={styles.bottomWall}>
              
            </div> */}
          </div>
        </div>
      </label>
    </div>   
  )
}
          
export default BigBen