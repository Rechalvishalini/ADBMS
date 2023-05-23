import React from 'react'
import AdminEmployeesList from '../Components/admin/AdminEmployees'
import AdminNav from '../Components/NavBar/AdminNav'

const AdminEmployees = () => {
    return (
        <div>
            <AdminNav/>
            <AdminEmployeesList/>
        </div>
    )
}

export default AdminEmployees
