/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import React from 'react'
import {FC} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { StartUpOverview  } from './Startup_Overview'

type StartupDemand = {
  company_name: string
  user_ID: string
  company_email: string
  company_website: string
  country: string
  state_of_funding: string 
  activity_description: string 
  activity_sector : string
  pitch_video: string 
  legal_status: string
  business_registration_number: string
  member_name: string
  member_surname: string
  member_occupation: string
  member_cv: string
  business_plan: string
  market_analysis: string
  balance_sheet: string
  cash_flow_statement: string
  equity_statement: string
  income_statement: string
  additional_information: string
  Status : string
  date?:string
}

interface Props {
  item: StartupDemand;
}


const ViewDetails : FC<Props> = ({item}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Full Details
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> {item.company_name} Application Full Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Company Name </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {item.company_name} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold'> Company Email </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {item.company_email} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold'> Company Website </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {item.company_website} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold'> Country </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {item.country} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold'> State of funding </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {item.state_of_funding} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold'> Activity Sector </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {item.activity_sector} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Business Description </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {item.activity_description} </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '>Member Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{item.member_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '>Member Surname</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{item.member_surname}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Member Occupation </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.member_occupation}</span>
            </div>
          </div>
        </div>
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export {ViewDetails};