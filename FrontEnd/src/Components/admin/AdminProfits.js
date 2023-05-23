import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';

const columns = [
  {
    name: 'Order Id',
    selector: row => row[0],
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => row[1],
    sortable: true,
  },
  {
    name: 'Name',
    selector: row => row[2],
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row[3],
    sortable: true,
  }
];

const AdminProfitsAll = () => {
  const [orderedFoods, setOrderedFoods] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8080/getFoodOrders').then((response) => {
      setOrderedFoods(response.data);
    });
  }, []);
  return (
    <div className='container'>
      <DataTable
        columns={columns}
        data={orderedFoods}
        selectableRows
        selectableRowsHighlight
        pagination
        fixedHeader
        fixedHeaderScrollHeight='70vh'
        highlightOnHover

      />


    </div>
  )
}

export default AdminProfitsAll
