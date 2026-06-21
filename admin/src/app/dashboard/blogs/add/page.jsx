"use client";

import DashboardTitles from "@/components/layout/DashboardTitles";
import Link from "next/link";
import { BsArrowLeft, BsImage } from "react-icons/bs";
import { useState } from "react";

export default function AddBlogPage() {
    const [status, setStatus] = useState("Draft");
    const [charCount, setCharCount] = useState(0);

    return (
        <div className="dashboard-page">
            <div className="add-blog-header">
                <DashboardTitles title="Write New Blog Post" subtitle="Content • New Post" />
                <Link href="/dashboard/blogs" className="back-btn">
                    <BsArrowLeft /> Back to Blogs
                </Link>
            </div>

            <div className="dashboard-wrapper">
                <div className="add-blog-layout glass-panel">

                    {/* Blog Title */}
                    <div className="product-form-group">
                        <label>Blog Title *</label>
                        <input type="text" className="product-form-input" placeholder="Enter blog title" />
                    </div>

                    {/* Description */}
                    <div className="product-form-group">
                        <label>Description (Max 200 chars) *</label>
                        <textarea
                            className="product-form-textarea"
                            rows={3}
                            maxLength={200}
                            placeholder="Write a brief, catchy summary for listing cards (1-2 lines)"
                            onChange={(e) => setCharCount(e.target.value.length)}
                        />
                        <span className="char-count">{charCount}/200 characters</span>
                    </div>

                    {/* Cover Image */}
                    <div className="product-form-group">
                        <label>Cover Image</label>
                        <div className="image-upload-zone">
                            <BsImage style={{ fontSize: "28px", color: "#666" }} />
                            <span className="upload-text">Upload Cover Image</span>
                            <span className="upload-hint">PNG, JPG up to 5MB</span>
                        </div>
                    </div>

                    {/* Editorial Content */}
                    <div className="product-form-group">
                        <label>Editorial Content</label>
                        <div className="blog-editor-wrapper">
                            <div className="blog-editor-toolbar">
                                <button className="editor-btn"><strong>B</strong></button>
                                <button className="editor-btn"><em>I</em></button>
                                <button className="editor-btn"><u>U</u></button>
                                <div className="editor-divider" />
                                <button className="editor-btn">H1</button>
                                <button className="editor-btn" style={{ color: "var(--text-light)" }}>H2</button>
                                <button className="editor-btn" style={{ color: "var(--accent)" }}>H3</button>
                                <div className="editor-divider" />
                                <button className="editor-btn">≡</button>
                                <button className="editor-btn">≔</button>
                                <button className="editor-btn">"</button>
                            </div>
                            <div className="blog-editor-body" contentEditable suppressContentEditableWarning>
                                <span className="editor-placeholder">Write something premium...</span>
                            </div>
                        </div>
                    </div>

                    {/* Author */}
                    <div className="product-form-group">
                        <label>Author Name</label>
                        <input type="text" className="product-form-input" defaultValue="Abeer Team" />
                    </div>

                    {/* Footer */}
                    <div className="add-blog-footer">
                        <div className="blog-status-toggle">
                            <span className="modal-footer-label">Status:</span>
                            <button
                                className={`status-toggle-btn ${status === "Draft" ? "active-draft" : ""}`}
                                onClick={() => setStatus("Draft")}
                            >Draft</button>
                            <button
                                className={`status-toggle-btn ${status === "Published" ? "active-publish" : ""}`}
                                onClick={() => setStatus("Published")}
                            >Publish</button>
                        </div>
                        <button className="btn-save-blog">Save Blog Post</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
