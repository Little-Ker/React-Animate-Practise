import React, {
  useState, useCallback, useMemo
} from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import shoe0 from '../../../../../assets/images/shoe0.jpg'
import shoe1 from '../../../../../assets/images/shoe1.jpg'
import shoe2 from '../../../../../assets/images/shoe2.jpg'
import data from '../../data/optionsData'
import styles from './order.module.sass'
    
const Order = (props) => {
  const { selectId, setSelectId, number, setNumber, size, setSize } = props

  const [numberTip, setNumberTip] = useState('')

  const onChangeNumber = useCallback((num, addNum) => {
    const newNum = Number(num) + addNum
    setNumber((prev) => {
      if (newNum >= 100) {
        setNumberTip('最大數量為 99')
        return 99
      }
      if (newNum <= 0) {
        setNumberTip('最小數量為 1')
        return 1
      }
      setNumberTip('')
      return newNum
    })
  }, [])

  const getShoeImg = useMemo(() => {
    if (Number(selectId) === 0) return shoe0
    if (Number(selectId) === 1) return shoe1
    return shoe2
  }, [selectId])

  return (
    <form className={styles.order}>
      <img src={getShoeImg} alt="" />
      <div className={styles.choose}>
        <p className={styles.title}>{'種類 :'}</p>
        <div className={styles.select}>
          <select value={selectId} onChange={e => setSelectId(e.target.value)}>
            {data?.shoeOptions?.map(cur => (
              <option key={cur.id} value={cur.id}>{cur.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.choose}>
        <p className={styles.title}>{'數量 :'}</p>
        <button
          className={clsx(styles.numBtn, (number <= 1) && styles.disabledBtn)}
          disabled={number <= 1}
          onClick={() => onChangeNumber(number, -1)}
        >
          -
        </button>
        <input
          type="number"
          value={number}
          onChange={e => onChangeNumber(e.target.value, 0)}
          className={styles.numInput}
          min={1}
          max={99}
        />
        <button
          className={clsx(styles.numBtn, (number>=99) && styles.disabledBtn)}
          disabled={number>=99}
          onClick={() => onChangeNumber(number, 1)}
        >
          +
        </button>
      </div>
      <p className={styles.numberTip}>{numberTip}</p>
      <div className={styles.choose}>
        <p className={styles.title}>{'大小 :'}</p>
        {data?.sizeOptions?.map(cur => (
          <div key={cur.id} className={styles.radioBtn}>
            <input
              type="radio"
              name="size"
              id={cur.id}
              checked={size === cur.id}
              onChange={() => setSize(cur.id)}
            />
            <label htmlFor={cur.id}>{cur.label}</label> 
          </div>
        ))}
      </div>
    </form>
  )
}

Order.propTypes = {
  selectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectId: PropTypes.func,
  number: PropTypes.number,
  setNumber: PropTypes.func,
  size: PropTypes.string,
  setSize: PropTypes.func,
}
    
Order.defaultProps = {
  selectId: null,
  setSelectId: () => {},
  number: null,
  setNumber: () => {},
  size: null,
  setSize: () => {},
}

export default Order