import { React, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./UserLogin.css";
import { UserContext } from "../App";
import LoadingSpinner from "./LoadingSpinner";

export default function UserLogin() {

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { email, password, role } = data;
        if (email && password && role == "Ambulance") {
            try {
                // const response = await axios.post("http://localhost:5000/login", data);
                const response = await axios({
                    method: "post",
                    url: `http://localhost:5000/driverlogin`,
                    params: {

                    },
                    data: data
                })
                if (response.status == 200) {
                    const obj = new Object({
                        name: response.data.name,
                        mobile: response.data.mobile,
                        role: "Ambulance",
                        email: response.data.email
                    });
                    setUser(obj);
                    alert("Valid authentication");
                }
                navigate("/dashboard");
            }
            catch (err) {
                alert(response.data.message);
                navigate("/dashboard");
            }
        }
        else if (email && password && role == "Public") {
            try {
                // const response = await axios.post("http://localhost:5000/login", data);
                const response = await axios({
                    method: "post",
                    url: `http://localhost:5000/userlogin`,
                    params: {

                    },
                    data: data
                })
                if (response.status == 200) {
                    const obj = new Object({
                        name: response.data.name,
                        mobile: response.data.mobile,
                        role: "Public",
                        email: response.data.email
                    });
                    setUser(obj);
                    alert("Valid authentication");
                }
                navigate("/dashboard");
            }
            catch (err) {
                alert(response.data.message);
                navigate("/dashboard");
            }
            setIsLoading(false);
        }
        else {
            alert("Please complete all the fields...");
            setIsLoading(false);
        }
    }

    const options = ['Public', 'Ambulance'];

    return (
        <>
            <Header />
            <div className="container-fluid">
                <>{isLoading ? <LoadingSpinner /> : <div className="items">
                    <form onSubmit={onFormSubmit} >
                        <div className="inneritem shadow pb-5">
                            <div className="text-center pb-4 pt-5">
                                <h2>User LogIn</h2>
                            </div>
                            <div className="row ">
                                <div className="mb-3 col-md-6 mx-auto">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input autoComplete="off" name="email" type="email" value={data.email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                            </div>
                            <div className="row  ">
                                <div className="mb-3 col-md-6 mx-auto">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input autoComplete="off" name="password" type="password" value={data.password} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6 mx-auto">
                                    <label>
                                        Pick a Role:
                                        <select name="role" className="form-select mt-2" value={data.role} onChange={handleChange}>
                                            <option value="Select">Select</option>
                                            {options.map((item, index) => {
                                                return <option value={item} key={index} >
                                                    {item}
                                                </option>
                                            })}
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="text-center p-3">
                                <button type="submit" className="btn btn-dark">Submit</button>
                                <p className="mt-1">Haven't any account? <Link to="/usersignup" style={{ textDecoration: "none" }}>Sign Up</Link></p>
                            </div>
                        </div>
                    </form>
                </div>}</>
            </div >
            <Footer />
        </>
    )
};