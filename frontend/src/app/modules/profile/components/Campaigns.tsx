/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState , useEffect} from 'react'
import { TokenModel } from '../../../pages/dashboard/models/TokenModel';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import { Tables } from '../../widgets/components/Tables';
import DataTable, { TableColumn } from 'react-data-table-component';

export function Campaigns() {
  const [selectedOption, setSelectedOption] = useState<'all' | 'Pending' | 'Rejected'  |'Approved'>('all');
  const [data, setData] = useState<TokenModel[]>([]);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as 'all' | 'Pending' | 'Rejected' |'Approved';
    setSelectedOption(selectedValue);

    try {
      
      const response = await axios.get(
        `http://backend.docker.local/api/campaign/requestcampaign?status=${selectedValue}`);

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error('Error fetching data from the backend API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleSelectChange({ target: { value: 'all' } } as React.ChangeEvent<HTMLSelectElement>);
  }, []);

  // const handleDetails = (item:TokenModel) => {
    
  //   Swal.fire({
  //     title: "Campaign details",
  //     html: `
  //     <div>
  //       <p><strong>Name:</strong> ${item.tokenName}</p>
  //       <p><strong>Symbol:</strong> ${item.tokenSymbol}</p>
  //       <p><strong>Total Supply:</strong> ${parseFloat(item.tokenTotalSupply).toLocaleString('en')}</p>
  //       <p><strong>Price:</strong> ${parseFloat(item.tokenPrice).toLocaleString('en')} $</p>
  //       <p><strong>Amount of money to be raised:</strong> ${parseFloat(item.amount).toLocaleString('en')}}</p>
  //       <p><strong>Company Address:</strong> ${item.companyAccount}</p>
  //       <p><strong>Duration:</strong> ${item.duration}</p>
  //       <p><strong>Redemption Type:</strong> ${item.RedemptionType}</p>
  //       <p><strong>Yield Value:</strong> ${item.yieldValue}</p>
  //       <p><strong>Action Type:</strong> ${item.actionType}</p>
  //     </div>
  //   `,
  //     imageUrl: `${toAbsoluteUrl('/media/misc/pattern-1.jpg')}` ,
  //     imageWidth: 400,
  //     imageHeight: 100,
  //     imageAlt: 'Custom image',
  //   //   backdrop: `
  //   //   rgba(0,0,123,0.4)
  //   //   url(${require('/images/status_verif.gif').default})
  //   //   left top
  //   //   no-repeat
  //   // `,
  //     customClass: 'custom-sweetalert'
  //   })
  // };
  const handleDetails = (item: TokenModel) => {
    let detailsHtml = `
      <div>
        <p><strong>Name:</strong> ${item.tokenName}</p>
        <p><strong>Symbol:</strong> ${item.tokenSymbol}</p>
        <p><strong>Total Supply:</strong> ${parseFloat(item.tokenTotalSupply).toLocaleString('en')}</p>
        <p><strong>Price:</strong> ${parseFloat(item.tokenPrice).toLocaleString('en')} $</p>
        <p><strong>Amount of money to be raised:</strong> ${parseFloat(item.amount).toLocaleString('en')}$</p>
        <p><strong>Company Address:</strong> ${item.companyAccount}</p>
        <p><strong>Duration:</strong> ${item.duration}</p>
        <p><strong>Redemption Type:</strong> ${item.RedemptionType}</p>
        <p><strong>Yield Value:</strong> ${item.yieldValue}</p>
        <p><strong>Action Type:</strong> ${item.actionType}</p>
      </div>
    `;
  
    if (item.status === 'Rejected') {
      detailsHtml += `
        <div class="mt-4">
          <h5 class="text-danger">Motif of Rejection:</h5>
          <p>${item.motifRejection}</p>
        </div>
      `;
    }
    else {
      detailsHtml += `
      <div class="mt-4">
        <p><strong>Number of Investors that invested in this PME:</strong> ${item.investorCount}</p>
      </div>
    `;

    }
  
    Swal.fire({
      title: 'Campaign details',
      html: detailsHtml,
      imageUrl: `${toAbsoluteUrl('/media/misc/pattern-1.jpg')}`,
      imageWidth: 400,
      imageHeight: 100,
      imageAlt: 'Custom image',
      customClass: 'custom-sweetalert',
    });
  };
  
  const handleStartCampaign = async (item:TokenModel) => {
    try {
      await axios.post(`http://backend.docker.local/api/campaign/user/start-campaign/${item._id}`);
      setData((prevData) => prevData.filter((campaign) => campaign._id !== item._id));

    } catch (error) {
      console.error('Error starting campaign:', error);
    }
  };
  
  
  const handleReject = async (item:TokenModel) => {
    // try {
    //   await axios.post(`http://backend.docker.local/api/campaign/user/reject-campaign/${item._id}`);
    //   setData((prevData) => prevData.filter((campaign) => campaign._id !== item._id));

    // } catch (error) {
    //   console.error('Error rejecting campaign:', error);
    // }
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to reject this demand of campaign!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject it!'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.pathname = `/campaign-rejection/${item._id}`;          
          // Swal.fire(
          //   'Deleted!',
          //   'User has been deleted.',
          //   'success'
          // )
        }
      })

    } catch (error) {
      console.error('Error delete user:', error);
    }
  };

  const renderActionButtons = (row: TokenModel) => {
    if (row.status === 'Approved' ||row.status === 'Rejected') {
      return (
        <button className="btn btn-info me-2" onClick={() => handleDetails(row)}>
          Details
        </button>
      );
    } else {
      return (
        <div>
          <button className="btn btn-info me-2">
            <a href={`http://frontend.tokenopp.org/metronic8/react/demo1/campaign-update/${row._id}`}>
              View
            </a>
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => handleStartCampaign(row)}
            disabled={row.readyToStart === 0}
          >
            Start Campaign
          </button>
          {selectedOption !== 'Rejected' && (
            <button className="btn btn-danger" onClick={() => handleReject(row)}>
              Reject
            </button>
          )}
        </div>
      );
    }
  };


  const columns: TableColumn<TokenModel>[] = [
    {
      name: 'Company Name',
      selector: (row) => row.tokenName,
      sortable: true,
      width:'200',
    },
    {
      name: 'Amount',
      selector: (row) => parseFloat(row.amount).toLocaleString('en') + '$',
      sortable: true,
    },

 

    // {
    //   name: 'Action',
    //   cell: (row) => 
    //     (     <div>
    //       <button className="btn btn-info me-2">
    //         <a href={`http://frontend.tokenopp.org/metronic8/react/demo1/campaign-update/${row._id}`}>
    //           View
    //         </a>
    //       </button>
    //    <button
    //    className="btn btn-primary me-2"
    //    onClick={() => handleStartCampaign(row)}
    //    disabled={row.readyToStart === 0}
    //     >
    //     Start Campaign
    //     </button>

    //       {/* Other buttons... */}
         
         
    //                 <button className="btn btn-danger" onClick={() => handleReject(row)}>
    //                 Reject
    //                 </button>
                  
    //     </div>       
    //     ),
    // },
    {
      name: 'Action',
      cell: (row) => renderActionButtons(row),
    },
  ]

  return (
    <>
      <div className="card">
        <div className="card-header card-header-stretch">
        <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>
          {selectedOption === 'all' ? 'All' : selectedOption=== 'Pending' ? 'Pending': selectedOption=== 'Rejected' ? 'Rejected':selectedOption=== 'Approved' ? 'Approved':'All' } Campaigns
        </h3>
        </div>
        <div className='d-flex align-items-center my-2'>
          <div className='w-100px me-5'>
          <select
            name='status'
            data-control='select2'
            data-hide-search='true'
            className='form-select form-select-white form-select-sm'
            defaultValue='all'
            onChange={handleSelectChange}
          >
            <option value='all'>All</option>
            <option value='Pending'>Pending</option>
            <option value='Approved'>Approved</option>
            <option value='Rejected'>Rejected</option>
          </select>
          </div>
          {/* <button className='btn btn-primary btn-sm' data-bs-toggle='tooltip' title='Coming soon'>
            Add Campaign
          </button> */}
        </div>
      </div>

      <div>
        <div className='mt-6'>
        {/* <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Amount</th>
            <th>Action Type</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.tokenName}</td>
              <td>{item.tokenSymbol}</td>
              <td>{item.actionType}</td>
              <td>
                  <button className="btn btn-info me-2" onClick={() => handleDetails(item)}>
                    Details
                  </button>
                  <button className="btn btn-primary me-2" onClick={() => handleStartCampaign(item)}>
                    Start Campaign
                  </button>
                  {selectedOption !== 'Rejected' && 
                  ( 
                    <button className="btn btn-danger" onClick={() => handleReject(item)}>
                    Reject
                    </button>
                  )
                  }
              </td>
            </tr>
          ))}
        </tbody>
        </table> */}

        <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
        <DataTable
              columns={columns}
              data={data}
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
          {/* begin::Table */}
          {/* <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'> */}
            {/* begin::Table head */}
            {/* <thead>
              <tr className='fw-bolder text-muted'>

                <th className='min-w-150px '>Company Name</th>
                <th className='min-w-140px'>Amount</th>
                {/* <th className='min-w-120px'>Progress</th> */}
                {/* <th className='min-w-100px text-center'>Actions</th> */}
              {/* </tr>
            </thead> */} 
            {/* end::Table head */}
            {/* begin::Table body */}
            {/* <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                      {item.tokenName}
                      </a>
                      
                    </div>
                  </div>
                </td> */}
                {/* <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                  {item.amount}
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>
                      {item.actionType}
                      </span> */}
                  {/* <span className='text-muted fw-bold text-muted d-block fs-7'>
                  {item.verified === 0 ? 'Not verified yet' : 'Verified'}                  
                  </span> */}
                {/* </td> */}
                {/* <td className='text-center'>
                  {selectedOption === 'Pending'&&(<button className="btn btn-info me-2">
                    <a href={`http://frontend.tokenopp.org/metronic8/react/demo1/campaign-update/${item._id}`}>
                      view
                    </a>
                  </button>)}
                  
                  {
                   (item.readyToStart === 0 && selectedOption === 'Pending') ? (<button className="btn btn-primary me-2" onClick={() => handleStartCampaign(item)} disabled>
                    Start Campaign
                  </button>)
                  :(item.readyToStart === 1 && selectedOption === 'Pending') ?
                  (<button className="btn btn-primary me-2" onClick={() => handleStartCampaign(item)}>
                  Start Campaign
                </button>):
                (<button className="btn btn-primary me-2" onClick={() => handleDetails(item)}>
                 Details
                 </button>)
                  }
                  
                  {selectedOption !== 'Rejected' && 
                  ( 
                    <button className="btn btn-danger" onClick={() => handleReject(item)}>
                    Reject
                    </button>
                  )
                  }
              </td> */}
                {/* <td>
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      onClick={() => handleDetailsUser(item)}
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href={`http://frontend.tokenopp.org/metronic8/react/demo1/UpdateUser/${item._id}`}
                      className='btn btn-sm btn-primary'
                      id='kt_toolbar_primary_button'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' 
                      className='svg-icon-3' 
                      />
                    </a>

                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => handleReject(item)}
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  </div>
                </td> */}
              {/* </tr>
            ))} */}
              
              
            {/* </tbody> */}
            {/* end::Table body */}
          {/* </table> */}
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
    
        </div>
        
      </div>

      {/* <div className='d-flex flex-stack flex-wrap pt-10'>
        <div className='fs-6 fw-bold text-gray-700'>Showing 1 to 10 of 50 entries</div>

        <ul className='pagination'>
          <li className='page-item previous'>
            <a href='#' className='page-link'>
              <i className='previous'></i>
            </a>
          </li>

          <li className='page-item active'>
            <a href='#' className='page-link'>
              1
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              2
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              3
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              4
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              5
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              6
            </a>
          </li>

          <li className='page-item next'>
            <a href='#' className='page-link'>
              <i className='next'></i>
            </a>
          </li>
        </ul>
      </div> */}
              </div>

    </>
  )
}
// const mapStateToProps = (state: { auth: { accessToken: any; }; }) => {
//   return {
//     accessToken: state.auth.accessToken, // Assuming the access token is stored in auth slice of the Redux store
//   };
// };
// export default connect(mapStateToProps)(Campaigns);