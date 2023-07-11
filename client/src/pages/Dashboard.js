import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import DashboardImage from "../components/images/dashboard.png";
import { UserContext } from "../App.js";
import LoadingSpinner from "./LoadingSpinner";
import { io } from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:5000");


export default function Dashboard() {

    axios.defaults.withCredentials = true;

    const [query, setQuery] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useContext(UserContext);

    const [meet, setMeet] = useState({});

    const navigate = useNavigate();

    const [showChat, setShowChat] = useState(false);

    const joinRoom = (event) => {
        if (event.target.name !== "" && event.target.value !== "") {
            socket.emit("join_room", event.target.value);
            setShowChat(true);
            const obj = new Object({ username: event.target.name, room: event.target.value });
            setMeet(obj);
        }
    }

    const GetQuery = async function () {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/getquery/${user.email}/${user.role}`);
            // console.log(response.data);
            setQuery(response.data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    }

    const CloseQuery = async function (dr_email) {
        setIsLoading(true);
        try {
            // const response = await axios.get("http://localhost:5000");
            const response = await axios({
                method: "post",
                url: `http://localhost:5000/closequery`,
                params: {
                },
                data: { dr_email: dr_email }
            });
            // console.log(response.data.message);
            setIsLoading(false);
            window.location.reload();
        }
        catch (err) {
            setIsLoading(false);
            throw (err);
        }
    }

    const ShowPublic = function ({ dr_email, dr_mobile, hospital }) {
        return (<div className="text-center">
            <h5 className="card-title">Ambulance Detail</h5>
            <p><b>Driver No. - </b>{dr_mobile}</p>
            <p><b>Driver Email -</b>{dr_email}</p>
            <p><b>Hospital Name - </b>{hospital}</p>
        </div>);
    }


    const ShowAmbulance = function ({ user_address, user_email, user_mobile, user_name }) {
        return (
            <div className="text-center">
                <h5 className="card-title">Patient Detail</h5>
                <p><b>Patient - </b>{user_name}</p>
                <p><b>Patient Email -</b>{user_email}</p>
                <p><b>Patient No - </b>{user_mobile}</p>
                <p><b>Patient Loc - </b>{user_address}</p>
            </div>);
    }


    const ShowQuery = function ({ data }) {
        // console.log(data.length);
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
                                {user.role === "Ambulance" ? <><ShowAmbulance user_address={item.user_address} user_email={item.user_email} user_mobile={item.user_mobile} user_name={item.user_name} />
                                    <button name={item.dr_name} value={item.id} onClick={joinRoom} className="btn btn-info" disabled={!item.is_open}>Chat with Patient</button>
                                </> : <><ShowPublic dr_email={item.dr_email} dr_mobile={item.dr_mobile} hospital={item.hospital} />
                                    <button value={item.dr_email} onClick={(e) => CloseQuery(e.target.value)} className="btn btn-info m-2" disabled={!item.is_open}>{item.is_open ? "Active" : "Resolved"}</button>
                                    <button name={item.user_name} value={item.id} onClick={joinRoom} className="btn btn-info" disabled={!item.is_open}>Chat with Doctor</button></>}
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
        <>{isLoading ? < LoadingSpinner /> : <>{showChat ? <Chat socket={socket} username={meet.username} room={meet.room} /> : <div className="container-fluid">
            <div className="items">
                {query.length > 0 ? <ShowQuery data={query} /> : <EmptyDashboard />}
            </div>
        </div>}</>}</>
        <Footer />
    </>);
}