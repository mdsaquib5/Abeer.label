'use client';
import { useEffect } from "react";
import Titles from "../layout/Titles";
import ProductCard from "../shared/ProductCard";
import useProductStore from "@/store/productStore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductSkeleton = () => (
    <div className="product-card skeleton" style={{ animation: "pulse 1.5s infinite ease-in-out" }}>
        <div className="product-image" style={{ background: "#1a1a1a", height: "320px", display: "block" }} />
        <div className="product-details-area" style={{ padding: "16px" }}>
            <div style={{ background: "#1a1a1a", height: "10px", width: "40%", marginBottom: "8px" }} />
            <div style={{ background: "#1a1a1a", height: "16px", width: "70%", marginBottom: "8px" }} />
            <div style={{ background: "#1a1a1a", height: "12px", width: "100%", marginBottom: "12px" }} />
            <div style={{ background: "#1a1a1a", height: "16px", width: "30%" }} />
        </div>
    </div>
);

const OurProduct = () => {
    const { products, loadProducts, isLoading } = useProductStore();

    useEffect(() => {
        loadProducts({ limit: 8 }); // Fetch top 8 published products for home page slider
    }, [loadProducts]);

    return (
        <section>
            <div className="container">
                <Titles subTitle="Designed to Stay" title="Our Products" />
                <div className="product-slider">
                    {isLoading ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                            {[1, 2, 3, 4].map((num) => (
                                <ProductSkeleton key={num} />
                            ))}
                        </div>
                    ) : (
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
                                <SwiperSlide key={product._id || product.id}>
                                    <ProductCard product={product} index={index} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 0.3; }
                    100% { opacity: 0.6; }
                }
            ` }} />
        </section >
    )
}

export default OurProduct;