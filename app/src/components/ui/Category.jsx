"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Titles from "../layout/Titles";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useCategoryStore from "@/store/categoryStore";
import useProductStore from "@/store/productStore";
import { CategorySkeleton } from "@/components/shared/Skeletons";

const GLOBAL_DEFAULT_IMAGE = "https://res.cloudinary.com/dhufjjp9t/image/upload/v1780988282/main-image_g4f7ki.jpg";

const Category = () => {
    const swiperRef = useRef(null);
    const { categories, loadCategories, isLoading: isCategoriesLoading } = useCategoryStore();
    const { products, loadProducts, isLoading: isProductsLoading } = useProductStore();

    useEffect(() => {
        loadCategories("product");
        loadProducts({ limit: 1000 }); // Load storefront products to get counts and images
    }, [loadCategories, loadProducts]);

    // Format display categories from live DB data
    const displayCategories = React.useMemo(() => {
        if (isCategoriesLoading || isProductsLoading) return [];

        return categories.map((cat) => {
            const catProducts = products.filter(p => p.category === cat.name);
            
            // Resolve image: first product image -> default placeholder
            let resolvedImage = GLOBAL_DEFAULT_IMAGE;
            if (catProducts.length > 0 && catProducts[0].images?.[0]?.url) {
                resolvedImage = catProducts[0].images[0].url;
            }

            return {
                id: cat._id || cat.id,
                name: cat.name,
                image: resolvedImage,
                productsCount: catProducts.length
            };
        });
    }, [categories, products, isCategoriesLoading, isProductsLoading]);

    const isLoading = isCategoriesLoading || isProductsLoading;

    return (
        <section className="category-section section-padding">
            <div className="container category-container">
                <Titles subTitle="Explore the Silhouettes" title="Shop By Category" />
                
                {!isLoading && displayCategories.length > 0 && (
                    <>
                        <button className="category-nav left" onClick={() => swiperRef.current?.slidePrev()}>
                            <FiChevronLeft size={24} />
                        </button>
                        <button className="category-nav right" onClick={() => swiperRef.current?.slideNext()}>
                            <FiChevronRight size={24} />
                        </button>
                    </>
                )}

                <div className="category-slider-wrapper">
                    {isLoading ? (
                        <div className="category-skeleton-grid">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <CategorySkeleton key={num} />
                            ))}
                        </div>
                    ) : displayCategories.length > 0 ? (
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
                            {displayCategories.map((cat) => (
                                <SwiperSlide key={cat.id}>
                                    <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="category-card">
                                        <div className="category-img">
                                            <Image
                                                src={cat.image}
                                                alt={cat.name}
                                                fill
                                                sizes="(max-width: 768px) 150px, 260px"
                                                className="pd-media-cover"
                                                priority={true}
                                            />
                                        </div>
                                        <h3 className="category-title">{cat.name}</h3>
                                        <p className="category-products">{cat.productsCount} Product{cat.productsCount !== 1 ? 's' : ''}</p>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="no-categories-message">
                            <p>No categories found.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Category;