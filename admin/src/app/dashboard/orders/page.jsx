"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardTitles from "@/components/layout/DashboardTitles";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import { RxCross2 } from "react-icons/rx";

const STATUS_STEPS = ["Placed", "Packing", "Shipped", "Delivered"];

const ordersData = [
    {
        id: "#E63098",
        product: { name: "Home Decor", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=100&auto=format&fit=crop" },
        customer: { name: "Md Saquib", email: "mdsaquib5540@gmail.com", phone: "9870545627", address: "RZ 4A, New Uttam Nagar, Near Shanti Nursing Home, New Delhi, 110059" },
        size: "N/A", qty: 1, payment: "₹0", paymentMode: "COD", paymentStatus: "Pending",
        date: "4/4/2026", dateFormatted: "Sat, 4 April 2026", status: "Packing"
    },
    {
        id: "#E63093",
        product: { name: "Home Decor", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=100&auto=format&fit=crop" },
        customer: { name: "Md Saquib", email: "mdsaquib5540@gmail.com", phone: "9870545627", address: "RZ 4A, New Uttam Nagar, Near Shanti Nursing Home, New Delhi, 110059" },
        size: "N/A", qty: 1, payment: "₹0", paymentMode: "COD", paymentStatus: "Pending",
        date: "4/4/2026", dateFormatted: "Sat, 4 April 2026", status: "Pending"
    },
    {
        id: "#7ED8DD",
        product: { name: "Tulsi Pot", image: "https://images.unsplash.com/photo-1601630138241-118f6f571c66?q=80&w=100&auto=format&fit=crop" },
        customer: { name: "Priya Singh", email: "priya.design@yahoo.com", phone: "9812345678", address: "45 MG Road, Bangalore, Karnataka, 560001" },
        size: "S", qty: 1, payment: "₹450", paymentMode: "Online", paymentStatus: "Paid",
        date: "3/29/2026", dateFormatted: "Sat, 29 March 2026", status: "Pending"
    },
    {
        id: "#7ED8D8",
        product: { name: "Tulsi Pot", image: "https://images.unsplash.com/photo-1601630138241-118f6f571c66?q=80&w=100&auto=format&fit=crop" },
        customer: { name: "Rohan Sharma", email: "rohan.sharma@gmail.com", phone: "9723456789", address: "12 Park Street, Kolkata, West Bengal, 700016" },
        size: "S", qty: 1, payment: "₹450", paymentMode: "COD", paymentStatus: "Pending",
        date: "3/29/2026", dateFormatted: "Sat, 29 March 2026", status: "Pending"
    },
    {
        id: "#1C71F5",
        product: { name: "Tulsi Pot", image: "https://images.unsplash.com/photo-1601630138241-118f6f571c66?q=80&w=100&auto=format&fit=crop" },
        customer: { name: "Aisha Khan", email: "aisha@example.com", phone: "9856789012", address: "7 Linking Road, Bandra West, Mumbai, 400050" },
        size: "S", qty: 1, payment: "₹450", paymentMode: "COD", paymentStatus: "Pending",
        date: "3/29/2026", dateFormatted: "Sat, 29 March 2026", status: "Packing"
    },
    {
        id: "#1C71CE",
        product: { name: "Drinkware", image: "https://images.unsplash.com/photo-1594918712318-7a5528828b80?q=80&w=100&auto=format&fit=crop" },
        customer: { name: "Karan Mehta", email: "karan_m@example.com", phone: "9934567890", address: "88 Civil Lines, Jaipur, Rajasthan, 302006" },
        size: "L", qty: 4, payment: "₹2,580", paymentMode: "Online", paymentStatus: "Paid",
        date: "3/29/2026", dateFormatted: "Sat, 29 March 2026", status: "Shipped"
    },
    {
        id: "#1C71C9",
        product: { name: "Drinkware", image: "https://images.unsplash.com/photo-1594918712318-7a5528828b80?q=80&w=100&auto=format&fit=crop" },
        customer: { name: "Ananya Patel", email: "ananya.creates@outlook.com", phone: "9090909090", address: "23 Ashok Nagar, Indore, Madhya Pradesh, 452001" },
        size: "L", qty: 4, payment: "₹2,580", paymentMode: "COD", paymentStatus: "Pending",
        date: "3/29/2026", dateFormatted: "Sat, 29 March 2026", status: "Packing"
    },
    {
        id: "#1C71A2",
        product: { name: "Home Decor", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=100&auto=format&fit=crop" },
        customer: { name: "Neha Verma", email: "neha.verma@gmail.com", phone: "9811234567", address: "56 Sector 18, Noida, Uttar Pradesh, 201301" },
        size: "XXL", qty: 2, payment: "₹1,200", paymentMode: "Online", paymentStatus: "Paid",
        date: "3/29/2026", dateFormatted: "Sat, 29 March 2026", status: "Delivered"
    },
];

const FILTERS = ["All Orders", "Placed", "Packing", "Shipped", "Delivered"];

export default function OrdersPage() {
    const [activeFilter, setActiveFilter] = useState("All Orders");
    const [orders, setOrders] = useState(ordersData);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [popupStatus, setPopupStatus] = useState("");

    const filteredOrders = activeFilter === "All Orders"
        ? orders
        : orders.filter(o => o.status.toLowerCase() === activeFilter.toLowerCase());

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const openDetails = (order) => {
        setSelectedOrder(order);
        setPopupStatus(order.status);
    };

    const closeDetails = () => setSelectedOrder(null);

    const handlePopupUpdate = () => {
        if (selectedOrder) {
            handleStatusChange(selectedOrder.id, popupStatus);
            setSelectedOrder(prev => ({ ...prev, status: popupStatus }));
        }
    };

    return (
        <div className="dashboard-page">
            <DashboardTitles title="Customer Orders" subtitle="Sales • Order Management" />
            <div className="dashboard-wrapper">

                {/* Top Bar */}
                <div className="orders-top-bar">
                    <Searchbar placeholder="Search by ID, product, customer..." />
                    <div className="order-filters">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Table */}
                <div className="orders-table-wrapper glass-panel" style={{ padding: 0 }}>
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Customer</th>
                                <th>Size / Qty</th>
                                <th>Payment</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td className="order-id">{order.id}</td>
                                    <td>
                                        <div className="order-product">
                                            <Image src={order.product.image} alt={order.product.name} className="order-product-img" width={40} height={40} style={{ objectFit: 'cover' }} />
                                            <span>{order.product.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="order-customer">
                                            <span className="customer-name">{order.customer.name}</span>
                                            <span className="customer-email">{order.customer.email}</span>
                                        </div>
                                    </td>
                                    <td className="order-size">
                                        <span className="size-badge">{order.size}</span>
                                        <span className="qty-text">× {order.qty}</span>
                                    </td>
                                    <td>
                                        <div className="order-payment">
                                            <span className="payment-amount">{order.payment}</span>
                                            <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>{order.paymentStatus}</span>
                                        </div>
                                    </td>
                                    <td className="order-date">{order.date}</td>
                                    <td>
                                        <select
                                            className={`status-select ${order.status.toLowerCase()}`}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        >
                                            {STATUS_STEPS.map(s => (
                                                <option key={s} value={s}>{s.toUpperCase()}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button className="details-btn" onClick={() => openDetails(order)}>
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <Pagination />
                </div>

            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={closeDetails}>
                    <div className="order-modal glass-panel" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Order {selectedOrder.id}</h2>
                            <button className="modal-close" onClick={closeDetails}><RxCross2 /></button>
                        </div>

                        <div className="modal-body">
                            <div className="modal-grid">
                                {/* Product */}
                                <div className="modal-section">
                                    <div className="modal-section-label">Product(s)</div>
                                    <div className="modal-product-row">
                                        <Image src={selectedOrder.product.image} alt={selectedOrder.product.name} className="modal-product-img" width={60} height={60} style={{ objectFit: 'cover' }} />
                                        <div>
                                            <div className="modal-product-name">{selectedOrder.product.name}</div>
                                            <div className="modal-product-meta">Size: {selectedOrder.size} · Qty: {selectedOrder.qty}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer */}
                                <div className="modal-section">
                                    <div className="modal-section-label">Customer</div>
                                    <div className="modal-customer-name">{selectedOrder.customer.name}</div>
                                    <div className="modal-customer-meta">{selectedOrder.customer.email}</div>
                                    <div className="modal-customer-meta">{selectedOrder.customer.phone}</div>
                                    <div className="modal-customer-meta" style={{ marginTop: "8px" }}>{selectedOrder.customer.address}</div>
                                </div>

                                {/* Payment */}
                                <div className="modal-section">
                                    <div className="modal-section-label">Payment</div>
                                    <div className="modal-payment-amount">{selectedOrder.payment}</div>
                                    <div className="modal-customer-meta">via {selectedOrder.paymentMode}</div>
                                    <span className={`payment-status ${selectedOrder.paymentStatus.toLowerCase()}`} style={{ marginTop: "8px", display: "inline-block" }}>
                                        {selectedOrder.paymentStatus}
                                    </span>
                                </div>

                                {/* Date */}
                                <div className="modal-section">
                                    <div className="modal-section-label">Order Date</div>
                                    <div className="modal-customer-name">{selectedOrder.dateFormatted}</div>
                                </div>
                            </div>

                            {/* Status Tracker */}
                            <div className="status-tracker">
                                <div className="modal-section-label" style={{ marginBottom: "16px" }}>Status Tracker</div>
                                <div className="tracker-steps">
                                    {STATUS_STEPS.map((step, idx) => {
                                        const currentIdx = STATUS_STEPS.findIndex(s => s === selectedOrder.status);
                                        const isDone = idx <= currentIdx;
                                        return (
                                            <div key={step} className="tracker-step">
                                                <div className={`tracker-dot ${isDone ? "done" : ""}`}>
                                                    {isDone && <span className="tracker-inner" />}
                                                </div>
                                                {idx < STATUS_STEPS.length - 1 && (
                                                    <div className={`tracker-line ${idx < currentIdx ? "done" : ""}`} />
                                                )}
                                                <div className={`tracker-label ${isDone ? "done" : ""}`}>{step.toUpperCase()}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer">
                                <span className="modal-footer-label">Update Status:</span>
                                <select
                                    className={`status-select ${popupStatus.toLowerCase()}`}
                                    value={popupStatus}
                                    onChange={(e) => setPopupStatus(e.target.value)}
                                >
                                    {STATUS_STEPS.map(s => (
                                        <option key={s} value={s}>{s.toUpperCase()}</option>
                                    ))}
                                </select>
                                <button className="details-btn" onClick={handlePopupUpdate}>Update</button>
                                <button className="modal-close-btn" onClick={closeDetails}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
