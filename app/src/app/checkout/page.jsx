"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoCheckmarkCircle, IoRadioButtonOn, IoRadioButtonOff } from 'react-icons/io5';
import { LiaEditSolid } from "react-icons/lia";
import TopHeader from "@/components/pages/TopHeader";
import OrderSummary from "@/components/pages/OrderSummary";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

const page = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [promoCode, setPromoCode] = useState('');
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('razorpay');

    const router = useRouter();
    const { items: cartItems, removeCartItem, loadCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();
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

    // Map Zustand cart items to the flat structure expected by OrderSummary
    const checkoutItems = cartItems.map((item, idx) => {
        const product = item.product || {};
        const productId = product._id || product.id || idx;
        const imageUrl = product.images?.[0]?.url || product.images?.[0] || product.image || item.image || "";
        return {
            id: `${productId}-${item.size}`, // unique key for checkout tracking
            productId,
            name: product.name || item.name || "Product Name",
            price: product.price || item.price || 0,
            size: item.size,
            quantity: item.quantity,
            image: imageUrl
        };
    });

    // If cart is empty, redirect to cart page
    useEffect(() => {
        if (isHydrated && isAuthenticated && checkoutItems.length === 0) {
            router.push('/cart');
        }
    }, [isHydrated, isAuthenticated, checkoutItems.length, router]);

    if (!isHydrated || !isAuthenticated || checkoutItems.length === 0) {
        return null;
    }

    const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    let shippingCost = 0;
    if (shippingMethod === 'standard') {
        shippingCost = subtotal > 5000 ? 0 : 150;
    } else if (shippingMethod === 'express') {
        shippingCost = 350;
    } else if (shippingMethod === 'sameday') {
        shippingCost = 500;
    }

    const total = subtotal + shippingCost;

    const removeItem = (id) => {
        const target = checkoutItems.find(item => item.id === id);
        if (target) {
            removeCartItem(target.productId, target.size);
        }
    };

    return (
        <div className="pages">
            <TopHeader
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout', href: null }]}
            />
            <div className="shop-page-wrapper">
                <div className="container">
                    <div className="checkout-layout">

                        <div className="checkout-stepper-section">

                            <div className={`checkout-step ${activeStep >= 1 ? 'active' : ''}`}>
                                <div className="step-header" onClick={() => setActiveStep(1)}>
                                    <div className="step-header-left">
                                        <div className="step-number">{activeStep > 1 ? <IoCheckmarkCircle /> : '1'}</div>
                                        <h3 className="step-title">Contact & Delivery Details</h3>
                                    </div>
                                    {activeStep > 1 && <span className="step-edit-icon"><LiaEditSolid /></span>}
                                </div>
                                {activeStep === 1 && (
                                    <div className="step-content">
                                        <div className="form-grid">
                                            <div className="form-group full-width">
                                                <input type="email" placeholder="Email Address" className="co-input" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="First Name" className="co-input" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Last Name" className="co-input" />
                                            </div>
                                            <div className="form-group full-width">
                                                <input type="text" placeholder="Address" className="co-input" />
                                            </div>
                                            <div className="form-group full-width">
                                                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="co-input" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="City" className="co-input" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Postal Code" className="co-input" />
                                            </div>
                                            <div className="form-group full-width">
                                                <input type="tel" placeholder="Phone Number" className="co-input" />
                                            </div>
                                        </div>
                                        <button className="button-primary step-next-btn" onClick={() => setActiveStep(2)}>
                                            Continue to Shipping
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className={`checkout-step ${activeStep >= 2 ? 'active' : ''}`}>
                                <div className="step-header" onClick={() => activeStep >= 2 && setActiveStep(2)}>
                                    <div className="step-header-left">
                                        <div className="step-number">{activeStep > 2 ? <IoCheckmarkCircle /> : '2'}</div>
                                        <h3 className="step-title">Shipping Method</h3>
                                    </div>
                                    {activeStep > 2 && <span className="step-edit-icon"><LiaEditSolid /></span>}
                                </div>
                                {activeStep === 2 && (
                                    <div className="step-content">
                                        <div className="shipping-methods">
                                            <label className={`radio-tile ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                                                <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="hidden-radio" />
                                                <div className="radio-icon">{shippingMethod === 'standard' ? <IoRadioButtonOn /> : <IoRadioButtonOff />}</div>
                                                <div className="radio-content">
                                                    <span className="radio-title">Standard Shipping</span>
                                                    <span className="radio-desc">3-5 Business Days</span>
                                                </div>
                                                <span className="radio-price">{subtotal > 5000 ? 'Free' : '₹150'}</span>
                                            </label>

                                            <label className={`radio-tile ${shippingMethod === 'express' ? 'selected' : ''}`}>
                                                <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="hidden-radio" />
                                                <div className="radio-icon">{shippingMethod === 'express' ? <IoRadioButtonOn /> : <IoRadioButtonOff />}</div>
                                                <div className="radio-content">
                                                    <span className="radio-title">Express Shipping</span>
                                                    <span className="radio-desc">1-2 Business Days</span>
                                                </div>
                                                <span className="radio-price">₹350</span>
                                            </label>

                                            <label className={`radio-tile ${shippingMethod === 'sameday' ? 'selected' : ''}`}>
                                                <input type="radio" name="shipping" value="sameday" checked={shippingMethod === 'sameday'} onChange={() => setShippingMethod('sameday')} className="hidden-radio" />
                                                <div className="radio-icon">{shippingMethod === 'sameday' ? <IoRadioButtonOn /> : <IoRadioButtonOff />}</div>
                                                <div className="radio-content">
                                                    <span className="radio-title">Same Day Delivery</span>
                                                    <span className="radio-desc">Order before 12 PM</span>
                                                </div>
                                                <span className="radio-price">₹500</span>
                                            </label>
                                        </div>
                                        <button className="button-primary step-next-btn" onClick={() => setActiveStep(3)}>
                                            Continue to Payment
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className={`checkout-step ${activeStep >= 3 ? 'active' : ''}`}>
                                <div className="step-header" onClick={() => activeStep >= 3 && setActiveStep(3)}>
                                    <div className="step-header-left">
                                        <div className="step-number">3</div>
                                        <h3 className="step-title">Payment Method</h3>
                                    </div>
                                </div>
                                {activeStep === 3 && (
                                    <div className="step-content">
                                        <p className="payment-desc">All transactions are secure and encrypted.</p>
                                        <div className="payment-methods">

                                            <label className={`payment-tile ${paymentMethod === 'razorpay' ? 'selected' : ''}`}>
                                                <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="hidden-radio" />
                                                <div className="payment-tile-header">
                                                    <div className="radio-icon">{paymentMethod === 'razorpay' ? <IoRadioButtonOn /> : <IoRadioButtonOff />}</div>
                                                    <span className="payment-name">Razorpay (Cards, UPI, NetBanking)</span>
                                                </div>
                                            </label>

                                            <label className={`payment-tile ${paymentMethod === 'cashfree' ? 'selected' : ''}`}>
                                                <input type="radio" name="payment" value="cashfree" checked={paymentMethod === 'cashfree'} onChange={() => setPaymentMethod('cashfree')} className="hidden-radio" />
                                                <div className="payment-tile-header">
                                                    <div className="radio-icon">{paymentMethod === 'cashfree' ? <IoRadioButtonOn /> : <IoRadioButtonOff />}</div>
                                                    <span className="payment-name">Cashfree Payments</span>
                                                </div>
                                            </label>

                                            <label className={`payment-tile ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                                                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="hidden-radio" />
                                                <div className="payment-tile-header">
                                                    <div className="radio-icon">{paymentMethod === 'upi' ? <IoRadioButtonOn /> : <IoRadioButtonOff />}</div>
                                                    <span className="payment-name">Direct UPI</span>
                                                </div>
                                            </label>

                                            <label className={`payment-tile ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                                                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden-radio" />
                                                <div className="payment-tile-header">
                                                    <div className="radio-icon">{paymentMethod === 'cod' ? <IoRadioButtonOn /> : <IoRadioButtonOff />}</div>
                                                    <span className="payment-name">Cash on Delivery (COD)</span>
                                                </div>
                                            </label>

                                        </div>
                                        <button className="button-primary step-next-btn pay-btn">
                                            PAY ₹{total.toLocaleString('en-IN')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="checkout-summary-section">
                            <OrderSummary
                                items={checkoutItems}
                                removeItem={removeItem}
                                subtotal={subtotal}
                                shipping={shippingCost}
                                total={total}
                                promoCode={promoCode}
                                setPromoCode={setPromoCode}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;