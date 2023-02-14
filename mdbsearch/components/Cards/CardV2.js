import React, { useState } from 'react'
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillStar } from 'react-icons/ai'
import { FiHeart } from 'react-icons/fi'
import styles from "./styles.module.css";

function CardV2({ data }) {
    return (
        <div className={styles.card} >
            <span className={styles.heart}>
                <FiHeart color="white" size={20} />
            </span>
            <div className={styles.main_cont_card}>
                <Swiper
                    spaceBetween={0}
                    className={styles.mySwiper}
                >
                    <SwiperSlide className={styles.swiper_slide_}>
                        <img className={styles.images} src={data?.images?.picture_url} alt={data._id} />
                    </SwiperSlide>
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
            <div className={styles.price}>
               <div> ${data?.price?.$numberDecimal} <span>night</span></div>
            </div>
        </div>
    )
}
export default CardV2
