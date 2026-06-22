"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { notFound } from 'next/navigation';
import useProductStore from '@/store/productStore';
import TopHeader from '@/components/pages/TopHeader';
import ProductCard from '@/components/shared/ProductCard';
import {
    IoChevronUpOutline,
    IoChevronDownOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoShieldCheckmarkOutline,
    IoLeafOutline,
    IoCarOutline,
    IoRefreshOutline,
    IoWaterOutline,
    IoColorWandOutline,
    IoSnowOutline,
    IoBagHandleOutline,
    IoExpandOutline,
    IoPlayCircleOutline,
    IoCloseOutline,
} from 'react-icons/io5';
import { use, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
    { key: 'description', label: 'Description' },
    { key: 'composition', label: 'Composition & Lining' },
    { key: 'care', label: 'Wash Care Instruction' },
    { key: 'shipping', label: 'Shipping & Returns' },
];

const ProductDetailPage = ({ params }) => {
    const { id } = use(params);
    const { singleProduct: product, loadSingleProduct, isSingleLoading, products, loadProducts } = useProductStore();

    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [thumbStart, setThumbStart] = useState(0);
    const [sizeError, setSizeError] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [thumbsVisible, setThumbsVisible] = useState(6);

    useEffect(() => {
        if (id) {
            loadSingleProduct(id);
        }
        if (products.length === 0) {
            loadProducts();
        }
    }, [id, loadSingleProduct, loadProducts, products.length]);

    useEffect(() => {
        const handleResize = () => {
            setThumbsVisible(window.innerWidth <= 900 ? 4 : 6);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const media = useMemo(() => {
        if (!product || !product.images) return [];
        const items = product.images.map(img => ({ type: 'image', url: img.url || img }));
        const videoUrl = product.video?.url || product.video || product.videoSrc;
        if (videoUrl) {
            items.push({ type: 'video', url: videoUrl });
        }
        return items;
    }, [product]);

    const thumbnailListRef = useRef(null);

    const canScrollUp = thumbStart > 0;
    const canScrollDown = thumbStart + thumbsVisible < media.length;

    const scrollThumbs = (dir) => {
        setThumbStart(prev => {
            if (dir === 'up') return Math.max(0, prev - 1);
            return Math.min(media.length - thumbsVisible, prev + 1);
        });
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setSizeError(false);
    };

    const handleAddToBag = () => {
        if (!selectedSize) {
            setSizeError(true);
            return;
        }
        // Cart logic placeholder
        alert(`Added to bag: ${product.name} | Size: ${selectedSize} | Qty: ${quantity}`);
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            setSizeError(true);
            return;
        }
        alert(`Buy Now: ${product.name} | Size: ${selectedSize} | Qty: ${quantity}`);
    };

    // Related products (exclude current)
    const related = useMemo(() => {
        if (!product) return [];
        return products.filter(p => p._id !== product._id && p.slug !== product.slug && p.id !== id).slice(0, 4);
    }, [products, product, id]);

    // Handle loading and empty states
    if (isSingleLoading) {
        return (
            <div className="pages">
                <TopHeader />
                <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "450px" }}>
                    <div style={{ color: "var(--white)", opacity: 0.6, fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>Loading Product Details...</div>
                </div>
            </div>
        );
    }

    if (!product && !isSingleLoading) {
        return (
            <div className="pages">
                <TopHeader />
                <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "450px", gap: "10px" }}>
                    <h3 style={{ color: "var(--white)" }}>Product Not Found</h3>
                    <p style={{ color: "var(--accent)" }}>The product you are looking for might have been removed or is currently unavailable.</p>
                </div>
            </div>
        );
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    const tabContent = {
        description: (
            <div className="pd-tab-content-inner">
                <p>{product.description}</p>
                {product.fit && (
                    <div className="pd-tab-details-list">
                        <div className="pd-tab-detail-row"><span>Fit</span><span>{product.fit}</span></div>
                        <div className="pd-tab-detail-row"><span>Print</span><span>{product.print}</span></div>
                        <div className="pd-tab-detail-row"><span>Details</span><span>{product.details}</span></div>
                    </div>
                )}
            </div>
        ),
        composition: (
            <div className="pd-tab-content-inner">
                <div className="pd-tab-details-list">
                    <div className="pd-tab-detail-row"><span>Composition</span><span>{product.composition}</span></div>
                    <div className="pd-tab-detail-row"><span>Lining</span><span>{product.lining}</span></div>
                </div>
            </div>
        ),
        care: (
            <div className="pd-tab-content-inner">
                <p>{product.care}</p>
                <ul className="pd-care-list">
                    <li><IoWaterOutline className="care-icon" /><span>Do not machine wash</span></li>
                    <li><IoColorWandOutline className="care-icon" /><span>Iron on reverse side only</span></li>
                    <li><IoSnowOutline className="care-icon" /><span>Store in a cool, dry place</span></li>
                    <li><IoBagHandleOutline className="care-icon" /><span>Keep in the muslin bag provided</span></li>
                </ul>
            </div>
        ),
        shipping: (
            <div className="pd-tab-content-inner">
                <div className="pd-tab-details-list">
                    <div className="pd-tab-detail-row"><span>Dispatch</span><span>Within 2–3 business days</span></div>
                    <div className="pd-tab-detail-row"><span>Delivery</span><span>5–7 business days across India</span></div>
                    <div className="pd-tab-detail-row"><span>Returns</span><span>10-day hassle-free returns</span></div>
                    <div className="pd-tab-detail-row"><span>Exchange</span><span>Size exchange available</span></div>
                </div>
                <p style={{ marginTop: '16px', color: 'var(--accent)', fontSize: '13px' }}>Free shipping on orders above ₹999. For international shipping, please contact us on WhatsApp.</p>
            </div>
        ),
    };

    return (
        <div className="pages">
            <TopHeader
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Shop', href: '/shop' },
                    { label: product.name, href: null },
                ]}
            />
            <div className="shop-page-wrapper">
                <div className="container">

                    <div className="product-details-grid">

                        <div className="product-gallery">
                            <div className="product-thumbnails">
                                <button
                                    className={`thumbnail-buttons pd-thumb-up ${!canScrollUp ? 'disabled' : ''}`}
                                    onClick={() => scrollThumbs('up')}
                                    disabled={!canScrollUp}
                                    aria-label="Scroll thumbnails up"
                                >
                                    <IoChevronUpOutline />
                                </button>

                                <div className="thumbnail-list" ref={thumbnailListRef}>
                                    {media.slice(thumbStart, thumbStart + thumbsVisible).map((item, i) => {
                                        const globalIdx = thumbStart + i;
                                        return (
                                            <button
                                                key={globalIdx}
                                                className={`thumbnail-item ${activeImage === globalIdx ? 'active' : ''}`}
                                                onClick={() => setActiveImage(globalIdx)}
                                                aria-label={`View media ${globalIdx + 1}`}
                                            >
                                                {item.type === 'image' ? (
                                                    <Image
                                                        src={item.url}
                                                        alt={`${product.name} thumbnail ${globalIdx + 1}`}
                                                        fill
                                                        priority={globalIdx < 5}
                                                        sizes="80px"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div className="thumbnail-video-icon">
                                                        <IoPlayCircleOutline />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    className={`thumbnail-buttons pd-thumb-down ${!canScrollDown ? 'disabled' : ''}`}
                                    onClick={() => scrollThumbs('down')}
                                    disabled={!canScrollDown}
                                    aria-label="Scroll thumbnails down"
                                >
                                    <IoChevronDownOutline />
                                </button>
                            </div>

                            <div className="product-image-wrapper">
                                <button
                                    className="product-slider-nav pd-main-prev"
                                    onClick={() => setActiveImage(prev => (prev - 1 + media.length) % media.length)}
                                    aria-label="Previous media"
                                >
                                    <IoChevronBackOutline />
                                </button>
                                <div className="product-display-image">
                                    {media.map((item, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                opacity: activeImage === idx ? 1 : 0,
                                                pointerEvents: activeImage === idx ? 'auto' : 'none',
                                                transition: 'opacity 0.2s ease-in-out',
                                                zIndex: activeImage === idx ? 1 : 0
                                            }}
                                        >
                                            {item.type === 'image' ? (
                                                <Image
                                                    src={item.url}
                                                    alt={`${product.name} view ${idx + 1}`}
                                                    fill
                                                    priority={idx === 0}
                                                    sizes="(max-width: 768px) 100vw, 55vw"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <video
                                                    src={item.url}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <button className="zoom-btn" onClick={() => setIsLightboxOpen(true)} aria-label="Open Lightbox" style={{ zIndex: 5 }}>
                                        <IoExpandOutline />
                                    </button>
                                </div>
                                <button
                                    className="product-slider-nav pd-main-next"
                                    onClick={() => setActiveImage(prev => (prev + 1) % media.length)}
                                    aria-label="Next media"
                                >
                                    <IoChevronForwardOutline />
                                </button>

                                <div className="image-counter">
                                    {activeImage + 1} / {media.length}
                                </div>
                            </div>
                        </div>

                        <div className="product-info">
                            <div className="brand-tag">Abeer.label</div>
                            <h1 className="product-title">{product.name}</h1>
                            <div className="collection-tag">{product.collection}</div>

                            <div className="product-pricing">
                                <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                                {product.originalPrice && (
                                    <span className="product-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                                )}
                                {discount && (
                                    <span className="discount-tag">Save {discount}%</span>
                                )}
                            </div>

                            <div className="pd-divider" />

                            <div className="product-section">
                                <div className="product-section-label">
                                    Select Size:
                                </div>
                                <div className="product-sizes">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                            onClick={() => handleSizeSelect(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {sizeError && (
                                    <p className="pd-size-error">Please select a size to continue.</p>
                                )}
                            </div>

                            <div className="product-section">
                                <div className="product-section-label">Quantity:</div>
                                <div className="pd-qty-row">
                                    <div className="pd-qty-control">
                                        <button
                                            className="pd-qty-btn"
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            aria-label="Decrease quantity"
                                        >−</button>
                                        <span className="pd-qty-val">{quantity}</span>
                                        <button
                                            className="pd-qty-btn"
                                            onClick={() => setQuantity(q => q + 1)}
                                            aria-label="Increase quantity"
                                        >+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="pd-cta-row">
                                <button className="button-primary" onClick={handleAddToBag}>
                                    Add to Bag
                                </button>
                                <button className="button-secondary" onClick={handleBuyNow}>
                                    Buy Now
                                </button>
                            </div>

                            <div className="pd-divider" />

                            <div className="pd-trust-badges">
                                <div className="pd-trust-item">
                                    <IoLeafOutline />
                                    <span>Sustainable Materials</span>
                                </div>
                                <div className="pd-trust-item">
                                    <IoRefreshOutline />
                                    <span>10-Day Returns</span>
                                </div>
                                <div className="pd-trust-item">
                                    <IoCarOutline />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="pd-trust-item">
                                    <IoShieldCheckmarkOutline />
                                    <span>Secure Checkout</span>
                                </div>
                            </div>

                            <div className="pd-delivery-info">
                                <div className="pd-delivery-row">
                                    <IoCarOutline />
                                    <div>
                                        <span className="pd-delivery-label">Estimated Delivery:</span>
                                        <span className="pd-delivery-val"> 5–7 Business Days</span>
                                    </div>
                                </div>
                                <div className="pd-delivery-row">
                                    <IoRefreshOutline />
                                    <div>
                                        <span className="pd-delivery-label">Free Shipping & Returns:</span>
                                        <span className="pd-delivery-val"> On all orders above ₹999</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pd-tabs-section">
                        <div className="pd-tabs-nav">
                            {TABS.map(tab => (
                                <button
                                    key={tab.key}
                                    className={`pd-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.key)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="pd-tab-content">
                            <div className="pd-tab-content-centered">
                                {tabContent[activeTab]}
                            </div>
                        </div>
                    </div>

                    {related.length > 0 && (
                        <div className="pd-related-section">
                            <div className="section-title">
                                <span className="sub-heading">More from</span>
                                <span className="heading">The Collection</span>
                            </div>
                            <div className="pd-related-grid">
                                {related.map((p, idx) => (
                                    <ProductCard key={p._id || p.id || idx} product={p} index={idx} />
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>
                            <IoCloseOutline />
                        </button>
                        <button
                            className="lightbox-nav lightbox-prev"
                            onClick={() => setActiveImage(prev => (prev - 1 + media.length) % media.length)}
                        >
                            <IoChevronBackOutline />
                        </button>

                        <div className="lightbox-content-wrapper">
                            {media.map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        opacity: activeImage === idx ? 1 : 0,
                                        pointerEvents: activeImage === idx ? 'auto' : 'none',
                                        transition: 'opacity 0.2s ease-in-out',
                                        zIndex: activeImage === idx ? 1 : 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {item.type === 'image' ? (
                                        <Image
                                            src={item.url}
                                            alt={`${product.name} zoom ${idx + 1}`}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <video
                                            src={item.url}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            style={{ width: '100%', height: '100%', maxHeight: '90vh' }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            className="lightbox-nav lightbox-next"
                            onClick={() => setActiveImage(prev => (prev + 1) % media.length)}
                        >
                            <IoChevronForwardOutline />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetailPage;
