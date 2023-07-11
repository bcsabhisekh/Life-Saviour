import { React, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Query.css";
import axios from "axios";
import { UserContext } from "../App";
import LoadingSpinner from "./LoadingSpinner";


export default function Query() {

    axios.defaults.withCredentials = true;

    const date = new Date();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useContext(UserContext);

    const [detail, setDetail] = useState({
        description: ""
    });

    const [location, setLocation] = useState({ lat: "", log: "" });

    const [file, setFile] = useState(null);

    const onInputChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetail((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function showPosition(position) {
        const obj = { lat: position.coords.latitude, log: position.coords.longitude };
        setLocation(obj);
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Please allow to procees");
            navigate("/drag");
        }
    }

    useEffect((e) => {
        getLocation();
    }, []);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("testImage", file);
        formData.append("description", detail.description);
        formData.append("email", user.email);
        formData.append("mobile", user.mobile);
        formData.append("lat", location.lat);
        formData.append("log", location.log);
        formData.append("user_name", user.name);
        formData.append("name", date.toISOString());
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        const url = "http://localhost:5000/query";
        try {
            if (detail.description !== "Select") {
                const response = await axios.post(url, formData, config);
                // console.log(response.data);
                // console.log(response);
            }
            else {
                alert("Please Select a Valid Option");
            }
            navigate("/dashboard");
            setIsLoading(false);
        }
        catch (err) {
            setIsLoading(false);
            throw new Error('Unable to get a token.')
        }
    }

    return (
        <>
            <Header />
            <>{isLoading ? <LoadingSpinner /> :
                <div className="container-fluid">
                    <div className="items">
                        <form onSubmit={onFormSubmit}>
                            <div className="inneritem shadow pb-5">
                                <div className="text-center pb-5 pt-5">
                                    <h2>Book Emergency</h2>
                                </div>
                                <div className="row ">
                                    <div className="mb-3 col-md-6 mx-auto">
                                        <label for="exampleInputDescription" className="form-label">Description</label>
                                        {/* <input autocomplete="off" name="description" type="text" value={detail.description} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" /> */}
                                        <label className="ms-3 label-sm">
                                            <select name="description" className="form-select mt-2" value={detail.description} onChange={handleChange}>
                                                <option value="Select">Select</option>
                                                <option value="accident">Accident</option>
                                                <option value="accident">Dengue Fever</option>
                                                <option value="accident">Corona Fever</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="mb-3 col-md-6 mx-auto">
                                        <label for="exampleInputAddress" className="form-label">Current Location</label>
                                        <input autocomplete="off" name="location" type="text" value={location.lat && location.lat + ',' + location.log} className="form-control" id="exampleInputLocation" aria-describedby="locationHelp" />
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="mb-3 col-md-6 mx-auto">
                                        <label for="exampleInputImage" className="form-label">Image Upload</label>
                                        <input type={'file'} name="testImage" onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="text-center p-3">
                                    <button type="submit" className="btn btn-info">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >}</>
            <Footer />
        </>
    );
}