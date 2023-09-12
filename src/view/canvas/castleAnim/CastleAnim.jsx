import React from 'react'
import CanvasPractice from './sub/canvasPractice'
import CanvasCastle from './sub/canvasCastle'
import styles from './castleAnim.module.sass'
        
const CastleAnim = () => {

  return (
    <div className={styles.castleAnim}>
      <CanvasCastle />
      <p className={styles.title}>基礎圖形</p>
      <CanvasPractice />
    </div>
  )
}
        
export default CastleAnim