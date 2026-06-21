"use client";

import DashboardTitles from "@/components/layout/DashboardTitles";
import { BsCloudUpload, BsPlusLg } from "react-icons/bs";

export default function AddProductPage() {
    return (
        <div className="dashboard-page">
            <DashboardTitles title="Add New Product" />
            <div className="dashboard-wrapper">
                <form className="add-product-layout">
                    <div className="left-column">
                        <div className="glass-panel">
                            <div className="product-form-group">
                                <label>Product Name *</label>
                                <input type="text" className="product-form-input" placeholder="e.g. Earthen Tandoor Mug" />
                            </div>

                            <div className="product-form-group">
                                <label>Description *</label>
                                <textarea className="product-form-textarea" rows={4} placeholder="Describe your product — materials, craftsmanship, usage..."></textarea>
                                <span className="char-count">0/500</span>
                            </div>

                            <div className="form-row">
                                <div className="product-form-group">
                                    <label>Price (₹) *</label>
                                    <input type="number" className="product-form-input" placeholder="₹ 0" />
                                </div>
                                <div className="product-form-group">
                                    <label>Stock *</label>
                                    <input type="number" className="product-form-input" placeholder="10" />
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel">
                            <h3 className="panel-title">Available Sizes *</h3>
                            <div className="size-options">
                                <button className="size-btn">S</button>
                                <button className="size-btn">M</button>
                                <button className="size-btn">L</button>
                                <button className="size-btn">XL</button>
                                <button className="size-btn">XXL</button>
                            </div>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="glass-panel" style={{ marginBottom: "24px" }}>
                            <div className="panel-header-row">
                                <div>
                                    <h3 className="panel-title" style={{ color: "var(--white)", borderBottom: "none", textTransform: "capitalize", fontSize: "18px" }}>Product Images</h3>
                                    <span className="error-text">* Use images less than 2MB</span>
                                </div>
                                <span className="header-badge">0/4</span>
                            </div>

                            <div className="image-upload-zone">
                                <BsCloudUpload className="upload-icon" />
                                <div className="upload-text">Drop images here or click to browse</div>
                                <div className="upload-subtext">PNG, JPG, WEBP — Max 4 images (Less than 2MB each)</div>
                            </div>
                        </div>

                        <div className="right-column-actions">
                            <button className="btn btn-primary">
                                <BsPlusLg style={{ strokeWidth: "1px" }} /> Publish Product
                            </button>
                            <button className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}