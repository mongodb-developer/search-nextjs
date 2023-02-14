import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Badges from '../components/Badges'
import Cards from '../components/Cards'
import { homes } from '../public/homes'
import CustomMap from '../components/Map/GoogleMapWidget'
import { IoMap } from 'react-icons/io5'
import { FaListUl } from 'react-icons/fa'
import styles from '../styles/Home.module.css'
import { useCategoryContext } from '../contexts/CategoryContext'
import { useLoadingContext } from '../contexts/LoadingContext'
import SkeletonLoader from '../components/SkeletonLoader'
import Notfound from '../components/Notfound'
import Footer from '../components/Footer'

const Home = () => {

    const { categories, dataToDisplay, updateCategory, categoryList, setcategoryList } = useCategoryContext()
    const { loading } = useLoadingContext()

    const [showMap, setshowMap] = useState(false)

    return (
        <section className={styles.home}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.main} style={{ paddingTop: showMap ? "0" : "100px" }}>
                <div className={styles.sticky_header}>
                    <Badges />
                </div>
                {
                    loading ?
                        <SkeletonLoader />
                        :
                        showMap ?
                            <CustomMap data={dataToDisplay} />
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

            {
                !showMap &&
                <div className={styles.footer}>
                    <Footer />
                </div>
            }

            <div className={styles.map_btn}
                onClick={() => setshowMap(!showMap)}
            >
                {
                    showMap ?
                        <>
                            <span style={{ fontSize: '13px', fontWeight: '500' }}>Show list</span>
                            <FaListUl color='white' />
                        </>
                        :
                        <>
                            <span style={{ fontSize: '13px', fontWeight: '500' }}>Show map</span>
                            <IoMap color='white' />

                        </>
                }
            </div>

            <div className={styles.map_btn_mobile}
                onClick={() => setshowMap(!showMap)}
            >
                {
                    showMap ?
                        <>
                            <span style={{ fontSize: '13px', fontWeight: '500' }}>List</span>
                            <FaListUl color='white' />
                        </>
                        :
                        <>
                            <span style={{ fontSize: '13px', fontWeight: '500' }}>Map</span>
                            <IoMap color='white' />

                        </>
                }
            </div>

        </section>
    )
}
export default Home
