import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';

const columnsAll = [
    {
        name: 'ROOM STATUS',
        selector: row => row[0],
        sortable: true,
    },
    {
        name: 'ROOM DESCRIPTION',
        selector: row => row[1],
        sortable: true,
    }
];


const columns = [
    {
        name: 'CUSTOMER',
        selector: row => row[0],
        sortable: true,
    },
    {
        name: 'ROOM STATUS',
        selector: row => row[1],
        sortable: true,
    },
    {
        name: 'ROOM DESCRIPTION',
        selector: row => row[2],
        sortable: true,
    }
];


const AdminRoom = () => {
    useEffect(() => {
        Axios.get('http://localhost:8080/getRooms').then((response) => {
            setRoomList(response.data);
        });
    }, []);

    useEffect(() => {
        Axios.get('http://localhost:8080/getAllRooms').then((response) => {
            setRoomAllList(response.data);
        });
    }, []);

    const [roomList, setRoomList] = useState([]);
    const [allRoomList, setRoomAllList] = useState([]);

    return (
        <>
            <div className='container'>
            <div className='row'>
                    <h2>ALL ROOMS</h2>
                </div>
                <DataTable
                    columns={columnsAll}
                    data={allRoomList}
                    selectableRows
                    selectableRowsHighlight
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='70vh'
                    highlightOnHover
                    
                />
                <div className='row'>
                    <h2>BOOKED ROOMS</h2>
                </div>
                <DataTable
                    columns={columns}
                    data={roomList}
                    selectableRows
                    selectableRowsHighlight
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='70vh'
                    highlightOnHover

                />

               
            </div>
        </>
    )
}

export default AdminRoom