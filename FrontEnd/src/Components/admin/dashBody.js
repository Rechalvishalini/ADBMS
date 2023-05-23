import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import DataTable from 'react-data-table-component';
import './style.css'

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const columns = [
  {
    name: 'USER NAME',
    selector: row => row[1],
    sortable: true,
  },
  {
    name: 'POST',
    selector: row => row[2],
    sortable: true,
  },
];

const DashBody = () => {
  
  const [userDetails, setUserDetails] = useState([]);
  const [profit, setProfit] = useState('');
  const [profitM, setProfitMargin] = useState('');
  useEffect(() => {
    Axios.get('http://localhost:8080/getAllUsers').then((response) => {
      setUserDetails(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get('http://localhost:8080/getProfit').then((response) => {
      setProfit(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:8080/myProfitMargin').then((response) => {
      setProfitMargin(response.data);
    });
  }, []);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-9'>

          <h2>USERS</h2>
          <DataTable
            columns={columns}
            data={userDetails}
            selectableRows
            selectableRowsHighlight
            pagination
            fixedHeader
            fixedHeaderScrollHeight='70vh'
            highlightOnHover
            
          />
        </div>
        <div className='col-md-3'>
          <h5>Total Profit</h5> 
          Rs. {profit}

          <br/>
          <br/>
          Profit Margin: {profitM}

          <br/>
          <a href='/profitAdmin' className='viewall'>VIEW ALL SALES</a>
        </div>
      </div>
    </div>
  )
}

export default DashBody
