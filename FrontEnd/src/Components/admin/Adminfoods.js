import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';


const columns = [
    {
        name: 'NAME',
        selector: row => row.food_name,
        sortable: true,
    },
    {
        name: 'CATEGORY',
        selector: row => row.food_category,
        sortable: true,
    },
    {
        name: 'DETAILS',
        selector: row => row.food_desc,
        sortable: true,
    },
    {
        name: 'PRICE',
        selector: row => row.food_price,
        sortable: true,
    },
];

const columnsSearch = [
    {
        name: 'NAME',
        selector: row => row[0],
        sortable: true,
    },
    {
        name: 'DETAILS',
        selector: row => row[1],
        sortable: true,
    },
    {
        name: 'PRICE',
        selector: row => row[2],
        sortable: true,
    },
];

const AdminFoodPage = () => {
    const [show, setShow] = useState(false);
    const [foodName, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [categ, setCateg] = useState('Breakfast');
    const [desc, setDesc] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [foods, setFoods] = useState([]);
    const [foodsSearched, setFoodsSearched] = useState([]);
    const [searchItem, setsearchItem] = useState('');
    useEffect(() => {
        Axios.get('http://localhost:8080/getFoods').then((response) => {
            setFoods(response.data);
        });
    }, []);
    const searchFood = () => {
        Axios.get(`http://localhost:8080/getFoodItems/${searchItem}`).then((response) => {
            setFoodsSearched(response.data);
        });
    }

    const addNewFood = (e) => {
        (async () => {
            await fetch('http://localhost:8080/addFood', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "food_name": foodName,
                        "food_price": price,
                        "food_image": image,
                        "food_category": categ,
                        "food_desc": desc
                    }
                )
            });
            alert("Food added");
            window.location.reload();
        })();

    };

    return (
        <div className='container'>
            <div className='row'>
                <h2>FOODS</h2>
            </div>


            <DataTable
                columns={columns}
                data={foods}
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

<br/>
            <div className='row'>
                <div className='col-md-6'>
                    <input type="text" className='form-control' placeholder='Search'
                        onChange={(e) => {
                            setsearchItem(e.target.value)
                        }}
                    />
                </div>
                <div className='col-md-3'>
                    <Icon.Search
                        onClick={searchFood}

                        className="addButton d-flex content-align-center justify-content-center"
                        size={25}
                        color="green"
                    />
                </div>

            </div>

            <DataTable
                columns={columnsSearch}
                data={foodsSearched}
                selectableRows
                selectableRowsHighlight
                pagination
                fixedHeader
                fixedHeaderScrollHeight='70vh'
                highlightOnHover

            />

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>ADD FOOD</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete='false'>
                        <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                            <Form.Label>Food Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Food name"
                                name="food"
                                onChange={(e) => {
                                    setFoodName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <div className='row'>
                            <div className='col-md-6'>
                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Food Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Food name"
                                        name="food"
                                        onChange={(e) => {
                                            setPrice(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-md-6'>
                                <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                    <Form.Label>Food Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => {
                                            setImage(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className='row'>
                            <Form.Label>Food Type</Form.Label>
                            <div className='col-md-12'>
                                <select className='form-control' name='categ'
                                    onChange={(e) => {
                                        setCateg(e.target.value)
                                    }}
                                >
                                    <option value='Breakfast'>Breakfast</option>
                                    <option value='Lunch'>Lunch</option>
                                    <option value='Dinner'>Dinner</option>
                                </select>
                            </div>
                        </div>

                        <div className='row my-1'>
                            <div className='col-md-12'>
                                <Form.Label>Food Description</Form.Label>
                                <textarea className='form-control' rows={4}
                                    onChange={(e) => {
                                        setDesc(e.target.value)
                                    }}>

                                </textarea>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12 mb-3 d-flex flex-row align-items-end'>
                                <Button variant="danger" className='mx-2' type="reset">
                                    RESET
                                </Button>
                                <Button variant="primary" type="button" onClick={addNewFood}>
                                    ADD
                                </Button>
                            </div>
                        </div>

                    </Form>

                </Modal.Body>

            </Modal>

        </div>
    )
}

export default AdminFoodPage
