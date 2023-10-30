import React, {
  useCallback
} from 'react'
import clsx from 'clsx'
import styles from './strokeBorder.module.sass'

const StrokeBorder = () => {
  const borderList = ['leftTop', 'rightTop', 'leftBottom', 'rightBottom']

  const border = useCallback((style) => {
    return (
      <svg width="300px" height="300px" className={clsx(styles[style], styles.border)}>
        <polygon fill="#4fd2dd" points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63">
          <animate
            attributeName="fill"
            values="#fff;#235fa7;#fff"
            dur=".5s"
            begin="0s"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon fill="#235fa7" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8">
          <animate
            attributeName="fill"
            values="#fff;#4fd2dd;#fff"
            dur="0.5s"
            begin="0s"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon fill="#4fd2dd" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54">
          <animate
            attributeName="fill"
            values="#fff;#235fa7;transparent"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </polygon>
      </svg>)
  }, [])

  return (
    <div className={styles.strokeBorder}>
      {borderList.map(cur => border(cur))}
    </div>
  )
}

export default StrokeBorder