import React from 'react'
import styles from './styles.module.css'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import {BsCurrencyDollar} from 'react-icons/bs'

const Footer = () => {
  return (
    <div className={`${styles.footer_container} ${styles.space_between}`}>
        <div className={`${styles.footer_left} ${styles.space_between} `}>
            <span className={styles.each_left}>
                &#169; 2022 Accomodate, Inc.
            </span>
            <span className={styles.each_left}>
            &#8729;
            </span>
            <span className={styles.each_left}>
                Privacy
            </span>
            <span className={styles.each_left}>
            &#8729;
            </span>
            <span className={styles.each_left}>
                Terms
            </span>
            <span className={styles.each_left}>
            &#8729;
            </span>
            <span className={styles.each_left}>
                Sitemap
            </span>
            <span className={styles.each_left}>
                &#8729;
            </span>
            <span className={styles.each_left}>
                Destinations
            </span>
            
        </div>
        <div className={`${styles.space_between}  ${styles.footer_right}`}>
            <div className={styles.each_right}>
                <HiOutlineGlobeAlt size={20}/>
                <span>English (US)</span>
            </div>
            <div className={styles.each_right}>
                <BsCurrencyDollar size={20}/>
                <span>USD</span>
            </div>
            <div className={styles.each_right}>
                <span>Support & resources</span>
            </div>
        </div>
    </div>
  )
}

export default Footer