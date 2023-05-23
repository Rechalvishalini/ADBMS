import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './style.css'
import { Link, NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const columns = [
    {
        name: 'FOOD',
        selector: row => row[0],
        sortable: true,
    },
    {
        name: 'QUANTITY',
        selector: row => row[1],
        sortable: true,
    },
    {
        name: 'PRICE',
        selector: row => row[2],
        sortable: true,
    }
];

const TopNav = () => {
    let user = localStorage.getItem('theUserName');
    let theId = localStorage.getItem('theId');

    const [cartDetails, setCartDetails] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [cartTotal, setCartTotal] = useState('');
    function logOut() {
        localStorage.removeItem('theUserName');
        window.location.reload();
    }

    const getCart = (id) => {
        console.log(id);
        setShow(true);
        Axios.get(`http://localhost:8080/getCart/${id}`).then((response) => {
            setCartDetails(response.data);
        });

        Axios.get(`http://localhost:8080/getCartTotal/${id}`).then((response) => {
            setCartTotal(response.data);
        });

    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>YOUR CART</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DataTable
                        columns={columns}
                        data={cartDetails}
                        selectableRows
                        selectableRowsHighlight
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight='70vh'
                        highlightOnHover

                    />
                </Modal.Body>
                <div className='row'>
                    <div className='col-md-12 d-flex justify-content-center'>
                        <h5>
                            Total : Rs. {cartTotal}
                        </h5>
                    </div>
                </div>
            </Modal>


            {[false].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3 topNavCross">
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <div className='row'>
                                <div className='col-md-8'> KULATHOOR SUVAI ARUVI</div>
                                <div className='col-md-4'>
                                    <div className='d-flex content-align-center justify-content-end' >
                                        <DropdownButton variant="default" title={user}>
                                            <Dropdown.Item href="#/action-2" onClick={event => getCart(theId)}>CART</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3" onClick={logOut}>LOGOUT</Dropdown.Item>
                                        </DropdownButton>

                                    </div>
                                </div>
                            </div>
                        </Navbar.Brand>


                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                            className='toggleNav'
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    KSA - Batticalo

                                </Offcanvas.Title>

                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/" className='theLink'>HOME</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="/food" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/food" className='theLink'>FOOD</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/room" className='theLink'>ROOM</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/n" className='theLink'>CONTACT US</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/login" className='theLink'>LOGIN</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/reg" className='theLink'>REGISTER</Link>
                                        </NavLink>
                                    </Nav.Link>

                                </Nav>

                            </Offcanvas.Body>

                        </Navbar.Offcanvas>

                    </Container>

                </Navbar>
            ))}
        </>
    )
}

export default TopNav