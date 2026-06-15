"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { IoTrashOutline } from 'react-icons/io5';
import Link from 'next/link';

const CartCard = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    return (
        <div className="cart-card">
            <Link href={`/product/${item.id}`} className="cart-card-image">
                <Image src={item.image} alt={item.name} fill sizes="120px" style={{ objectFit: 'cover' }} />
            </Link>

            <div className="cart-card-details">
                <div className="brand-tag">Abeer.label</div>
                <Link href={`/product/${item.id}`} className="cart-card-title">{item.name}</Link>
                <div className="cart-card-variant">Size: {item.size}</div>
                <div className="pd-qty-control cart-qty-control" style={{ marginTop: '12px' }}>
                    <button className="pd-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                    <span className="pd-qty-val">{quantity}</span>
                    <button className="pd-qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
            </div>

            <div className="cart-card-footer">
                <button className="cart-card-remove" aria-label="Remove item">
                    <IoTrashOutline /> REMOVE
                </button>
                <div className="cart-card-price">
                    ₹{(item.price * quantity).toLocaleString('en-IN')}
                </div>
            </div>
        </div>
    )
}

export default CartCard;