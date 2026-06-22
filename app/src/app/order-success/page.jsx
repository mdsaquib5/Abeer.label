"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import TopHeader from "@/components/pages/TopHeader";
import useOrderStore from "@/store/orderStore";

const OrderSuccessPage = () => {
    const router = useRouter();
    const { currentOrder, clearOrderState } = useOrderStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Clean up order state on unmount
    useEffect(() => {
        return () => {
            clearOrderState();
        };
    }, [clearOrderState]);

    if (!isHydrated) {
        return null;
    }

    const orderNumber = currentOrder?.orderNumber || "ABL-" + Math.floor(10000000 + Math.random() * 90000000);
    const totalAmount = currentOrder?.totalAmount || 0;
    const shippingAddress = currentOrder?.shippingAddress || {};

    return (
        <div className="pages">
            <TopHeader
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Checkout", href: "/checkout" },
                    { label: "Success", href: null },
                ]}
            />
            <div className="shop-page-wrapper">
                <div className="container" style={{ maxWidth: "600px", padding: "40px 20px" }}>
                    <div
                        className="success-card"
                        style={{
                            background: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(77, 38, 24, 0.1)",
                            borderRadius: "8px",
                            padding: "40px",
                            textAlign: "center",
                            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        <IoCheckmarkCircleOutline
                            style={{
                                fontSize: "72px",
                                color: "#4d2618",
                                marginBottom: "20px",
                            }}
                        />
                        <h2
                            style={{
                                fontFamily: "var(--font-primary)",
                                color: "#4d2618",
                                fontSize: "24px",
                                fontWeight: "600",
                                marginBottom: "12px",
                            }}
                        >
                            ORDER PLACED SUCCESSFULLY!
                        </h2>
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#666",
                                lineHeight: "1.6",
                                marginBottom: "30px",
                            }}
                        >
                            Thank you for shopping with Abeer Label. Your order has been registered and is being processed.
                        </p>

                        <div
                            className="order-details-box"
                            style={{
                                background: "#fcf9f7",
                                border: "1px solid rgba(77, 38, 24, 0.05)",
                                borderRadius: "4px",
                                padding: "20px",
                                textAlign: "left",
                                marginBottom: "30px",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                <span style={{ fontSize: "13px", color: "#666" }}>Order Number:</span>
                                <span style={{ fontSize: "13px", fontWeight: "600", color: "#4d2618" }}>
                                    {orderNumber}
                                </span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                <span style={{ fontSize: "13px", color: "#666" }}>Payment Method:</span>
                                <span style={{ fontSize: "13px", fontWeight: "600", color: "#4d2618" }}>
                                    Cash on Delivery (COD)
                                </span>
                            </div>
                            {totalAmount > 0 && (
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", borderBottom: "1px dashed rgba(77, 38, 24, 0.1)", paddingBottom: "10px" }}>
                                    <span style={{ fontSize: "13px", color: "#666" }}>Total Paid:</span>
                                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#4d2618" }}>
                                        ₹{totalAmount.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            )}
                            {shippingAddress.fullName && (
                                <div style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
                                    <strong style={{ color: "#4d2618" }}>Delivery To:</strong><br />
                                    {shippingAddress.fullName}<br />
                                    {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}<br />
                                    Phone: {shippingAddress.phone}
                                </div>
                            )}
                        </div>

                        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                            <button
                                className="button-primary"
                                onClick={() => router.push("/shop")}
                                style={{
                                    padding: "12px 24px",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                }}
                            >
                                CONTINUE SHOPPING
                            </button>
                            <button
                                onClick={() => router.push("/")}
                                style={{
                                    padding: "12px 24px",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    background: "transparent",
                                    border: "1px solid #4d2618",
                                    color: "#4d2618",
                                    borderRadius: "4px",
                                }}
                            >
                                BACK TO HOME
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
