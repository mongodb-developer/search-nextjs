import React from 'react'
import styles from "./styles.module.css"
import not_found from './../../public/images/not_found.jpeg'
import logo from '../../public/images/logo.png'
import Image from 'next/image'
const Notfound = () => {
  return (
    <div className={styles.container}>
        <Image className={styles.images} 
            src={not_found} 
        alt='not found'/>
        <div className={styles.text}>Home not found</div>
    </div>
  )
}

export default Notfound