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
        if (showing === "Country") {
            setCountry(val);
            setsug_countries([])
        }
        else{
            setTown(val);
            setsug_town([])
        }
    }

    const [show, setshow] = useState(false)
    const [showing, setshowing] = useState('')

    const [sug_countries, setsug_countries] = useState([])
    const [sug_town, setsug_town] = useState([])
    
    const searchClick = (click) => {
        setshow(!show)
        setshowing(click)
    }
    const [town, setTown] = useState('')
    const [country, setCountry] = useState('')
    const router = useRouter();

    const { setLoading } = useLoadingContext()

    const {
        updateCategory,
        activeCategory
    } = useCategoryContext()

    const handleChange = async (e) => {
        if (showing === "Country") {
            setCountry(e.target.value);
            if(e.target.value.length > 1){
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}country/autocomplete/${e.target.value}`)
                .then((response) => response.json())
                .then(async (res) => {
                    setsug_countries(res)
                })
            }
            else{
                setsug_countries([])
            }
        }
        else {
            setTown(e.target.value)
            if(e.target.value.length > 1){
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}town/autocomplete/${e.target.value}`)
                .then((response) => response.json())
                .then(async (res) => {
                    setsug_town(res)
                })
            }
            else{
                setsug_town([])
            }
        }
    }

    const searchNow = async (e) => {
        e.preventDefault();
        setshow(false)

        let search_params = JSON.stringify({
            street: town,
            country: country, 
            category: `${activeCategory}`
        })
        setLoading(true)
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}search/${search_params}`)
            .then((response) => response.json())
            .then(async (res) => {
                // console.log(res,"porto search")
                updateCategory(activeCategory, res)
                if (country !== "") {
                    router.query.country = country
                    setcountryValue(country)
                }
                else{
                    router.query.country = ""
                }

                if (town !== "") {
                    router.query.town = town
                    settownValue(town)
                }
                else{
                    router.query.town = ""
                }
                router.push(router)

            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const [countryValue, setcountryValue] = useState('Country')
    const [townValue, settownValue] = useState('Town')

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
                            <div onClick={() => searchClick('Country')} className={styles.text_filter}>{countryValue}</div>
                            <div className={styles.divider}></div>
                            <span onClick={() => searchClick('Town')} className={styles.text_filter}>{townValue}</span>
                            <div className={styles.divider}></div>
                            {/* <span onClick={()=>searchClick('Price')} className={styles.text_filterv2}>Price range</span> */}
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
                    {/* <div className={styles.mobile_header}>
                        <div className={styles.cirle_red} style={{ backgroundColor: "white", width: "40px", height: "40px" }}>
                            <BiSearch color='grey' size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className={styles.place_name} style={{ fontSize: '13px', fontWeight: 600 }}>Where to?</div>
                            <div className={styles.greyer} style={{ fontSize: '12px' }}>
                                Anywhere &#8729; Any week &#8729; Add guests
                            </div>
                        </div>
                        <div className={styles.cirle_red} style={{ backgroundColor: "white", border: '1px solid rgb(235, 235, 235)', width: "40px", height: "40px" }}>
                            <ImEqualizer color='black' size={16} />
                        </div>
                    </div> */}

                    <div>
                        <div className={styles.center_div}>
                            <div onClick={() => searchClick('Country')} className={styles.text_filter}>{countryValue}</div>
                            <div className={styles.divider}></div>
                            <span onClick={() => searchClick('Town')} className={styles.text_filter}>{townValue}</span>
                            <div className={styles.divider}></div>
                            {/* <span onClick={()=>searchClick('Price')} className={styles.text_filterv2}>Price range</span> */}
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
                                        placeholder={showing === "Country" ? "Search by country" : showing === "Town" ? "Search by town" : showing === "Price" ? "Search by price" : ''}
                                        value={showing === "Country" ? country : town}
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
                                {
                                    sug_town.length > 0 &&
                                    <div className={styles.selector_container}>
                                    {
                                        sug_town.map((res) => (
                                            <div key={res._id} className={styles.selector}
                                                onClick={()=>handleSelected(res?.address?.street)}
                                            >
                                                <GrLocation />
                                                <div>
                                                    {res?.address?.street}
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