import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import logo from '../../public/images/logo.png'
import { BiSearch, BiMenu } from 'react-icons/bi'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { FaUserCircle } from 'react-icons/fa'
import Image from 'next/image'
import { useCategoryContext } from '../../contexts/CategoryContext'
import { useLoadingContext } from '../../contexts/LoadingContext'
import { useRouter } from 'next/router'
import { GrLocation } from 'react-icons/gr'

const Header = () => {

    const ref = useRef(null);
    const handleClickAway = () => setshow(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClickAway && handleClickAway();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [handleClickAway]);

    const handleSelected = (val) =>{
        setCountry(val);
        setsug_countries([])
    }

    const [show, setshow] = useState(false)

    const [sug_countries, setsug_countries] = useState([])
    
    const searchClick = () => {
        setshow(!show)
    }
    const [country, setCountry] = useState('')
    const router = useRouter();

    const { setLoading } = useLoadingContext()

    const {
        updateCategory,
        activeCategory
    } = useCategoryContext()


    
    const handleChange = async (e) => {
       //Autocomplete function goes here
    }
 

    const searchNow = async (e) => {
       //Search function goes here
    }


    const [countryValue, setcountryValue] = useState('Country')

    return (
        <div className={styles.header}
            style={{
                height: show && "100vh",
                backgroundColor: "rgba(49, 49, 49, 0.4)"
            }}>
            <div ref={ref}>
                <div
                    className={`${styles.header_container} ${styles.space_between}`}
                    style={{ borderBottom: show ? "none" : "1px solid var(--gray)" }}
                >
                    <Image src={logo} alt="airbnb logo" className={styles.logo_image} />
                    <div>
                        <div className={styles.center_div}>
                            <div onClick={searchClick} className={styles.text_filter}>{countryValue}</div>
                            <div className={styles.divider}></div>
                            <div className={styles.cirle_red} style={{ backgroundColor: "var(--main)" }}>
                                <BiSearch color='white' />
                            </div>
                        </div>
                    </div>

                    <div className={styles.right_user}>
                        <div className={styles.text_filter}>
                            Become a Host
                        </div>
                        <HiOutlineGlobeAlt size={20} />
                        <div className={styles._user}>
                            <BiMenu size={20} color="#222222" />
                            <FaUserCircle color='#717171' size={30} />
                        </div>
                    </div>
                </div>
                
                <div className={styles.mobile_head}>
                    <div>
                        <div className={styles.center_div}>
                            <div onClick={ searchClick} className={styles.text_filter}>{countryValue}</div>
                            <div className={styles.divider}></div>
                          <div className={styles.cirle_red} style={{ backgroundColor: "var(--main)" }}>
                                <BiSearch color='white' />
                            </div>
                        </div>
                    </div>

                </div>

                {
                    show &&
                    <>
                        <div className={styles.searcger}>
                            <div className={styles.containing}>
                                <form className={styles.input_cont}>
                                    <input className={styles.input_}
                                        type="text"
                                        placeholder={"Search by country"}
                                        value={country}
                                        onChange={handleChange}
                                    />
                                    <button onClick={searchNow}>Search</button>
                                </form>
                                {
                                    sug_countries.length > 0 &&
                                    <div className={styles.selector_container}>
                                    {
                                        sug_countries.map((res) => (
                                            <div key={res._id} className={styles.selector}
                                                onClick={()=>handleSelected(res?.address?.country)}
                                            >
                                                <GrLocation />
                                                <div>
                                                    {res?.address?.country}
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                                }
                            </div>

                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header