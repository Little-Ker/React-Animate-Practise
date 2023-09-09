import React, {
  useMemo
} from 'react'
import PropTypes from 'prop-types'
import shoe0 from '../../../../../assets/images/shoe0.jpg'
import shoe1 from '../../../../../assets/images/shoe1.jpg'
import shoe2 from '../../../../../assets/images/shoe2.jpg'
import data from '../../data/optionsData'
import styles from './formInput.module.sass'
    
const FormInput = (props) => {
  const { name, setName, phone, setPhone, address, setAddress, billType,
    setBillType, selectId, number, size } = props

  const getShoeImg = useMemo(() => {
    if (Number(selectId) === 0) return shoe0
    if (Number(selectId) === 1) return shoe1
    return shoe2
  }, [selectId])

  const getShoeName = useMemo(() => {
    const findData = data?.shoeOptions?.find((cur) => {
      return Number(cur.id) === Number(selectId)
    })
    return (findData) ? findData.label : '-'
  }, [selectId])

  return (
    <div className={styles.formInput}>
      <form>
        <div className={styles.product}>
          <img src={getShoeImg} alt="" />
          <div className={styles.detail}>
            <p>{getShoeName}</p>
            <div className={styles.flex}>
              <p className={styles.size}>{size}</p>
              <p>{`${number}件`}</p>
            </div>
          </div>
        </div>
        <div className={styles.choose}>
          <label htmlFor='name' className={styles.title}>{'姓名'}</label>
          <input
            value={name}
            name="name"
            placeholder='請輸入名字'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={styles.choose}>
          <label htmlFor='phone' className={styles.title}>{'電話'}</label>
          <input
            value={phone}
            name="phone"
            placeholder='請輸入電話'
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.choose}>
          <label htmlFor='address' className={styles.title}>{'地址'}</label>
          <input
            value={address}
            name="address"
            placeholder='請輸入地址'
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.choose}>
          <p className={styles.title}>{'發票'}</p>
          {data?.billOptions?.map(cur => (
            <div key={cur.id} className={styles.radioBtn}>
              <input
                type="radio"
                name={'billType'}
                id={cur.id}
                checked={billType === cur.id}
                onChange={() => setBillType(cur.id)}
              />
              <label htmlFor={cur.id}>{cur.label}</label> 
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

FormInput.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
  phone: PropTypes.string,
  setPhone: PropTypes.func,
  address: PropTypes.string,
  setAddress: PropTypes.func,
  billType: PropTypes.number,
  setBillType: PropTypes.func,
  selectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  number: PropTypes.number,
  size: PropTypes.string,
}
    
FormInput.defaultProps = {
  name: '',
  setName: () => {},
  phone: '',
  setPhone: () => {},
  address: '',
  setAddress: () => {},
  billType: null,
  setBillType: () => {},
  selectId: null,
  number: null,
  size: null,
}
    
export default FormInput