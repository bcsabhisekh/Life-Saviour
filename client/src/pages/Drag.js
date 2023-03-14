import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Drag() {
    const navigate = useNavigate();

    const [detail, setDetail] = useState({
        description: ""
    });

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

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("testImage", file);
        formData.append("detail", detail.description);
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
                    <input name="description" type="text" value={detail.description} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputImage" className="form-label">Image Upload</label>
                    <input type={'file'} name="testImage" onChange={onInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}