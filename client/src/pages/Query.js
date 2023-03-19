import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Query() {

    const date = new Date();

    const navigate = useNavigate();

    const [detail, setDetail] = useState({
        description: "",
        mobile: "",
        email: "",
        name: "",
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
        const formData = new FormData();
        formData.append("testImage", file);
        formData.append("description", detail.description);
        formData.append("email", detail.email);
        formData.append("mobile", detail.mobile);
        formData.append("lat", location.lat);
        formData.append("log", location.log);
        formData.append("user_name", detail.name);
        formData.append("name", date.toISOString());
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        const url = "http://localhost:5000/upload";
        try {
            const response = await axios.post(url, formData, config);
            console.log(response.data);
            navigate("/");
        }
        catch (err) {
            throw new Error('Unable to get a token.')
        }
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <label for="exampleInputDescription" className="form-label">Description</label>
                    <input autocomplete="off" name="description" type="text" value={detail.description} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputAddress" className="form-label">Current Location</label>
                    <input autocomplete="off" name="location" type="text" value={location.lat && location.lat + ',' + location.log} className="form-control" id="exampleInputLocation" aria-describedby="locationHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputImage" className="form-label">Image Upload</label>
                    <input type={'file'} name="testImage" onChange={onInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}