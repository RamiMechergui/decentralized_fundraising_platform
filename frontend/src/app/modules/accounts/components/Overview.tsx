/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  ChartsWidget1,
  TablesWidget1,
  ListsWidget5,
  TablesWidget5,
} from '../../../../_metronic/partials/widgets'
import axios from 'axios';
import { UserModel } from '../../auth/models/UserModel';
interface detailsProps {
  accessToken: string;
}
export function Overview({ accessToken }:detailsProps) {
  const location = useLocation();
  const [user, setUser] =useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint URL on your backend server
     // Replace this with the actual URL of your backend API

    // Make the API request using axios
    axios
      .get('http://backend.tokenopp.org/api/auth/setuser', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Replace with the actual access token from your frontend authentication.
        },
      })
      .then((response) => {
        setUser(response.data); // Update the user state with the response data
        setLoading(false); // Set loading to false once the request is completed
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false even in case of an error
      });
  }, []);
  useEffect(() => {
    console.log(user); // Logs the updated campaignData whenever it changes

  }, [user]);
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link to='/crafted/account/settings' className='btn btn-primary align-self-center'>
            Edit Profile
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>
  
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'> {user[0]?.firstName} {user[0]?.lastName}</span>
            </div>
          </div>


          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Contact Phone
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'> {user[0]?.phone}</span>

              {/* <span className='badge badge-success'>Verified</span> */}
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              User Type
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='You cant change user type'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'> {user[0]?.userType}</span>

            </div>
          </div>


          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Country
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Country of origination'
              ></i>
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'> {user[0]?.localisation}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{user[0]?.email}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Account Address
            <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='This address of your ethereum account in Blockchain you cannot Edit it'
              ></i>
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{user[0]?.address}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Payment Method</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{user[0]?.paymentMethod}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>RIB</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{user[0]?.rib}</span>
            </div>
          </div>


          {/* <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
            <KTSVG
              path='icons/duotune/general/gen044.svg'
              className='svg-icon-2tx svg-icon-warning me-4'
            />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>We need your attention!</h4>
                <div className='fs-6 text-gray-600'>
                  Your payment was declined. To start using tools, please
                  <Link className='fw-bolder' to='/crafted/account/settings'>
                    {' '}
                    Add Payment Method
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>




    </>
  )
}
