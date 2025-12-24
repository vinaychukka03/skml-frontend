import React, { useState } from 'react'
import './Admin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';
function Admin() {

    const [loading, setLoading] = useState(false);


    const [log1, setLog] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    let changeData = (event) => {
        const { name, value } = event.target;
        setLog({ ...log1, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("https://skmlbackend.onrender.com/user/signin", log1);
            
            localStorage.setItem("token", response.data);
            toast.success("Login Success");
            setLog(
                {
                    username: '',
                    password: ''
                }
            )
            navigate('/dashboard');
        } catch (error) {
            
            toast.error("Login Failed");
        } finally {
            setLoading(false); // HIDE LOADER
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="adminForm" >
                <form className='form-style' onSubmit={handleSubmit}>
                    <h2 style={{ margin: '1rem 0%' }}>Login</h2>
                    <div className="mb-3 con">
                        <input type="text" className=" control" placeholder="Username" style={{ marginBottom: '1rem' }} name='username' value={log1.username} onChange={changeData} />

                        <input type="password" className=" control" placeholder="Password" name='password' value={log1.password} onChange={changeData} />
                    </div>
                    <button type="submit" className="btn btn-primary " disabled={loading}>{loading ? "Please wait..." : "Submit"}</button>
                </form>
            </div>

        </>
    )
}

export default Admin