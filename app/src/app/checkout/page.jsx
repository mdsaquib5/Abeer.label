"use client";
import React, { useState } from 'react';
import { IoCheckmarkCircle, IoRadioButtonOn, IoRadioButtonOff } from 'react-icons/io5';
import { LiaEditSolid } from "react-icons/lia";
import TopHeader from "@/components/pages/TopHeader";
import OrderSummary from "@/components/pages/OrderSummary";

const dummyItems = [
    {
        id: '1',
        name: 'Geet Farshi Set 2 Piece',
        price: 4499,
        size: 'M',
        quantity: 1,
        image: 'https://res.cloudinary.com/dhufjjp9t/image/upload/v1780991430/nargis-profile_mbalmc.jpg'
    },
    {
        id: '2',
        name: 'Floral Affaire — Nargis',
        price: 3299,
        size: 'L',
        quantity: 2,
        image: 'https://res.cloudinary.com/dhufjjp9t/image/upload/v1780991430/nargis-profile_mbalmc.jpg'
    }
];

const page = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [items, setItems] = useState(dummyItems);
    const [promoCode, setPromoCode] = useState('');
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('razorpay');

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
        setItems(items.filter(item => item.id !== id));
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
                                items={items}
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