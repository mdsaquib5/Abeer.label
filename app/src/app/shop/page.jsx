"use client";
import React, { useState, useMemo, useEffect } from 'react';
import TopHeader from '@/components/pages/TopHeader';
import SearchBar from '@/components/pages/SearchBar';
import SideBar from '@/components/pages/SideBar';
import ProductCard from '@/components/shared/ProductCard';
import { products } from '@/constants/product';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoOptionsOutline } from 'react-icons/io5';

const ShopPage = () => {
    const maxPriceLimit = useMemo(() => {
        if (!products.length) return 5000;
        return Math.max(...products.map(p => p.price));
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState(maxPriceLimit);
    const [sortBy, setSortBy] = useState("default");
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    const [tempCategory, setTempCategory] = useState(selectedCategory);
    const [tempSize, setTempSize] = useState(selectedSize);
    const [tempPriceRange, setTempPriceRange] = useState(selectedPriceRange);
    const [tempSortBy, setTempSortBy] = useState(sortBy);

    useEffect(() => {
        if (isMobileDrawerOpen) {
            setTempCategory(selectedCategory);
            setTempSize(selectedSize);
            setTempPriceRange(selectedPriceRange);
            setTempSortBy(sortBy);
        }
    }, [isMobileDrawerOpen, selectedCategory, selectedSize, selectedPriceRange, sortBy]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesPrice = product.price <= selectedPriceRange;
            const matchesSize = !selectedSize || (product.sizes && product.sizes.includes(selectedSize));

            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery ||
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                (product.collection && product.collection.toLowerCase().includes(searchLower)) ||
                (product.category && product.category.toLowerCase().includes(searchLower));

            return matchesCategory && matchesPrice && matchesSize && matchesSearch;
        });
    }, [selectedCategory, selectedPriceRange, selectedSize, searchQuery]);

    const sortedProducts = useMemo(() => {
        const list = [...filteredProducts];
        if (sortBy === "low-to-high") {
            return list.sort((a, b) => a.price - b.price);
        }
        if (sortBy === "high-to-low") {
            return list.sort((a, b) => b.price - a.price);
        }
        if (sortBy === "name-asc") {
            return list.sort((a, b) => a.name.localeCompare(b.name));
        }
        return list;
    }, [filteredProducts, sortBy]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        setSelectedSize("");
        setSelectedPriceRange(maxPriceLimit);
        setSortBy("default");
    };

    // Active tags helper
    const activeTags = useMemo(() => {
        const tags = [];
        if (selectedCategory !== "All") {
            tags.push({ id: "category", label: selectedCategory, onRemove: () => setSelectedCategory("All") });
        }
        if (selectedSize) {
            tags.push({ id: "size", label: `Size: ${selectedSize}`, onRemove: () => setSelectedSize("") });
        }
        if (searchQuery) {
            tags.push({ id: "search", label: `Search: "${searchQuery}"`, onRemove: () => setSearchQuery("") });
        }
        if (selectedPriceRange < maxPriceLimit) {
            tags.push({ id: "price", label: `Max Price: ₹${selectedPriceRange.toLocaleString('en-IN')}`, onRemove: () => setSelectedPriceRange(maxPriceLimit) });
        }
        return tags;
    }, [selectedCategory, selectedSize, searchQuery, selectedPriceRange, maxPriceLimit]);

    return (
        <div className="pages">
            <TopHeader />
            <div className="shop-page-wrapper">
                <div className="container">
                    <div className="shop-control-bar">
                        <div className="shop-search-section">
                            <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        </div>
                        <div className="shop-actions-section">
                            <div className="sort-dropdown-wrapper">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="sort-dropdown"
                                >
                                    <option value="default">Default Sorting</option>
                                    <option value="low-to-high">Price: Low to High</option>
                                    <option value="high-to-low">Price: High to Low</option>
                                    <option value="name-asc">Alphabetical: A-Z</option>
                                </select>
                            </div>
                            <button
                                className="mobile-filter-trigger"
                                onClick={() => setIsMobileDrawerOpen(true)}
                            >
                                <IoOptionsOutline />
                                <span>Filters</span>
                            </button>
                        </div>
                    </div>
                    {activeTags.length > 0 && (
                        <div className="active-tags-row">
                            <span className="active-tags-label">Active Filters:</span>
                            <div className="active-tags-list">
                                {activeTags.map((tag) => (
                                    <span key={tag.id} className="active-tag-item">
                                        {tag.label}
                                        <button className="remove-tag-btn" onClick={tag.onRemove}>
                                            <IoCloseOutline />
                                        </button>
                                    </span>
                                ))}
                                <button className="clear-all-tag-btn" onClick={handleClearFilters}>
                                    Clear All
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="shop-main-layout">
                        <div className="desktop-sidebar-container">
                            <SideBar
                                products={products}
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                                selectedSize={selectedSize}
                                onSelectSize={setSelectedSize}
                                selectedPriceRange={selectedPriceRange}
                                onSelectPriceRange={setSelectedPriceRange}
                                maxPriceLimit={maxPriceLimit}
                                onClearAll={handleClearFilters}
                            />
                        </div>
                        <div className="shop-products-column">
                            {sortedProducts.length > 0 ? (
                                <div className="shop-products-grid">
                                    {sortedProducts.map((product, index) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="no-products-found">
                                    <h3>No Products Found</h3>
                                    <p>We couldn't find any products matching your active filters. Try adjusting your search query, price range, or categories.</p>
                                    <button onClick={handleClearFilters} className="reset-filters-btn">
                                        Reset All Filters
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isMobileDrawerOpen && (
                    <>
                        <motion.div
                            className="mobile-filter-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileDrawerOpen(false)}
                        />
                        <motion.div
                            className="mobile-filter-drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className="drawer-header">
                                <h3>Filters & Sorting</h3>
                                <button
                                    className="close-drawer-btn"
                                    onClick={() => setIsMobileDrawerOpen(false)}
                                >
                                    <IoCloseOutline />
                                </button>
                            </div>
                            <div className="drawer-body-content">
                                <div className="drawer-sort-section">
                                    <h4 className="filter-group-title">Sort By</h4>
                                    <select
                                        value={tempSortBy}
                                        onChange={(e) => setTempSortBy(e.target.value)}
                                        className="sort-dropdown-mobile"
                                    >
                                        <option value="default">Default Sorting</option>
                                        <option value="low-to-high">Price: Low to High</option>
                                        <option value="high-to-low">Price: High to Low</option>
                                        <option value="name-asc">Alphabetical: A-Z</option>
                                    </select>
                                </div>
                                <hr className="drawer-separator" />
                                <SideBar
                                    products={products}
                                    selectedCategory={tempCategory}
                                    onSelectCategory={setTempCategory}
                                    selectedSize={tempSize}
                                    onSelectSize={setTempSize}
                                    selectedPriceRange={tempPriceRange}
                                    onSelectPriceRange={setTempPriceRange}
                                    maxPriceLimit={maxPriceLimit}
                                    onClearAll={() => {
                                        setTempCategory("All");
                                        setTempSize("");
                                        setTempPriceRange(maxPriceLimit);
                                    }}
                                />
                            </div>
                            <div className="drawer-actions">
                                <button
                                    className="apply-filters-btn"
                                    onClick={() => {
                                        setSelectedCategory(tempCategory);
                                        setSelectedSize(tempSize);
                                        setSelectedPriceRange(tempPriceRange);
                                        setSortBy(tempSortBy);
                                        setIsMobileDrawerOpen(false);
                                    }}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ShopPage;