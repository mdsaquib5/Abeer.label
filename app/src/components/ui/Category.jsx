"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Titles from "../layout/Titles";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from 'react';

const categories = [
    {
        id: 1,
        title: "Farshi Salwar",
        image: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1780987696/9_iqzr0i.jpg",
        products: 12
    },
    {
        id: 2,
        title: "Kurti Collection",
        image: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1780986684/6_tehv8l.jpg",
        products: 8
    },
    {
        id: 3,
        title: "Ethnic Dress",
        image: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1780988734/1_sczouh.jpg",
        products: 15
    },
    {
        id: 4,
        title: "Kurti Set",
        image: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1780988282/main-image_g4f7ki.jpg",
        products: 24
    },
    {
        id: 5,
        title: "New Collection",
        image: "https://res.cloudinary.com/dhufjjp9t/image/upload/v1780991430/nargis-profile_mbalmc.jpg",
        products: 1
    }
];

const Category = () => {
    const swiperRef = useRef(null);

    return (
        <section className="category-section section-padding">
            <div className="container" style={{ position: 'relative' }}>
                <Titles subTitle="Explore the Silhouettes" title="Shop By Category" />
                
                <button className="category-nav left" onClick={() => swiperRef.current?.slidePrev()}>
                    <FiChevronLeft size={24} />
                </button>
                <button className="category-nav right" onClick={() => swiperRef.current?.slideNext()}>
                    <FiChevronRight size={24} />
                </button>

                <div className="category-slider-wrapper" style={{ marginTop: '50px' }}>
                    <Swiper
                        onSwiper={(swiper) => swiperRef.current = swiper}
                        spaceBetween={20}
                        slidesPerView={1.5}
                        breakpoints={{
                            480: { slidesPerView: 2, spaceBetween: 20, allowTouchMove: true },
                            768: { slidesPerView: 3, spaceBetween: 30, allowTouchMove: true },
                            992: { slidesPerView: 4, spaceBetween: 40, allowTouchMove: true },
                            1440: { slidesPerView: 5, spaceBetween: 50, allowTouchMove: false }
                        }}
                        className="category-swiper"
                    >
                        {categories.map((cat) => (
                            <SwiperSlide key={cat.id}>
                                <Link href="/" className="category-card">
                                    <div className="category-img">
                                        <Image
                                            src={cat.image}
                                            alt={cat.title}
                                            fill
                                            sizes="(max-width: 768px) 150px, 260px"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <h3 className="category-title">{cat.title}</h3>
                                    <p className="category-products">{cat.products} Products</p>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Category;