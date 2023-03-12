import React from "react";
import './Home.css';
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Body from "../components/Body.js";
import axios from "axios";
import { useState, useEffect } from "react";
import Login from "./Login";

export default function Home() {

    const [data, setData] = useState([]);

    const fetchImage = async function () {
        try {
            const response = await axios.get("http://localhost:5000/");
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchImage();
        // axios.get("http://localhost:5000/").then((res) => setData(res.data)).catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <Header />
            {
                data && data.map((item) => {
                    const base64String = btoa(
                        String.fromCharCode(...new Uint8Array((item.img.data.data)))
                    );
                    return (<img src={`data:image/png;base64,${base64String}`} />);
                })
            }
            <Footer />
        </div>
    )
};