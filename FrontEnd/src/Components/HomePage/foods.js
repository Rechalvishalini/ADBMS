import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import { NavLink, useNavigate } from 'react-router-dom';




const FoodsList = () => {
    let user = localStorage.getItem('theUserName');
    let theId = localStorage.getItem('theId');
    const [foodDetails, setFoodDetails] = useState([]);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        Axios.get('http://localhost:8080/getFoods').then((response) => {

            setFoodDetails(response.data);
        });
    }, []);
    let navigate = useNavigate();
    const addToCart = (e, quan, price) => {
        let totalPrice = quantity * price;
        console.log(totalPrice);
        if (user == null) {
            let path = `/login`;
            navigate(path);
        } else {
            (async () => {
                await fetch('http://localhost:8080/addToCart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "food_id": quan,
                            "cus_id": theId,
                            "quantity": quantity,
                            "price": totalPrice
                        }
                    )
                });
                alert("Added to cart");
                window.location.reload();
            })();
        }


    };

    return (
        <>
            <div className='row'>
                <div className='row '>
                    <div className='col-md-12 theFoodTop d-flex content-align-center'>
                        Foods
                    </div>
                </div>
                <div className='row m-4'>
                    {
                        foodDetails.map((val) => {
                            return <div className='col-md-3'>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={val.food_image} className="m-4" />
                                    <Card.Body>
                                        <Card.Title>{val.food_name}</Card.Title>
                                        <Card.Text>
                                            {val.food_desc}
                                            <br/>
                                            Price : {val.food_price}
                                        </Card.Text>
                                        <div className='row'>
                                            <div className='col-md-9'>
                                                <input type="number" min="1" className='form-control'
                                                    onChange={(e) => {
                                                        setQuantity(e.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className='col'>
                                                <Button variant="success" onClick={event => addToCart(event, val.food_id, val.food_price)}><Icon.Cart3 /></Button>
                                            </div>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </div>
                        })
                    }
                </div>
            </div>



        </>
    )
}

export default FoodsList