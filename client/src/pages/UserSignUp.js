import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import "./UserSignUp.css";

export default function UserSignUp() {

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        repassword: ""
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
        // console.log(user);
        const { name, email, mobile, password, repassword } = user;
        if (name && email && mobile && password && (password === repassword)) {
            try {
                // const response = await axios.post("http://localhost:5000/signup", user);
                const response = await axios({
                    method: "post",
                    url: `http://localhost:5000/usersignup`,
                    params: {
                        email: user.email
                    },
                    data: user
                })
                alert(response.data.message);
                navigate("/userlogin");
            }
            catch (err) {
                throw new Error('Unable to get a token.')
            }
        }
    }

    const options = ['Public', 'Ambulance'];

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="items">
                    <form onSubmit={onFormSubmit} className="shadow">
                        <div className="text-center pb-4 pt-5">
                            <h2>User SignUp</h2>
                        </div>
                        <div className="form-row p-3">
                            <div className="form-group col-md-6 mx-auto">
                                <label for="inputEmail4">Name</label>
                                <input autoComplete="off" type="text" name="name" onChange={handleChange} value={user.name} className="form-control" id="inputEmail4" placeholder="Name" />
                            </div>
                            <div className="form-group col-md-6 mx-auto mt-3">
                                <label for="inputPassword4">Email</label>
                                <input autoComplete="off" type="email" name="email" onChange={handleChange} value={user.email} className="form-control" id="inputPassword4" placeholder="Email" />
                            </div>
                        </div>
                        <div className="form-row p-3">
                            <div className="form-group col-md-6 mx-auto">
                                <label for="inputEmail4">Mobile</label>
                                <input autoComplete="off" type="number" name="mobile" onChange={handleChange} value={user.mobile} className="form-control" id="inputEmail4" placeholder="Contact No." />
                            </div>
                            {/* <div className="form-group col-md-6 mx-auto mt-4">
                                <label>
                                    Pick a Role:
                                    <select name="role" className="form-select mt-2" value={user.role} onChange={handleChange}>
                                        <option value="Select">Select</option>
                                        {options.map((item, index) => {
                                            return <option value={item} key={index} >
                                                {item}
                                            </option>
                                        })}
                                    </select>
                                </label>
                            </div> */}
                        </div>
                        <div className="form-row p-3">
                            <div className="form-group col-md-6 mx-auto">
                                <label for="inputEmail4">Password</label>
                                <input autoComplete="off" type="text" name="password" onChange={handleChange} value={user.password} className="form-control" id="inputEmail4" placeholder="Password" />
                            </div>
                            <div className="form-group col-md-6 mx-auto mt-3">
                                <label for="inputPassword4">Re-Password</label>
                                <input autoComplete="off" type="text" name="repassword" onChange={handleChange} value={user.repassword} className="form-control" id="inputPassword4" placeholder="Re-Password" />
                            </div>
                        </div>
                        <div className="text-center p-4">
                            <button type="submit" className="btn btn-dark">Sign Up</button>
                            <p className="mt-2">Already have an account? <Link to="/userlogin" style={{ textDecoration: "none" }}>Log In</Link></p>
                        </div>
                    </form >
                </div>
            </div >
            <Footer />
        </>
    )
}