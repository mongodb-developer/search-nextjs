import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { images } from '../../public/data'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import styles from './Badges.module.css'
import Image from 'next/image'
import { useCategoryContext } from '../../contexts/CategoryContext';
import { useLoadingContext } from '../../contexts/LoadingContext';
import { useRouter } from 'next/router';

export default function Badges() {

  useEffect(() => {
    getData()
  }, [])


  const {
    categories,
    updateCategory,
    categoryList,
    setcategoryList, 
    setactiveCategory,
    activeCategory
   } = useCategoryContext()

   const { setLoading} = useLoadingContext()

  const getData = async () => {
    setLoading(true)

    if (categoryList.length === 0) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}category`)
        .then((response) => response.json())
        .then(async (data) => {
          setcategoryList(data.map((datum, i) => {
            return (
              {
                "text": datum,
                "image": images[i]
              }
            )
          })
          )
          setactiveCategory(data[0])

        //   let search_params = JSON.stringify({
        //     street: "barcelona",
        //     country: "spain", 
        //     category: data[0]
        // })
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}category_list/${data[0]}`)
            .then((response) => response.json())
            .then(async (res) => {
              updateCategory(data[0], res)
            })
            .catch((err)=>console.log(err))
        }
        )
        .catch((err)=>console.log(err))
        .finally(()=> setLoading(false))
    }
    else {
      console.log("helo deate")
    }

  }
  const breakpoint = {
    // when window width is >= 320px
    320: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20
    },
    520: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 20
    },
    750: {
      slidesPerView: 7,
      slidesPerGroup: 7,
      spaceBetween: 20
    },
    950: {
      slidesPerView: 10,
      slidesPerGroup: 10,
      spaceBetween: 40
    },
    1100: {
      slidesPerView: 12,
      slidesPerGroup: 12,
      spaceBetween: 25
    },
    1300: {
      slidesPerView: 15,
      slidesPerGroup: 15,
      spaceBetween: 25
    },
    1500: {
      slidesPerView: 18,
      slidesPerGroup: 18,
      spaceBetween: 25
    }
  }

  const getCategoryData = async (category) => {
    setLoading(true)
    if (categories[category]) {
      updateCategory(category, categories[category])
      setLoading(false)
    }
    else {
      let search_params = JSON.stringify({
        street: "barcelona",
        country: "spain", 
        category: category
    })

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}category_list/${category}`)
        .then((response) => response.json())
        .then(async (res) => {
          updateCategory(category, res)
        })
        .catch((err)=>console.log(err))
        .finally(()=> setLoading(false))
    }
  }

  // const [active, setactive] = useState('')
  const router = useRouter();

  const handleClick = (badge) => {
    setactiveCategory(badge.text)
    getCategoryData(badge.text)
    router.query.category = badge.text
    router.push(router)
  }

  return (
    <div id='badge_cont' className={styles.badge_cont}>
      <Swiper
        breakpoints={breakpoint}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
      // pagination={{
      //   clickable: true,
      // }}
      // modules={[Pagination]}
      >
        {
          categoryList.map((badge, i) => (
            <SwiperSlide key={i}>
              <div key={i}
                className={styles.badges}
                id='badges'
                onClick={() => handleClick(badge)}
                style={{ color: badge.text === activeCategory ? "#000000" : "#717171" }}
              >
                <Image id='image' src={badge.image} alt={badge?.text}
                  style={{ opacity: badge.text === activeCategory ? "1" : "0.6" }}
                />
                <span id='tab_flex' className={badge.text === activeCategory ? styles.tab_flex_active : styles.tab_flex}>
                  {badge.text}
                </span>
              </div>
            </SwiperSlide>))
        }
      </Swiper>
    </div>
  )
}
