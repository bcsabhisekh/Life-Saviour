import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        role: "",
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
        const { name, email, mobile, role, password, repassword } = user;
        if (name && email && mobile && role && password && (password === repassword)) {
            try {
                // const response = await axios.post("http://localhost:5000/signup", user);
                const response = await axios({
                    method: "post",
                    url: `http://localhost:5000/signup`,
                    params: {
                        email: user.email
                    },
                    data: user
                })
                alert(response.data.message);
                // navigate("/");
            }
            catch (err) {
                throw new Error('Unable to get a token.')
            }
        }
    }

    const options = ['Public', 'Ambulance', 'Admin'];

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">Name</label>
                        <input type="text" name="name" onChange={handleChange} value={user.name} className="form-control" id="inputEmail4" placeholder="Name" />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">Email</label>
                        <input type="email" name="email" onChange={handleChange} value={user.email} className="form-control" id="inputPassword4" placeholder="Email" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">Mobile</label>
                        <input type="number" name="mobile" onChange={handleChange} value={user.mobile} className="form-control" id="inputEmail4" placeholder="Contact No." />
                    </div>
                    <label>
                        Pick a Role:
                        <select name="role" value={user.role} onChange={handleChange}>
                            <option value="Select">Select</option>
                            {options.map((item, index) => {
                                return <option value={item} key={index} >
                                    {item}
                                </option>
                            })}
                        </select>
                    </label>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">Password</label>
                        <input type="text" name="password" onChange={handleChange} value={user.password} className="form-control" id="inputEmail4" placeholder="Password" />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">Re-Password</label>
                        <input type="text" name="repassword" onChange={handleChange} value={user.repassword} className="form-control" id="inputPassword4" placeholder="Re-Password" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <p>Already have an account? <Link to="/login" >Log In</Link></p>
            </form >
        </div >
    )
}