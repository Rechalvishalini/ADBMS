import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import { NavLink, useNavigate } from 'react-router-dom';

const RoomsList = () => {
  let user = localStorage.getItem('theUserName');
  let theId = localStorage.getItem('theId');
  const [roomsDetails, setRoomDetails] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:8080/emptyRooms').then((response) => {

      setRoomDetails(response.data);
    });
  }, []);
  let navigate = useNavigate();
  const bookRooms = (e, roomNumber) => {
    if (user == null) {
      let path = `/login`;
      navigate(path);
    } else {
      Axios.post(`http://localhost:8080/bookRoom/${theId}/${roomNumber}`, {
      }).then((response) => {
        console.log(response.data);
      })


    }


  };
  return (
    <>
      <div className='row'>
        <div className='row '>
          <div className='col-md-12 theFoodTop d-flex content-align-center'>
            Rooms
          </div>
        </div>
        <div className='row m-4'>
          {
            roomsDetails.map((val) => {
              return <div className='col-md-3'>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Room</Card.Title>
                    <Card.Text>
                      {val[2]}
                    </Card.Text>
                    <div className='row'>
                      <div className='col-md-9'>
                      </div>
                      <div className='col'>
                        <Button variant="success" onClick={event => bookRooms(event, val[0])}><Icon.House /></Button>
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

export default RoomsList
