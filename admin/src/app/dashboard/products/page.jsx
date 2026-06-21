"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardTitles from "@/components/layout/DashboardTitles";
import ProductCard from "@/components/shared/ProductCard";
import {
    BsPlus,
    BsSearch,
    BsArrowClockwise,
    BsChevronDown,
    BsGrid3X3Gap,
    BsList,
    BsBoxSeam,
} from "react-icons/bs";
import useProductStore from "@/store/productStore";

const CATEGORIES = [
    "Ethnic Dresses",
    "Farshi Salwars Collection",
    "Kurti Sets",
];

const STATUS_TABS = [
    { label: "All", value: "" },
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
    { label: "Archived", value: "archived" },
];

const SORT_OPTIONS = [
    { label: "Newest First", value: "" },
    { label: "Price: Low → High", value: "price_asc" },
    { label: "Price: High → Low", value: "price_desc" },
];

export default function ProductsPage() {
    const router = useRouter();
    const {
        products,
        pagination,
        isLoading,
        error,
        filters,
        loadProducts,
    } = useProductStore();

    const [searchInput, setSearchInput] = useState("");
    const [debounceTimer, setDebounceTimer] = useState(null);

    // Initial load – show all statuses for admin
    useEffect(() => {
        loadProducts({ status: "" });
    }, []);

    // Debounced search
    const handleSearch = (value) => {
        setSearchInput(value);
        if (debounceTimer) clearTimeout(debounceTimer);
        const timer = setTimeout(() => {
            loadProducts({ search: value, page: 1 });
        }, 400);
        setDebounceTimer(timer);
    };

    const handleReset = () => {
        setSearchInput("");
        loadProducts({ search: "", category: "", status: "", sort: "", page: 1 });
    };

    const handlePageChange = (newPage) => {
        loadProducts({ page: newPage });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const skeletons = Array.from({ length: 6 });

    const activeStatusLabel =
        STATUS_TABS.find((t) => t.value === filters.status)?.label || "All";

    return (
        <div className="dashboard-page">
            <DashboardTitles
                title="Product Catalog"
                subtitle={`Inventory • ${pagination.total} Product${pagination.total !== 1 ? "s" : ""}`}
            />

            <div className="dashboard-wrapper">

                {/* ─────────────────────────────────── FILTER BAR ─── */}
                <div className="pf-bar">

                    {/* Search */}
                    <div className="pf-search-wrap">
                        <BsSearch className="pf-search-icon" />
                        <input
                            className="pf-search-input"
                            type="text"
                            placeholder="Search products…"
                            value={searchInput}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>

                    {/* Divider */}
                    <div className="pf-divider" />

                    {/* Status Tabs */}
                    <div className="pf-status-tabs">
                        {STATUS_TABS.map((tab) => (
                            <button
                                key={tab.value}
                                className={`pf-tab ${filters.status === tab.value ? "pf-tab-active" : ""}`}
                                onClick={() => loadProducts({ status: tab.value, page: 1 })}
                            >
                                {tab.label}
                                {tab.value === "" && (
                                    <span className="pf-tab-count">{pagination.total}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="pf-divider" />

                    {/* Category Select */}
                    <div className="pf-select-wrap">
                        <select
                            className="pf-select"
                            value={filters.category}
                            onChange={(e) => loadProducts({ category: e.target.value, page: 1 })}
                        >
                            <option value="">All Categories</option>
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <BsChevronDown className="pf-select-arrow" />
                    </div>

                    {/* Sort Select */}
                    <div className="pf-select-wrap">
                        <select
                            className="pf-select"
                            value={filters.sort}
                            onChange={(e) => loadProducts({ sort: e.target.value, page: 1 })}
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <BsChevronDown className="pf-select-arrow" />
                    </div>

                    {/* Spacer */}
                    <div style={{ flex: 1 }} />

                    {/* Reset */}
                    <button
                        className="pf-icon-btn"
                        onClick={handleReset}
                        title="Reset filters"
                    >
                        <BsArrowClockwise />
                    </button>

                    {/* Add Product */}
                    <button
                        className="pf-add-btn"
                        onClick={() => router.push("/dashboard/products/add")}
                    >
                        <BsPlus style={{ fontSize: "20px" }} />
                        Add Product
                    </button>
                </div>

                {/* Active filter pills */}
                {(filters.search || filters.category || filters.status) && (
                    <div className="pf-active-filters">
                        <span className="pf-active-label">Filters:</span>
                        {filters.status && (
                            <span className="pf-pill">
                                Status: {activeStatusLabel}
                                <button onClick={() => loadProducts({ status: "", page: 1 })} className="pf-pill-close">×</button>
                            </span>
                        )}
                        {filters.category && (
                            <span className="pf-pill">
                                {filters.category}
                                <button onClick={() => loadProducts({ category: "", page: 1 })} className="pf-pill-close">×</button>
                            </span>
                        )}
                        {filters.search && (
                            <span className="pf-pill">
                                "{filters.search}"
                                <button onClick={() => { setSearchInput(""); loadProducts({ search: "", page: 1 }); }} className="pf-pill-close">×</button>
                            </span>
                        )}
                    </div>
                )}

                {/* ── Error ── */}
                {error && (
                    <div style={{
                        background: "#3f1f1f",
                        border: "1px solid #f87171",
                        borderRadius: "8px",
                        padding: "16px",
                        color: "#f87171",
                        marginBottom: "20px",
                        fontSize: "14px"
                    }}>
                        ⚠ {error}
                    </div>
                )}

                {/* ── Grid ── */}
                {isLoading ? (
                    <div className="products-grid">
                        {skeletons.map((_, i) => (
                            <div key={i} className="product-card pf-skeleton">
                                <div className="pf-skeleton-img" />
                                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <div className="pf-skeleton-line" style={{ width: "70%" }} />
                                    <div className="pf-skeleton-line" style={{ width: "40%" }} />
                                    <div className="pf-skeleton-line" style={{ width: "55%" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="pf-empty">
                        <BsBoxSeam className="pf-empty-icon" />
                        <div className="pf-empty-title">No products found</div>
                        <div className="pf-empty-sub">
                            {filters.search || filters.category || filters.status
                                ? "Try clearing your filters to see all products"
                                : "Add your first product to get started"}
                        </div>
                        <button
                            className="pf-add-btn"
                            style={{ marginTop: "24px" }}
                            onClick={() => router.push("/dashboard/products/add")}
                        >
                            <BsPlus /> Add First Product
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} item={product} />
                        ))}
                    </div>
                )}

                {/* ── Pagination ── */}
                {!isLoading && pagination.pages > 1 && (
                    <div className="pf-pagination">
                        <button
                            className="pf-page-btn"
                            disabled={pagination.page <= 1}
                            onClick={() => handlePageChange(pagination.page - 1)}
                        >
                            ← Prev
                        </button>

                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pg) => (
                            <button
                                key={pg}
                                className={`pf-page-num ${pg === pagination.page ? "pf-page-num-active" : ""}`}
                                onClick={() => handlePageChange(pg)}
                            >
                                {pg}
                            </button>
                        ))}

                        <button
                            className="pf-page-btn"
                            disabled={pagination.page >= pagination.pages}
                            onClick={() => handlePageChange(pagination.page + 1)}
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>

            {/* ─── scoped styles ─── */}
            <style>{`
                /* ── FILTER BAR ─────────────────────────────── */
                .pf-bar {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: linear-gradient(135deg, #ffffff0d 0%, #ffffff05 100%);
                    border: 1px solid #975e252e;
                    backdrop-filter: blur(12px);
                    padding: 10px 16px;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                }

                /* Search */
                .pf-search-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;
                    min-width: 200px;
                    flex: 0 0 auto;
                }
                .pf-search-icon {
                    position: absolute;
                    left: 12px;
                    color: #666;
                    font-size: 14px;
                    pointer-events: none;
                }
                .pf-search-input {
                    background: #ffffff08;
                    border: 1px solid #975e2530;
                    padding: 9px 12px 9px 36px;
                    color: #fff;
                    font-size: 13px;
                    font-family: var(--font-outfit);
                    width: 220px;
                    transition: all 0.25s;
                }
                .pf-search-input::placeholder { color: #555; }
                .pf-search-input:focus {
                    outline: none;
                    border-color: var(--text-light);
                    background: #ffffff12;
                }

                /* Divider */
                .pf-divider {
                    width: 1px;
                    height: 28px;
                    background: #975e2530;
                    flex-shrink: 0;
                    margin-inline: 6px;
                }

                /* Status tabs */
                .pf-status-tabs {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                }
                .pf-tab {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 14px;
                    border: none;
                    background: transparent;
                    color: #666;
                    font-size: 12px;
                    font-weight: 500;
                    font-family: var(--font-outfit);
                    cursor: pointer;
                    letter-spacing: 0.5px;
                    transition: all 0.2s;
                    position: relative;
                }
                .pf-tab::after {
                    content: "";
                    position: absolute;
                    bottom: -2px;
                    left: 14px;
                    right: 14px;
                    height: 2px;
                    background: var(--text-light);
                    transform: scaleX(0);
                    transition: transform 0.2s;
                }
                .pf-tab:hover { color: #aaa; }
                .pf-tab-active { color: var(--text-light) !important; }
                .pf-tab-active::after { transform: scaleX(1); }
                .pf-tab-count {
                    background: #975e2530;
                    color: var(--text-light);
                    font-size: 10px;
                    padding: 1px 6px;
                    border-radius: 10px;
                    font-weight: 600;
                }

                /* Select */
                .pf-select-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .pf-select {
                    appearance: none;
                    -webkit-appearance: none;
                    background: #ffffff08;
                    border: 1px solid #975e2530;
                    padding: 9px 32px 9px 12px;
                    color: #888;
                    font-size: 12px;
                    font-family: var(--font-outfit);
                    cursor: pointer;
                    transition: all 0.25s;
                    min-width: 140px;
                }
                .pf-select:focus {
                    outline: none;
                    border-color: var(--text-light);
                    color: #ccc;
                }
                .pf-select option { background: #0d0d0d; color: #ddd; }
                .pf-select-arrow {
                    position: absolute;
                    right: 10px;
                    color: #555;
                    font-size: 11px;
                    pointer-events: none;
                }

                /* Icon button */
                .pf-icon-btn {
                    background: #ffffff08;
                    border: 1px solid #975e2530;
                    color: #777;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 15px;
                    transition: all 0.25s;
                    flex-shrink: 0;
                }
                .pf-icon-btn:hover {
                    background: #975e2520;
                    color: var(--text-light);
                    border-color: #975e2550;
                }

                /* Add button */
                .pf-add-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 9px 20px;
                    background: #fcd8c4;
                    color: #000;
                    border: none;
                    font-size: 13px;
                    font-weight: 600;
                    font-family: var(--font-outfit);
                    cursor: pointer;
                    letter-spacing: 0.5px;
                    transition: all 0.25s;
                    white-space: nowrap;
                    flex-shrink: 0;
                }
                .pf-add-btn:hover { background: #e5bfaa; }

                /* Active filter pills */
                .pf-active-filters {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 16px;
                    flex-wrap: wrap;
                }
                .pf-active-label {
                    font-size: 11px;
                    color: #555;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .pf-pill {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 10px;
                    background: #975e2520;
                    border: 1px solid #975e2540;
                    color: var(--text-light);
                    font-size: 12px;
                    border-radius: 20px;
                }
                .pf-pill-close {
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    font-size: 14px;
                    line-height: 1;
                    padding: 0;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                .pf-pill-close:hover { opacity: 1; }

                /* Skeleton */
                .pf-skeleton-img {
                    height: 280px;
                    background: linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%);
                    background-size: 200% 100%;
                    animation: pf-shimmer 1.5s infinite;
                }
                .pf-skeleton-line {
                    height: 14px;
                    background: linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%);
                    background-size: 200% 100%;
                    animation: pf-shimmer 1.5s infinite;
                    border-radius: 4px;
                }
                @keyframes pf-shimmer {
                    0%   { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                /* Empty state */
                .pf-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 100px 20px;
                    text-align: center;
                }
                .pf-empty-icon {
                    font-size: 52px;
                    color: #333;
                    margin-bottom: 20px;
                }
                .pf-empty-title {
                    font-family: var(--font-cinzel);
                    font-size: 20px;
                    color: #555;
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                }
                .pf-empty-sub {
                    font-size: 13px;
                    color: #3a3a3a;
                    max-width: 300px;
                    line-height: 1.7;
                }

                /* Pagination */
                .pf-pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 6px;
                    margin-top: 48px;
                    flex-wrap: wrap;
                }
                .pf-page-btn {
                    padding: 8px 18px;
                    background: #ffffff08;
                    border: 1px solid #975e2530;
                    color: #888;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--font-outfit);
                }
                .pf-page-btn:hover:not(:disabled) {
                    background: #975e2520;
                    color: var(--text-light);
                }
                .pf-page-btn:disabled { opacity: 0.3; cursor: default; }
                .pf-page-num {
                    width: 36px;
                    height: 36px;
                    background: transparent;
                    border: 1px solid #975e2530;
                    color: #666;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--font-outfit);
                }
                .pf-page-num:hover { background: #975e2520; color: var(--text-light); }
                .pf-page-num-active {
                    background: #fcd8c4 !important;
                    color: #000 !important;
                    border-color: #fcd8c4 !important;
                    font-weight: 700;
                }
            `}</style>
        </div>
    );
}