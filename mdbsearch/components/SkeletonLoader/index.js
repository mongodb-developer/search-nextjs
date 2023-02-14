import React from 'react'
import styles from "./styles.module.css"
import style from '../../styles/Home.module.css'
import { useCategoryContext } from '../../contexts/CategoryContext'

export default function SkeletonLoader() {

    const { categoryList } = useCategoryContext()

    const Skeleton = ()=>(
        <div className={styles.card}>
        <div className={styles.header}>
        <div className={styles.img}></div>
            <div className={styles.details}>
                <span className={styles.name}></span>
                <span className={styles.about}></span>
                <span className={styles.about1}></span>
            </div>
        </div>
    </div>
    )

  return (
    <div className={style.card_container} style={{marginTop : categoryList?.length < 0 ? "100px" : '0'}}>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
   </div>
  )
}