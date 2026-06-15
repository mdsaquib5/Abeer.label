"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { IoHomeOutline } from 'react-icons/io5';
import Form from "@/components/pages/Form";

const page = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="pages">
            <div className="shop-page-wrapper login-bg">
                <Link href="/" className="auth-home-btn" aria-label="Go to Home">
                    <IoHomeOutline />
                </Link>
                <div className="container">
                    <Form isLogin={isLogin} setIsLogin={setIsLogin} />
                </div>
            </div>
        </div>
    )
}

export default page;