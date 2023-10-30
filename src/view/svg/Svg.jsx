import React from 'react'
import StrokeText from './strokeText'
import StrokeBorder from './strokeBorder'
import styles from './svg.module.sass'

const Svg = () => {
  return (
    <div className={styles.svg}>
      <StrokeText />
      <StrokeBorder />
    </div>
  )
}

export default Svg