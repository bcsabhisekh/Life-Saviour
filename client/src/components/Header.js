import React from "react";
import Logo from "./images/logo.jpg";

export default function Header() {
    return (
        <div>
            <section id="navigation">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={Logo} alt="" width="50" height="50" />
                        </a>
                        <a className="navbar-brand" href="#">Life Saviour</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                                <a className="nav-link" href="#">Features</a>
                                <a className="nav-link" href="#">Pricing</a>
                                <a className="nav-link" href="#">Disabled</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
            <section id="title">
            </section>
        </div>
    )
};