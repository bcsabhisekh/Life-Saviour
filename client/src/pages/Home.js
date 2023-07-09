import React from "react";
import './Home.css';
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Body from "../components/Body.js";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import UserLogin from "./UserLogin.js";
import Hero from "../components/images/hero.jpg";
import Hospital from "../components/images/hospital.jpg";
import Map from "../components/images/map.jpg";
import Notification from "../components/images/notification.jpg";
import Oauth from "../components/images/oauth.jpg";
import Driver from "../components/images/driver.png"
import Victim from "../components/images/victim.png"
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";

export default function Home() {

    axios.defaults.withCredentials = true;

    const [user, setUser] = useContext(UserContext);

    const logOut = async function (event) {
        await axios.get('http://localhost:5000/logout').then((res) => { alert(res.data.message); window.location.reload(); }).catch((err) => console.log(err))
    }


    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row items">
                    <div class="col-md-6">
                        <img src={Hero} class="img-fluid" alt="..." />
                    </div>
                    <div class="col-md-6 d-flex justify-content-center align-middle">
                        <div>
                            <div className="p-5 text-center">
                                <h3>Having any emergency, just use my services we are working for you</h3>
                            </div>
                            <div className="text-center">
                                {Object.keys(user).length > 0 ? <><button type="button" onClick={logOut} class="btn btn-dark m-2">Log Out</button></> : <><button type="button" onClick={() => navigate("/usersignup")} class="btn btn-success m-2">Sign Up</button>
                                    <button type="button" onClick={() => navigate("/userlogin")} class="btn btn-dark m-2">Sign In</button></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="items">
                    <div className="text-center features">
                        <h2>Features</h2>
                    </div>
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={Hospital} className="img-fluid" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={Map} className="img-fluid" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={Notification} className="img-fluid" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={Oauth} className="img-fluid" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="items">
                        <div className="services text-center">
                            <h2>Services</h2>
                        </div>
                        <div className="row text-center">
                            <div className="col-md-6 ">
                                <div className="card m-4 card-item">
                                    <img src={Victim} className="rounded mx-auto d-block w-50" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Victim</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="/userlogin" className="btn btn-dark">Get Started</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card m-4 card-item">
                                    <img src={Driver} className="rounded mx-auto d-block w-50" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Driver</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="/userlogin" className="btn btn-dark">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};