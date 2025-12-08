import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-[#F0F4F7] text-primary p-10">
            <aside>
                <Logo></Logo>
                <p className="font-bold">
                    Garments Order & Production Tracker System
                    <br />
                    Providing reliable service since 2005
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <FaFacebookF />
                    </a>
                    <a>
                        <FaInstagram />
                    </a>
                    <a>
                        <FaXTwitter />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;