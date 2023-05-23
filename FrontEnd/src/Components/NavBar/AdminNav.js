import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './style.css'
import { Link, NavLink } from "react-router-dom";



const AdminNav = () => {
    let user = localStorage.getItem('theUserName');
    function logOut(){
        localStorage.removeItem('theUserName');
    }
  return (
    <>
            {[false].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3 topNavCross">
                    <Container fluid>
                        <Navbar.Brand href="#">KULATHOOR SUVAI ARUVI - {user}</Navbar.Brand>
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
                                    <Nav.Link href="#action1"  className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/AdminDash" className='theLink'>DASHBOARD</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#action2" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/foodsAdmin" className='theLink'>FOODS</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/roomsAdmin" className='theLink'>ROOMS</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/cusAdmin" className='theLink'>CUSTOMERS</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/employeeAdmin" className='theLink'>EMPLOYEES</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/profitAdmin" className='theLink'>SALES</Link>
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link href="#" className='linksFor text-center my-1 p-3'>
                                        <NavLink>
                                            <Link to="/" onClick={logOut} className='theLink'>LOGOUT</Link>
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

export default AdminNav
