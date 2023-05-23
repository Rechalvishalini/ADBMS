import React from 'react'
import DashBody from '../Components/admin/dashBody';
import AdminNav from '../Components/NavBar/AdminNav'

const AdminDashboard = () => {
    let user = localStorage.getItem('theUserName');
    if (user == null) {
        return (
            <div>
                404 Error

                <br />
                <a href='/'>Home</a>
            </div>
        )
    } else {
        return (
            <div>
                <AdminNav />
                <DashBody/>
            </div>
        )
    }

}

export default AdminDashboard
