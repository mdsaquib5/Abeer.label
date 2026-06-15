"use client";
import { useState, useEffect } from "react";
import { BsFlower2 } from "react-icons/bs";
import { IoBagOutline, IoCloseOutline, IoPersonOutline } from "react-icons/io5";
import { HiOutlineMenuAlt2, HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../shared/Logo";
import Nav from "../shared/Nav";
import Link from "next/link";

const taglines = [
    "Slow Fashion",
    "Sustainable Choice",
    "Made With Care",
    "Wear Your Soul",
    "Modern Desi Muse",
    "Quiet Luxury",
    "Handcrafted Details",
    "Timeless Silhouettes",
    "Premium Ethnic Wear",
    "Nostalgic Yet Contemporary"
];

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header>
            <div className="top-bar">
                <div className="marquee">
                    <div className="marquee-content">
                        {taglines.map((tagline, index) => (
                            <div className="marquee-item" key={`orig-${index}`}>
                                <span>{tagline}</span>
                                <BsFlower2 className="flower-icon" />
                            </div>
                        ))}
                    </div>
                    <div className="marquee-content" aria-hidden="true">
                        {taglines.map((tagline, index) => (
                            <div className="marquee-item" key={`dup-${index}`}>
                                <span>{tagline}</span>
                                <BsFlower2 className="flower-icon" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`main-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <div className="header-container">
                        <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(true)}>
                            <HiOutlineMenuAlt2 />
                        </div>
                        <div className="navbar">
                            <Nav />
                        </div>
                        <div className="logo-bar">
                            <Logo />
                        </div>
                        <div className="cart-icon">
                            <Link href={'/login'}> <IoPersonOutline /> </Link>
                            <Link href={'/cart'}> <IoBagOutline /> </Link>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="mobile-menu-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            className="mobile-menu-drawer"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                        >
                            <div className="drawer-header">
                                <Logo />
                                <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
                                    <IoCloseOutline />
                                </button>
                            </div>

                            <div className="drawer-content">
                                <Nav onClose={() => setIsMenuOpen(false)} />
                            </div>

                            <div className="drawer-footer">
                                <span className="drawer-tagline">Desi Maximalism</span>
                                <div className="social-links">
                                    <Link href="#"><FaWhatsapp /></Link>
                                    <Link href="#"><FaInstagram /></Link>
                                    <Link href="#"><HiOutlineMail /></Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header;