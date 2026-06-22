"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopHeader from "@/components/pages/TopHeader";
import CartCard from "@/components/pages/CartCard";
import CartTotal from "@/components/pages/CartTotal";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

const CartPage = () => {
    const { items, loadCart, isLoading } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated && !isAuthenticated) {
            router.push('/login');
        }
    }, [isHydrated, isAuthenticated, router]);

    useEffect(() => {
        if (isHydrated && isAuthenticated) {
            loadCart();
        }
    }, [isHydrated, isAuthenticated, loadCart]);

    if (!isHydrated || !isAuthenticated) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="pages">
                <TopHeader
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: null }]}
                />
                <div className="shop-page-wrapper">
                    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
                        <div style={{ color: "var(--white)", opacity: 0.6, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Loading your bag details...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="pages">
                <TopHeader
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: null }]}
                />
                <div className="shop-page-wrapper">
                    <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", gap: "20px" }}>
                        <h2 style={{ color: "var(--white)", fontFamily: "var(--font-cinzel)" }}>Your Bag is Empty</h2>
                        <p style={{ color: "var(--accent)", fontSize: "14px" }}>Add some premium ethnic collections to your wardrobe.</p>
                        <Link href="/shop" className="button-primary" style={{ padding: "12px 28px", textDecoration: "none", display: "inline-block" }}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pages">
            <TopHeader
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: null }]}
            />
            <div className="shop-page-wrapper">
                <div className="container">
                    <div className="cart-layout">
                        <div className="cart-items-section">
                            {items.map((item, idx) => {
                                const productId = item.product?._id || item.product?.id || idx;
                                return (
                                    <CartCard key={`${productId}-${item.size}`} item={item} />
                                );
                            })}
                        </div>

                        <div className="cart-summary-section">
                            <CartTotal items={items} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;