import React, { useEffect, useContext } from 'react';
import Body from '../../Components/Body Section/Body';
import SideBar from '../../Components/SideBar/SideBar';
import {AuthAdminContext} from "../../Context/AuthAdminContext";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const { admin } = useContext(AuthAdminContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(admin);
        if (!admin) {
            navigate("/");
        }
    }, [admin]);

    return (
        <div className='container'>
            <SideBar />
            <Body />
        </div>
    )
}

export default Dashboard
