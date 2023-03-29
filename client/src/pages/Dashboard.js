import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

    const [query, setQuery] = useState([]);

    const navigate = useNavigate();

    const GetQuery = async function () {
        try {
            const response = await axios.get("http://localhost:5000/getquery");
            console.log(response.data);
            setQuery(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const CloseQuery = async function (dr_email) {
        try {
            // const response = await axios.get("http://localhost:5000");
            const response = await axios({
                method: "post",
                url: `http://localhost:5000/closequery`,
                params: {
                },
                data: { dr_email: dr_email }
            });
            console.log(response.data.message);
            window.location.reload(true);
        }
        catch (err) {
            throw (err);
        }
    }

    const ShowQuery = function ({ data }) {
        console.log(data.length);
        return (<>
            {data && data.map((item, index) => {
                const base64String = btoa(
                    String.fromCharCode(...new Uint8Array((item.img.data.data)))
                );
                return (<div class="card col-lg-4" >
                    <img src={`data:image/png;base64,${base64String}`} class="card-img-top" alt="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" />
                    <div class="card-body text-center">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button value={item.dr_email} onClick={(e) => CloseQuery(e.target.value)} class="btn btn-primary" disabled={!item.is_open}>{item.is_open ? "Active" : "Resolved"}</button>
                    </div>
                </div>)
            })
            }
        </>);
    }

    useEffect(() => {
        GetQuery();
    }, []);

    return (<>
        <Header />
        <div class="row">
            <ShowQuery data={query} />
        </div>
        <Footer />
    </>);
}