import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Badges from '../components/Badges'
import Cards from '../components/Cards'
import styles from '../styles/Home.module.css'
import { useCategoryContext } from '../contexts/CategoryContext'
import { useLoadingContext } from '../contexts/LoadingContext'
import SkeletonLoader from '../components/SkeletonLoader'
import Notfound from '../components/Notfound'
import Footer from '../components/Footer'

const Home = () => {

    const { categories, dataToDisplay, updateCategory, categoryList, setcategoryList } = useCategoryContext()
    const { loading } = useLoadingContext()

    return (
        <section className={styles.home}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.main} style={{ paddingTop: "100px" }}>
                <div className={styles.sticky_header}>
                    <Badges />
                </div>
                {
                    loading ?
                        <SkeletonLoader />
                        :
                        dataToDisplay.length > 0 ?
                        <div className={styles.card_container}>
                            {
                                dataToDisplay?.map((home, index) => (
                                    <div className={styles.col} key={index}>
                                        <Cards data={home} />
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <Notfound/>
                }
            </div>

            <div className={styles.footer}>
                <Footer />
            </div>

        </section>
    )
}
export default Home
