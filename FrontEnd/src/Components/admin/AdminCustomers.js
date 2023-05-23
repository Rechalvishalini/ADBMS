import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';

const columns = [
  {
    name: 'NAME',
    selector: row => row[0],
    sortable: true,
  },
  {
    name: 'PHONE',
    selector: row => row[1],
    sortable: true,
  },
  {
    name: 'ADDRESS',
    selector: row => row[2],
    sortable: true,
  },
  {
    name: 'EMAIL',
    selector: row => row[3],
    sortable: true,
  },
  {
    name: 'NIC',
    selector: row => row[4],
    sortable: true,
  },
  {
    name: 'GENDER',
    selector: row => row[5],
    sortable: true,
  },
  {
    name: 'AGE',
    selector: row => row[6],
    sortable: true,
  },
];

const AdminCustomers = () => {
  const [show, setShow] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setCustomerAddress] = useState('');
  const [email, setCustomerEmail] = useState('');
  const [nic, setNICno] = useState('');
  const [gender, setGender] = useState('Female');
  const [DoB,  setDOB] = useState('');
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8080/getCustomers').then((response) => {
      setCustomers(response.data);
    });
  }, []);

  const addNewCustomer
   = (e) => {
    (async () => {
        await fetch('http://localhost:8080/addCustomer', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "cus_name": customerName,
                    "cus_phone": mobile,
                    "cus_address": address,
                    "cus_email": email,
                    "cus_nic": nic,
                    "cus_gender": gender,
                    "cus_dob": DoB
                }
            )
        });
        alert("Customer added");
        window.location.reload();
    })();

};
  return (
    <>
      <div className='container'>
        <div className='row'>
          <h2>CUSTOMERS</h2>
        </div>
        <DataTable
          columns={columns}
          data={customers}
          selectableRows
          selectableRowsHighlight
          pagination
          fixedHeader
          fixedHeaderScrollHeight='70vh'
          highlightOnHover

        />

        <Icon.PlusCircle

          className="addButton d-flex content-align-end"
          size={35}
          color="green"
        />

      </div>

      <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>ADD CUSTOMER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete='false'>
                        <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Customer name"
                                name="customer"
                                onChange={(e) => {
                                    setCustomerName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <div className='row'>
                            <div className='col-md-6'>
                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Customer Phone</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Customer Mobile No"
                                        name="customer"
                                        onChange={(e) => {
                                            setMobile(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            </div>

                        <div className='row my-1'>
                            <div className='col-md-12'>
                                <Form.Label>Customer Address</Form.Label>
                                <textarea className='form-control' rows={4}
                                    onChange={(e) => {
                                        setCustomerAddress(e.target.value)
                                    }}>

                                </textarea>
                            </div>
                        </div>

                        
                        <div className='row'>
                            <div className='col-md-6'>
                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Customer Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Customer Email"
                                        name="customer"
                                        onChange={(e) => {
                                            setCustomerEmail(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            </div>

                            
                            <div className='row'>
                            <div className='col-md-6'>
                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Customer NIC No</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Customer NIC No"
                                        name="customer"
                                        onChange={(e) => {
                                            setNICno(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            </div>

                            <div className='row'>
                            <Form.Label>Customer Gender</Form.Label>
                            <div className='col-md-12'>
                                <select className='form-control' name='categ'
                                    onChange={(e) => {
                                        setGender(e.target.value)
                                    }}
                                >
                                    <option value='Female'>Female</option>
                                    <option value='Male'>Male</option>
                                   
                                </select>
                            </div>
                        </div>

                            
                            <div className='row'>
                            <div className='col-md-6'>
                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Customer DOB</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Customer DOB"
                                        name="customer"
                                        onChange={(e) => {
                                            setDOB(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            </div>

                        <div className='row'>
                            <div className='col-md-12 mb-3 d-flex flex-row align-items-end'>
                                <Button variant="danger" className='mx-2' type="reset">
                                    RESET
                                </Button>
                                <Button variant="primary" type="button" onClick={addNewCustomer}>
                                    ADD
                                </Button>
                            </div>
                        </div>

                    </Form>

                </Modal.Body>

            </Modal>

    </>
  )
}

export default AdminCustomers