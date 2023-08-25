import React from 'react'
import clsx from 'clsx'
import styles from './navbar.module.sass'
import {
  Link, useLocation  
} from 'react-router-dom'

const linkList = [{
  name: 'ViewA',
  to: '/viewA',
}, {
  name: 'ViewB',
  to: '/viewB',
}, {
  name: '偷吃蛋糕',
  to: '/eatCake',
}, {
  name: '狗狗動畫',
  to: '/dog',
}]

export default function Navbar() {
  const location = useLocation()

  return (
    <div className={styles.navbar}>
      {linkList.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className={clsx(styles.link, location.pathname === `${link.to}` && styles.active)}>
          {link.name}
        </Link>
      ))}
    </div>
  )
}