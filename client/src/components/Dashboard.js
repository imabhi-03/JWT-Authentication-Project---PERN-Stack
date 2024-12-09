import React, { Fragment, useState, useEffect } from "react";
import {toast} from "react-toastify";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard",
                {
                    method: "GET",
                    headers: { token: localStorage.token } 

                }
            );

            const parseRes = await response.json(); 
    
            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token")
        setAuth(false);
        toast.success("Logged out successfully");
    }

    //Fetching data is a side effect (it happens outside the component’s rendering process), and useEffect is the appropriate place for such operations.
    //The empty dependency array [] ensures that the useEffect only runs once, after the initial render.
    useEffect(() => {
        getName()
    },[]);

    return (
        <Fragment>
            <h1>
                Dashboard {name}
            </h1>
            <button className="btn btn-warning" onClick={e => logout(e)}>Logout</button>
        </Fragment>
    );
};

export default Dashboard;