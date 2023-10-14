/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import React from 'react'
import {FC} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type InvestorDemand = {
  user_ID: string
  investor_name : string
  investor_surname : string
  investor_email : string
  investor_phone_number : string
  nationality  : string
  passport_ID : string
  Social_Security_Number: string
  Tax_ID: string
  investor_type:string
  annual_income: string
  investment_experience: string
  risk_tolerance: string
  investment_objective : string
  preferred_investment : string
  bank_account : string 
  investment_primary_goal:string
  investor_reaction :string
  investment_time_horizon:string
  previous_investment_experience : string
  down_market_tolerance : string
  loss_tolerance :string
  risk_attitude : string 
  Status : string
  date?:string
}

interface Props {
  item: InvestorDemand;
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
          <Modal.Title> Application Full Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investor Name </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investor_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investor Surname </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investor_surname}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investor Email </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investor_email}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investor Phone Number </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investor_phone_number}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Nationality </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.nationality}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Tax ID </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.Tax_ID}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investor Type </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investor_type}</span>
            </div>
          </div>


          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Annual Income </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.annual_income}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investment Experience </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investment_experience}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investment Objective </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investment_objective}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Preferred Investment </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.preferred_investment}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Bank Account </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.bank_account}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investment Primary Goal </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investment_primary_goal}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investor Reaction </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investor_reaction}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Investment Time Horizon </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.investment_time_horizon}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Previous Investment Experience </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.previous_investment_experience}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Down Market Tolerance </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.down_market_tolerance}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Loss Tolerance </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.loss_tolerance}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold '> Risk Attitude </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {item.risk_attitude}</span>
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