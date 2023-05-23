import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';

const columns = [
    {
        name: 'NO',
        selector: row => row[0],
        sortable: true,
    },
    {
        name: 'NAME',
        selector: row => row[1],
        sortable: true,
    },
    {
        name: 'AGE',
        selector: row => row[2],
        sortable: true,
    },
    {
        name: 'GENDER',
        selector: row => row[3],
        sortable: true,
    },
    {
        name: 'POSITION',
        selector: row => row[4],
        sortable: true,
    },
    {
        name: 'ADDRESS',
        selector: row => row[5],
        sortable: true,
    }
];



const AdminEmployeesList = () => {
    const [empName, setEmpName] = useState('');
    const [empAge, setEmpAge] = useState('');
    const [empGender, setEmpGender] = useState('');
    const [empPosition, setEmpPosition] = useState('');
    const [empAddress, setEmpAddress] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const addNewEmp = (e) => {
        (async () => {
            await fetch('http://localhost:8080/addEmployee', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "emp_name": empName,
                        "emp_age": empAge,
                        "emp_gender": empGender,
                        "emp_position": empPosition,
                        "emp_address": empAddress
                    }
                )
            });
            alert("Employee added");
            window.location.reload();
        })();

    };


    const [show, setShow] = useState(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8080/getEmployees').then((response) => {
            setEmployees(response.data);
        });
    }, []);
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h2>EMPLOYEES</h2>
                </div>
                <DataTable
                    columns={columns}
                    data={employees}
                    selectableRows
                    selectableRowsHighlight
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='70vh'
                    highlightOnHover

                />

                <Icon.PlusCircle
                    onClick={handleShow}
                    className="addButton d-flex content-align-end"
                    size={35}
                    color="green"
                />

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>ADD EMPLOYEE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form autoComplete='false'>
                            <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                <Form.Label>Employee Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Employee Name"
                                    name="employee"
                                    onChange={(e) => {
                                        setEmpName(e.target.value)
                                    }}
                                />
                            </Form.Group>
                            <div className='row'>

                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Employee Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Employee Age"
                                        name="employee"
                                        onChange={(e) => {
                                            setEmpAge(e.target.value)
                                        }}
                                    />
                                </Form.Group>

                            </div>
                            <div className='row'>

                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Employee Gender</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Employee Gender"
                                        name="employee"
                                        onChange={(e) => {
                                            setEmpGender(e.target.value)
                                        }}
                                    />
                                </Form.Group>

                            </div>

                            <div className='row'>

                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Employee Position</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Employee Position"
                                        name="employee"
                                        onChange={(e) => {
                                            setEmpPosition(e.target.value)
                                        }}
                                    />
                                </Form.Group>

                            </div>

                            <div className='row'>

                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Employee Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Employee Address"
                                        name="employee"
                                        onChange={(e) => {
                                            setEmpAddress(e.target.value)
                                        }}
                                    />
                                </Form.Group>

                            </div>


                            <div className='row'>
                                <div className='col-md-12 mb-3 d-flex flex-row align-items-end'>
                                    <Button variant="danger" className='mx-2' type="reset">
                                        RESET
                                    </Button>
                                    <Button variant="primary" type="button" onClick={addNewEmp}>
                                        ADD
                                    </Button>
                                </div>
                            </div>

                        </Form>

                    </Modal.Body>

                </Modal>

            </div>

        </>
    )
}

export default AdminEmployeesList
