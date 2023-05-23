import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import * as Icon from 'react-bootstrap-icons';

const columns = [
    {
        name: 'NO',
        selector: row => row.invoice_id,
        sortable: true,
    },
    {
        name: 'CUSTOMER',
        selector: row => row.cus_id,
        sortable: true,
    },
    {
        name: 'ITEM',
        selector: row => row.item_id,
        sortable: true,
    },
    {
        name: 'DATE',
        selector: row => row.invoice_date,
        sortable: true,
    },
    {
        name: 'AMOUNT',
        selector: row => row.amount,
        sortable: true,
    },
    {
        name: 'QUANTITY',
        selector: row => row.quantity,
        sortable: true,
    },
    {
        name: 'PRICE',
        selector: row => row.price,
        sortable: true,
    }
];


const AdminInvoice = () => {
    const [show, setShow] = useState(false);
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8080/getInvoices').then((response) => {
            setInvoices(response.data);
        });
    }, []);
    return (
        <div className='container'>
        <div className='row'>
            <h2>INVOICES</h2>
        </div>
        <DataTable
            columns={columns}
            data={invoices}
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
    )
}

export default AdminInvoice