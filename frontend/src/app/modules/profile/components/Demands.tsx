import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DemandsModel } from './models/DemandsModel';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import DataTable, { TableColumn } from 'react-data-table-component';
import Swal from 'sweetalert2';
import { TokenModel } from '../../../pages/dashboard/models/TokenModel';
import { useHistory } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import { UserModel } from '../../auth/models/UserModel';

interface ConnectionsProps {
  demands: DemandsModel[]; 
  accessToken: string;
}


export function Demands({ accessToken }: ConnectionsProps ) {
  const [tokenData, setTokenData] = useState<DemandsModel[]>([]);
  const [investData,setInvestData]= useState<DemandsModel[]>([]);
  const userType = useSelector<RootState>(({auth}) => auth.user?.userType);
  const pme = userType == "admin";
console.log(accessToken);
  useEffect(() => {
    axios
      .get('http://backend.tokenopp.org/api/buy/alldemand')
      .then((response) => {
        setTokenData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching token data:', error);
      });
  }, []);
  const handleAccept = (_id: any) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to Accept this Request to buy!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, accept it!'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://backend.tokenopp.org/api/buy/accepttransfer/${encodeURIComponent(_id)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`, // Use the accessToken from Redux store
      
            },}).then((response) => response.json())
            .catch((error) => {
              console.error('Error purchasing tokens:', error);
            });       
        }
      })
  
    } catch (error) {
      console.error('Error :', error);
    }

  };
  const handleReject = (item:DemandsModel) => {
    // Make a POST request to the backend API
  //   fetch(`http://backend.tokenopp.org/api/buy/rejectTransfer/${encodeURIComponent(_id)}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${accessToken}`, // Use the accessToken from Redux store

  //     },}).then((response) => response.json())
  //     .catch((error) => {
  //       console.error('Error purchasing tokens:', error);
  //     });
  // }; 
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to reject this Request to buy!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.pathname = `/RejectionForm/${item._id}`;          
        // Swal.fire(
        //   'Deleted!',
        //   'User has been deleted.',
        //   'success'
        // )
      }
    })

  } catch (error) {
    console.error('Error :', error);
  }
};
  useEffect(() => {
    axios
      .get('http://backend.tokenopp.org/api/campaign/campaignInvestIn')
      .then((response) => {
        setInvestData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching token data:', error);
      });
  }, []);
  const history = useHistory();

  const handleCampaignDetails = (_id:any ) => {
    // Navigate to the buy token form and pass the token name as a parameter
    history.push(`/RequestDetails:id=${encodeURIComponent(_id)}`);



  };
  const handleDetails = (item:DemandsModel) => {
    
    Swal.fire({
      title: "Request details",
      html: `
      <div>
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Email:</strong> ${item.email}</p>
        <p><strong>Phone Number:</strong> ${item.phoneNumber}</p>
        <p><strong>tokenName:</strong> ${item.tokenName}</p>
        <p><strong>Amount of Tokens:</strong> ${parseFloat(item.quantity).toLocaleString('en')}</p>
        <p><strong>Amount of money to pay :</strong> ${parseFloat(item.amount).toLocaleString('en')} $</p>
        <p><strong>Payment Method:</strong> ${item.paymentMethod}</p>
        <p><strong>RIB:</strong> ${item.rib}</p>

      </div>
    `,
      imageUrl: `${toAbsoluteUrl('/media/misc/pattern-1.jpg')}` ,
      imageWidth: 400,
      imageHeight: 100,
      imageAlt: 'Custom image',
    //   backdrop: `
    //   rgba(0,0,123,0.4)
    //   url(${require('/images/status_verif.gif').default})
    //   left top
    //   no-repeat
    // `,
      customClass: 'custom-sweetalert'
    })
  };

  const columns: TableColumn<DemandsModel>[] = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: 'Email',
    //   selector: (row) => row.email,
    //   sortable: true,
    // },
    // {
    //   name: 'Phone Number',
    //   selector: (row) => row.phoneNumber,
    //   sortable: true,
    // },
    {
      name: 'Amount of Tokens',
      selector: (row) => row.quantity,
      sortable: true,
    },
    // {
    //   name: 'Payment Method',
    //   selector: (row) => row.paymentMethod,
    //   sortable: true,
    // },
    // {
    //   name: 'Token Name',
    //   selector: (row) => row.tokenName,
    //   sortable: true,
    // },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <button className="btn btn-success btn-sm btn-active-light-primary " onClick={() => handleAccept(row._id)}>Accept</button>
          <button className="btn btn-danger btn-sm btn-active-light-primary " onClick={() => handleReject(row)}>Reject</button>        
          <button className="btn btn-info btn-sm btn-active-light-primary " onClick={() => handleDetails(row)}> Details </button>           
         </div>
      ),
    },

  ];
  const columnsInvestor: TableColumn<DemandsModel>[] = [
    {
      name: 'Campaign Name',
      selector: (row) => row.tokenName,
      sortable: true,
    },
    {
      name: 'Amount Invested',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Token Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => (row.Date ? row.Date.toString() : ''),
      sortable: true,
    },
    {
      name: 'Details',
      cell: (row) => (
        <button
          className="btn btn-light btn-sm btn-active-light-primary"
          onClick={() => handleCampaignDetails(row)}
        >
          Details
        </button>
      ),
    },
  ]

  return (
    <>
    {userType == "admin" && tokenData ? (
        <>
         <div className="card">
        <div className="card-header card-header-stretch">
          <div className="card-title">
            <h3 className="m-0 text-gray-800">Requests to Buy Tokens</h3>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
          <DataTable
              columns={columns}
              data={tokenData}
              pagination
              highlightOnHover
              defaultSortFieldId="name"
              defaultSortAsc
              striped
              pointerOnHover
              selectableRows
              selectableRowsHighlight
              selectableRowsNoSelectAll
            />
            {/* <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9 custom-table">
              <tbody className="fs-6 fw-semibold text-gray-600">
                {tokenData.map((demand) => (
                  <tr key={demand.id}>
                    <td>{demand.name}</td>
                    <td>{demand.email}</td>
                    <td>{demand.phoneNumber}</td>
                    <td>{demand.quantity}</td>
                    <td>{demand.paymentMethod}</td>
                    <td>{demand.tokenName}</td>
                    <td>{demand.status}</td>
                    <td >  
                       <div className="d-flex">
                        <button className="btn btn-light btn-sm btn-active-light-primary  me-2"
                        onClick={() => handleAccept(demand._id)}

                        >Accept</button>
                        <button className="btn btn-light btn-sm btn-active-light-primary ">Reject</button>
                      </div></td>

                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    
    </>
    ) : userType == "investor" ?(
      <div className="card">
              <div className="card-header card-header-stretch">
                <div className="card-title">
                  <h3 className="m-0 text-gray-800">My Investement</h3>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                <DataTable
              columns={columnsInvestor}
              data={investData}
              pagination
              highlightOnHover
              defaultSortFieldId="name"
              defaultSortAsc
              striped
              pointerOnHover
              selectableRows
              selectableRowsHighlight
              selectableRowsNoSelectAll
            />
                  {/* <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9 custom-table">
                    <thead className="border-gray-200 fs-5 fw-semibold bg-lighten">
                      <tr>
                        <th>Campaign Name</th>
                        <th>Amount Invested</th>
                        <th>Token Quantity</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody className="fs-6 fw-semibold text-gray-600">
                    {investData.map((demand) => (
                      <tr key={demand.id}>
                        <td>{demand.tokenName}</td>
                        <td>{demand.amount}</td>
                        <td>{demand.quantity}</td>
                        <td>{demand.status}</td>
                        <td>{demand.Date}</td>
    
                      </tr>
                    ))}
                  </tbody>
                  </table> */}
                </div>
              </div>
            </div>      ): (
              <h1>This feauture is not available for Startups</h1>
    )}
          </>
  );
}
// const mapStateToProps = (state: { auth: { accessToken: any; }; }) => {
//   return {
//     accessToken: state.auth.accessToken,
//   };
// };

// export default connect(mapStateToProps)(Connections);
export default Demands;




