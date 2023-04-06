import React from "react";
import Logo from "./images/logo.jpg";
import './Header.css';
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <div>
            <section id="navigation">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={Logo} alt="" width="60" height="60" />
                            <a className="navbar-brand heading fs-2 align-middle ms-3" href="#">Life Saviour</a>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ">
                                <NavLink to="/" className="nav-link active fs-5">Home</NavLink>
                                <NavLink to="/dashboard" className="nav-link active fs-5">Dashboard</NavLink>
                                <NavLink to="/query" className="nav-link active fs-5">Emergency</NavLink>
                                <a className="nav-link active fs-5" href="#footer">Contact</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
        </div >
    )
};