import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { CiMail } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from 'react-icons/fa';

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
                    <a href='https://github.com/chyrafsan35' target='_blank'>
                        <FaGithub />
                    </a>
                    <a href='https://www.instagram.com/chy_rafsan35/' target='_blank'>
                        <FaInstagram />
                    </a>
                    <a href='mailto:mrcplabon@gmail.com' target='_blank'>
                        <CiMail />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;