"use client";
import React, { useState } from 'react';
import NavLink from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { useMediaQuery } from 'react-responsive';

const Nav = ({ onClose }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1200px)' });

    const toggleDropdown = (e) => {
        if (isTabletOrMobile) {
            e.preventDefault();
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const handleLinkClick = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <nav className="main-nav">
            <ul className="nav-list">
                <li>
                    <NavLink href="/shop" onClick={handleLinkClick}>Shop</NavLink>
                </li>
                <li className="dropdown-wrapper" onMouseLeave={() => setIsDropdownOpen(false)}>
                    <NavLink
                        href="/shop"
                        onClick={toggleDropdown}
                        className="dropdown-trigger"
                    >
                        Collection <FiChevronDown className="chevron-icon" />
                    </NavLink>

                    <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
                        <ul className="dropdown-list">
                            <li style={{ '--delay': '1' }}>
                                <NavLink href="/shop" onClick={handleLinkClick}>Basant Bahaar</NavLink>
                            </li>
                            <li style={{ '--delay': '2' }}>
                                <NavLink href="/shop" onClick={handleLinkClick}>Nargis</NavLink>
                            </li>
                            <li style={{ '--delay': '3' }}>
                                <NavLink href="/shop" onClick={handleLinkClick}>Noor</NavLink>
                            </li>
                            <li style={{ '--delay': '4' }}>
                                <NavLink href="/shop" onClick={handleLinkClick}>Qala</NavLink>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;