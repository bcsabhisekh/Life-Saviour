import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import DashboardImage from "../components/images/dashboard.png";


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
        return (
            <div>
                <div className="text-center pb-5">
                    <h1 className="text-info" style={{ fontWeight: "1000" }}>Previous Requests</h1>
                </div>
                <div className="row">
                    {data && data.map((item, index) => {
                        const base64String = btoa(
                            String.fromCharCode(...new Uint8Array((item.img.data.data)))
                        );
                        return (<div className="card col-lg-4 mx-auto p-3 m-3" style={{ width: "18rem" }}>
                            <img src={`data:image/png;base64,${base64String}`} className="card-img-top mx-auto" alt="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" />
                            <div className="card-body text-center">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <button value={item.dr_email} onClick={(e) => CloseQuery(e.target.value)} className="btn btn-info" disabled={!item.is_open}>{item.is_open ? "Active" : "Resolved"}</button>
                            </div>
                        </div>);
                    })
                    }
                </div>
            </div>
        );
    }

    const EmptyDashboard = function () {
        return (<div className="vh-100 pb-5">
            <div className="text-center pb-5">
                <h1 className="text-info" style={{ fontWeight: "1000" }}>You haven't made any request earlier...</h1>
            </div>
            <div className="text-center pb-3">
                <img src={DashboardImage} className="img-fluid w-40" alt="..." />
            </div>
            <div className="text-center pt-5 ">
                <button type="button" onClick={() => navigate('/')} class="btn btn-success">Back to Home</button>
            </div>
        </div>)
    }

    useEffect(() => {
        GetQuery();
    }, []);

    return (<>
        <Header />
        <div className="container-fluid">
            <div className="items">
                {query.length > 0 ? <ShowQuery data={query} /> : <EmptyDashboard />}
            </div>
        </div>
        <Footer />
    </>);
}