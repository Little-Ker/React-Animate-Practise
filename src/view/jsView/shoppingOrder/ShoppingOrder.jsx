import React, {
  useState, useCallback
} from 'react'
import clsx from 'clsx'
import Order from './sub/order'
import FormInput from './sub/formInput'
import data from './data/optionsData'
import styles from './shoppingOrder.module.sass'
      
const ShoppingOrder = () => {
  const [nowStep, setNowStep] = useState(0)

  // 商品資訊
  const [selectId, setSelectId] = useState(0)
  const [number, setNumber] = useState(1)
  const [size, setSize] = useState('S')

  // 基本資料
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [billType, setBillType] = useState(0)

  const onClickFn = useCallback((num) => {
    setNowStep((prev) => {
      if (prev + num < 0) return 0
      if (prev + num > 2) return 2
      return prev + num
    })
  }, [])
  
  return (
    <div className={styles.shoppingOrder}>
      <div className={styles.order}>
        <div className={styles.stepList}>
          {data?.stepOptions?.map((cur, index) => (
            <div className={clsx(styles.step, nowStep >= index && styles.stepOver)} key={cur}>
              <p className={styles.index}>{index + 1}</p>
              <p>{cur}</p>
            </div>
          ))}
        </div>
        <div className={styles.body}>
          {(nowStep === 0) && (
            <Order
              selectId={selectId}
              setSelectId={setSelectId}
              number={number}
              setNumber={setNumber}
              size={size}
              setSize={setSize}
            />
          )}
          {(nowStep === 1) && (
            <FormInput
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              address={address}
              setAddress={setAddress}
              billType={billType}
              setBillType={setBillType}
              selectId={selectId}
              number={number}
              size={size}
            />
          )}
          {(nowStep === 2) && (
            <div className={styles.buyOver}>
              <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
              </svg>
              <p>{'訂單已送出'}</p>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => onClickFn(-1)}
            className={clsx(styles.btn, nowStep === 0 && styles.disableBtn)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            <p className={styles.btnText}>{'上一步'}</p>
          </button>
          <button
            onClick={() => onClickFn(1)}
            className={clsx(styles.btn, styles.nextBtn, nowStep === 2 && styles.disableBtn)}
          >
            <p className={styles.btnText}>{(nowStep === 0) ? '下一步' : '送出資料'}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
      
export default ShoppingOrder