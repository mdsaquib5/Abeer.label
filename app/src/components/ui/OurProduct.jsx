'use client';
import Titles from "../layout/Titles";
import ProductCard from "../shared/ProductCard";
import { products } from "../../constants/product";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const OurProduct = () => {
    return (
        <section>
            <div className="container">
                <Titles subTitle="Designed to Stay" title="Our Products" />
                <div className="product-slider">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 15 },
                            1024: { slidesPerView: 3, spaceBetween: 20 },
                            1440: { slidesPerView: 4, spaceBetween: 20 },
                        }}
                        style={{ paddingBottom: '40px' }}>
                        {products.map((product, index) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section >
    )
}

export default OurProduct;