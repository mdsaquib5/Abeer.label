"use client";
import React, { useEffect } from 'react';
import useCategoryStore from '@/store/categoryStore';

const SideBar = ({
    products = [],
    selectedCategory = "All",
    onSelectCategory,
    selectedSize = "",
    onSelectSize,
    selectedPriceRange,
    onSelectPriceRange,
    maxPriceLimit,
    onClearAll
}) => {
    const { categories: dbCategories, loadCategories } = useCategoryStore();

    useEffect(() => {
        loadCategories("product");
    }, [loadCategories]);

    const categories = React.useMemo(() => {
        if (dbCategories.length > 0) {
            return ["All", ...dbCategories.map(c => c.name)];
        }
        return ["All", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
    }, [dbCategories, products]);
    const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

    const getCategoryCount = (category) => {
        if (category === "All") return products.length;
        return products.filter(p => p.category === category).length;
    };

    return (
        <aside className="shop-sidebar">
            <div className="sidebar-header">
                <h3 className="sidebar-title">Filters</h3>
                <button
                    onClick={onClearAll}
                    className="clear-all-btn"
                    disabled={selectedCategory === "All" && selectedPriceRange === maxPriceLimit && selectedSize === ""}
                >
                    Clear
                </button>
            </div>

            <div className="filter-group">
                <h4 className="filter-group-title">Categories</h4>
                <ul className="category-list">
                    {categories.map((category) => {
                        const count = getCategoryCount(category);
                        const isActive = selectedCategory === category;
                        return (
                            <li
                                key={category}
                                className={`category-item ${isActive ? "active" : ""}`}
                                onClick={() => onSelectCategory(category)}
                            >
                                <span className="category-name">
                                    {isActive && <span className="bullet">•</span>}
                                    {category}
                                </span>
                                <span className="category-count">({count})</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="filter-group">
                <h4 className="filter-group-title">Sizes</h4>
                <div className="size-selector-grid">
                    {sizes.map((size) => {
                        const isActive = selectedSize === size;
                        return (
                            <button
                                key={size}
                                className={`size-filter-btn ${isActive ? "active" : ""}`}
                                onClick={() => onSelectSize(isActive ? "" : size)}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="filter-group">
                <h4 className="filter-group-title">Filter by Price</h4>
                <div className="price-slider-container">
                    <input
                        type="range"
                        min="0"
                        max={maxPriceLimit}
                        value={selectedPriceRange}
                        onChange={(e) => onSelectPriceRange(Number(e.target.value))}
                        className="price-slider"
                    />
                    <div className="price-labels">
                        <span className="price-label-min">₹0</span>
                        <span className="price-label-current">Max: ₹{selectedPriceRange.toLocaleString('en-IN')}</span>
                        <span className="price-label-max">₹{maxPriceLimit.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;