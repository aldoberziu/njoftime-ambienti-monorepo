'use client'
import { useEffect, useState } from 'react'
import styles from './Loader.module.scss';

const Loader = ({ className, show = true, children }) => {
  const [classNames, setClassNames] = useState([`${styles.loader}`, className].filter(Boolean))

  if (className) classNames.push(className)

  // On visibility change
  useEffect(() => {
    if (show) {
      setClassNames([...classNames, `${styles.show}`])
    } else {
      setClassNames(classNames.filter(item => item !== `${styles.show}`))
    }
  }, [show])

  return (
    <div className={classNames.join(' ')} >
      {children}
    </div>
  )
}

export default Loader

