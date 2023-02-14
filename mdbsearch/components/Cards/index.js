import React, { useState } from 'react'
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { AiFillStar, AiTwotoneEdit } from 'react-icons/ai'
import { FiHeart } from 'react-icons/fi'
// import moment from "moment"
import Image from 'next/image';
import { BsTrashFill } from 'react-icons/bs';

function Cards({ data }) {

    const [showPagination, setshowPagination] = useState(false)
    return (
        <div className={styles.card}
            onMouseEnter={() => setshowPagination(true)}
            onMouseLeave={() => setshowPagination(false)}>
            <span className={styles.heart}>
                <FiHeart color="white" size={20} />
            </span>
            <div className={styles.main_cont_card} id='main_cont_card'>
                <Swiper
                    spaceBetween={0}
                    navigation={showPagination}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    modules={[
                        Navigation,
                        Pagination]}
                    className={styles.swiper_cont}
                >
                    {
                        // data?.images?.map((img, index) => (
                            <SwiperSlide className={styles.swiper_slide_}>
                                <img className={styles.images} src={data?.images?.picture_url} alt={data._id} />
                            </SwiperSlide>
                        // ))
                    }
                </Swiper>
            </div>
            <div className={styles.space_between} style={{ marginTop: '12px' }}>
                <span className={styles.place_name}>{data?.name}</span>
                {
                    data?.review_scores?.review_scores_rating && 
                        <div className={styles.stars}>
                        <AiFillStar color='black' />
                         <span>{(data?.review_scores?.review_scores_rating / 20).toFixed(1)}</span>
                    </div>
                }
               
            </div>
            <div className={styles.greyer}>
                <span>Hosted by {data?.host?.host_name}</span>
               <span>{data?.address?.country}</span> 
            </div>
            
            <div className={styles.price}>
               <div>${data?.price?.$numberDecimal} <span>night</span></div> 
            </div>
        </div>
    )
}

export default Cards
