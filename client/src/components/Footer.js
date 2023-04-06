import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Facebook from "../components/images/facebook.png";
import Instagram from "../components/images/instagram.png";
import Twitter from "../components/images/twitter.png";
import Linkedin from "../components/images/linkedin.png";
import Gmail from "../components/images/gmail.png";
import "./Footer.css";

export default function Footer() {
    return (
        <section id="footer">
            <div className="pt-5">
                <footer className="text-center text-white" style={{ backgroundColor: "white" }}>
                    <div className="d-block mx-auto text-dark">
                        <h3>Contact Us</h3>
                    </div>
                    <div className="container pt-4">
                        <section className="mb-4 d-block mx-auto">
                            <a className="link-item" href="#"><img className="image-item" src={Instagram} /></a>
                            <a className="link-item" href="#"><img className="image-item" src={Facebook} /></a>
                            <a className="link-item" href="#"><img className="image-item" src={Linkedin} /></a>
                            <a className="link-item" href="#"><img className="image-item" src={Twitter} /></a>
                            <a className="link-item" href="#"><img className="image-item" src={Gmail} /></a>
                        </section>
                    </div>
                    <div className="text-center text-light p-2 bg-black">
                        © 2023 Copyright -
                        <a className="lasttag" href="mailto:abhisheky3813@gmail.com">&nbsp;Abhisekh Yadav</a>
                    </div>
                </footer>
            </div >
        </section>
    )
};