import React , { useRef }from "react";
import "./navbar.css";
import {Link} from "react-router-dom";
import { CircleUserRound } from "lucide-react";

function Navbar() {
    const hamburger = useRef(null);
    const navMenu = useRef(null);


    function mobileMenu() {
        hamburger.current.classList.toggle("active");
        navMenu.current.classList.toggle("active");
    }

    const navLink = document.querySelectorAll(".nav-links li a ");

    navLink.forEach(n => n.addEventListener("click", closeMenu));

    function closeMenu() {
        hamburger.current.classList.remove("active");
        navMenu.current.classList.remove("active");
    }

    return (
    <header className="header">
        <nav className="navbar">
            <Link to={""} className="logo">Pomo</Link>
            <ul className="nav-links">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/pomo"}>Pomodoro</Link></li>
                <li><Link to={"/dashboard"}>Settings</Link></li>
                <li><Link to={"/dashboard"}><CircleUserRound size={35} color="white"/></Link></li>
            </ul>
            <div className="hamburger" ref={hamburger} onClick={mobileMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
        <div className="slide_menu" ref={navMenu}>
            <ul className="nav-links2">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/pomo"}>Pomodoro</Link></li>
                <li><Link to={"/dashboard"}>Settings</Link></li>
                <li><Link to={"/dashboard"}><CircleUserRound size={35} color="white"/></Link></li>
            </ul>
        </div>
    </header>
    )
}



function NavbarOut() {
    return (
    <header className="header-o">
        <nav className="navbar-o">
            <Link to={""} className="logo">Pomo</Link>
            <ul className="nav-links-o">
                <li><Link to={"/login"}><CircleUserRound color="white" size={35}/></Link></li>
            </ul>
        </nav>
    </header>
    )
}


export {Navbar , NavbarOut};
