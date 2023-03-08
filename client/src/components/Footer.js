import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
    return (
        <div>
            <footer className="bg-light text-center text-white">
                <div className="container p-4 pb-0">
                    <section class="mb-4">
                        <a
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#3b5998;" }}
                            href="#!"
                            role="button"
                        ><FontAwesomeIcon icon="fa-brands fa-facebook" /></a>
                        <a
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#55acee;" }}
                            href="#!"
                            role="button"
                        ><FontAwesomeIcon icon="fa-brands fa-twitter" /></a>
                        <a
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#dd4b39;" }}
                            href="#!"
                            role="button"
                        ><FontAwesomeIcon icon="fa-brands fa-google" /></a>
                        <a
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#ac2bac;" }}
                            href="#!"
                            role="button"
                        ><FontAwesomeIcon icon="fa-brands fa-instagram" /></a>
                        <a
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#0082ca;" }}
                            href="#!"
                            role="button"
                        ><FontAwesomeIcon icon="fa-brands fa-linkedin" /></a>
                        <a
                            className="btn text-white btn-floating m-1"
                            style={{ backgroundColor: "#333333;" }}
                            href="#!"
                            role="button"
                        ><FontAwesomeIcon icon="fa-brands fa-github" /></a>
                    </section>
                </div>
                <div className="text-center p-3" style={{ backgroundColor: "black" }}>
                    © 2020 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
            </footer >
        </div >
    )
};