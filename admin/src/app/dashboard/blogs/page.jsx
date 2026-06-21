"use client";

import { useState } from "react";
import DashboardTitles from "@/components/layout/DashboardTitles";
import BlogCard from "@/components/shared/BlogCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import { BsPencil, BsTrash, BsEye } from "react-icons/bs";

const blogsData = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=640&auto=format&fit=crop",
        blogLink: "#",
        title: "The Art of Handcrafted Home Decor",
        desc: "Discover how artisans are reviving traditional clay crafts and bringing earthy elegance into modern homes.",
        authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        author: "Abeer Team",
        date: "Jun 15, 2026",
        status: "Published"
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=640&auto=format&fit=crop",
        blogLink: "#",
        title: "Sustainable Living with Terracotta",
        desc: "Explore the beauty and sustainability of terracotta in everyday life — from kitchen to living room.",
        authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        author: "Mariyam Rehan",
        date: "Jun 10, 2026",
        status: "Published"
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=640&auto=format&fit=crop",
        blogLink: "#",
        title: "Behind the Scenes: Our Artisan Process",
        desc: "A deep dive into our handcrafting workshops — how every piece goes from clay to your doorstep.",
        authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        author: "Abeer Team",
        date: "Jun 01, 2026",
        status: "Draft"
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=640&auto=format&fit=crop",
        blogLink: "#",
        title: "The Art of Handcrafted Home Decor",
        desc: "Discover how artisans are reviving traditional clay crafts and bringing earthy elegance into modern homes.",
        authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        author: "Abeer Team",
        date: "Jun 15, 2026",
        status: "Published"
    },
    {
        id: 5,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=640&auto=format&fit=crop",
        blogLink: "#",
        title: "Sustainable Living with Terracotta",
        desc: "Explore the beauty and sustainability of terracotta in everyday life — from kitchen to living room.",
        authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        author: "Mariyam Rehan",
        date: "Jun 10, 2026",
        status: "Published"
    },
    {
        id: 6,
        img: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=640&auto=format&fit=crop",
        blogLink: "#",
        title: "Behind the Scenes: Our Artisan Process",
        desc: "A deep dive into our handcrafting workshops — how every piece goes from clay to your doorstep.",
        authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        author: "Abeer Team",
        date: "Jun 01, 2026",
        status: "Draft"
    },
];

export default function BlogsPage() {
    const [view, setView] = useState("cards"); // "cards" | "list"

    return (
        <div className="dashboard-page">
            <DashboardTitles title="Abeer Stories" subtitle="Content • Blog Management" />
            <div className="dashboard-wrapper">

                {/* Top Bar */}
                <div className="blogs-top-bar">
                    <Searchbar placeholder="Search blogs..." />
                    <div className="blogs-top-actions">
                        <div className="view-toggle">
                            <button
                                className={`view-btn ${view === "cards" ? "active" : ""}`}
                                onClick={() => setView("cards")}
                            >Cards</button>
                            <button
                                className={`view-btn ${view === "list" ? "active" : ""}`}
                                onClick={() => setView("list")}
                            >List</button>
                        </div>
                        <Link href="/dashboard/blogs/add" className="btn-add-blog">
                            <BsPlusLg /> Write New Post
                        </Link>
                    </div>
                </div>

                {view === "cards" && (
                    <div className="admin-blogs-grid">
                        {blogsData.map((blog) => (
                            <div key={blog.id} className="admin-blog-wrapper">
                                <BlogCard item={blog} />
                                <div className="blog-card-actions">
                                    <span className={`blog-status-badge ${blog.status.toLowerCase()}`}>{blog.status}</span>
                                    <div className="blog-action-btns">
                                        <button className="blog-action-btn"><BsEye /></button>
                                        <button className="blog-action-btn"><BsPencil /></button>
                                        <button className="blog-action-btn danger"><BsTrash /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {view === "list" && (
                    <div className="orders-table-wrapper glass-panel" style={{ padding: 0 }}>
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogsData.map((blog) => (
                                    <tr key={blog.id}>
                                        <td className="blog-list-title">{blog.title}</td>
                                        <td className="customer-name">{blog.author}</td>
                                        <td className="order-date">{blog.date}</td>
                                        <td>
                                            <span className={`blog-status-badge ${blog.status.toLowerCase()}`}>{blog.status}</span>
                                        </td>
                                        <td>
                                            <div className="blog-list-actions">
                                                <button className="blog-action-btn"><BsEye /></button>
                                                <button className="blog-action-btn"><BsPencil /></button>
                                                <button className="blog-action-btn danger"><BsTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <Pagination />

            </div>
        </div>
    );
}
