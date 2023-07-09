import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DriverLogin() {

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        if (email && password) {
            try {
                // const response = await axios.post("http://localhost:5000/login", user);
                const response = await axios({
                    method: "post",
                    url: `http://localhost:5000/driverlogin`,
                    params: {

                    },
                    data: user
                })
                console.log(response.data);
                navigate("/");
            }
            catch (err) {
                throw new Error('Unable to get a token.')
            }
        }
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" value={user.email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" type="password" value={user.password} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p>Haven't any account? <Link to="/driversignup" >Sign Up</Link></p>
            </form>
        </div>
    )
};