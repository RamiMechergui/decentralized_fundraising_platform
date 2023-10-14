/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import {Card3} from '../../../../_metronic/partials/content/cards/Card3'
import axios from 'axios';
import { UserModel } from '../../../pages/dashboard/models/UserModel';
import Swal from 'sweetalert2';
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers';
import { Link } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';

export function Connections() {
  const [selectedOption, setSelectedOption] = useState< 'all' |'startup' | 'investor'>('all');
  const [data, setData] = useState<UserModel[]>([]);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as 'all' |'startup' | 'investor';
    setSelectedOption(selectedValue);

    try {
      
      const response = await axios.get(
        `http://backend.docker.local/api/users/?userType=${selectedValue}`);

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

  const handleDetailsUser = (item:UserModel) => {
    
    Swal.fire({
      title: `${item.userName} details`,
      html: `
      <div>
        <p><strong>Name:</strong> ${item.userName}</p>
        <p><strong>Email:</strong> ${item.email}</p>
        <p><strong>Verification:</strong> ${item.verified}</p>
        <p><strong>2FA :</strong> ${item.twoFactorEnabled}</p>
        <p><strong>Status:</strong> ${item.status}</p>
        <p><strong>Deleted:</strong> ${item.isDeleted}</p>
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
  const handleUpdateUser = async (item:UserModel) => {
    try {
     
      console.log('Update button');
    } catch (error) {
      console.error('Error Update:', error);
    }
  };
  
  //delete user
  const handleDeleteUser = async (item:UserModel) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://backend.docker.local/api/users/delete/${item._id}`);
    
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          )
        }
      })

    } catch (error) {
      console.error('Error delete user:', error);
    }
  };

  // const handleToggleStatus = async (item:UserModel) => {
  //   try {
  //     // Make the API call to update the status
  //     const updatedItem = { ...item, status: item.status === 'pending' ? 'verified' : 'pending' };
  //     await axios.post(`http://backend.docker.local/api/users/${item._id}/update-status`);

  //     // Update the data in the state with the new status
  //     const newData = data.map((d) => (d._id === item._id ? updatedItem : d));
  //     setData(newData);
  //   } catch (error) {
  //     // Handle error if API call fails
  //     console.error('Error updating status:', error);
  //   }
  // }; 


  const columns: TableColumn<UserModel>[] = [
    {
      name: 'Name',
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'User Type',
      selector: (row) => row.userType,
      sortable: true,
    },

    {
      name: 'Action',
      cell: (row) => (
        <div className='d-flex justify-content-end flex-shrink-0'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      onClick={() => handleDetailsUser(row)}
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href={`http://frontend.tokenopp.org/metronic8/react/demo1/UpdateUser/${row._id}`}
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
                      onClick={() => handleDeleteUser(row)}
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  </div>
      ),
    },
  ]



  return (
    <>


      <div>
        <div className='mt-6'>
      {/* begin::Header */}
      <div className="card">
        <div className="card-header card-header-stretch">
        <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>
          <span className='card-label fw-bolder fs-3 mb-1'>Users</span>
          <span className='fs-6 text-gray-400 fw-bold ms-1'>{selectedOption === 'all' ? 'all' : 'investor'}</span>
        </h3>
        </div>

        <div className='d-flex my-2' >
        <div className='d-flex my-2'>
          <select
            name='status'
            data-control='select2'
            data-hide-search='true'
            className='form-select form-select-white form-select-sm w-125px'
            defaultValue='all'
            onChange={handleSelectChange}
          >
            <option value='all'>All</option>
            <option value='startup'>SMEs</option>
            <option value='investor'>Investors</option>
          </select>
        </div>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <a
            href='http://frontend.tokenopp.org/metronic8/react/demo1/AddUser/'
            className='btn btn-sm btn-light-primary'
          >
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            Add
          </a>
        </div>
        </div>

      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
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
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
      </div>
      </div>
    </>
  )
}
