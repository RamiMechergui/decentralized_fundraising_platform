/* eslint-disable jsx-a11y/anchor-is-valid */
import React , {useState}from 'react'
import {FC} from 'react'
import {ViewDetails} from './View_Details/StartupViewDetails' 
import {KTSVG} from '../../../_metronic/helpers/index'
import { ViewFiles } from '../Admin_Component/View_Files/Startup_View_Files'
import { CustomSelect } from './View_Details/StartupSelect'

type StartupDemandItem = {
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
  date:string
}


type Props = {
  tab_title: string
  startupDemands : StartupDemandItem[]
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
}

const StarupDemandTable : FC<Props> = ({tab_title,startupDemands}) => {
 
  return (
    <div className={`card ${tab_title}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{tab_title}</span>
          <span className='text-muted mt-1 fw-bold fs-7'> { startupDemands.length }</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          {/* begin::Menu 2 */}
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px'
            data-kt-menu='true'
          >
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <div className='menu-content fs-6 text-dark fw-bolder px-3 py-4'>Quick Actions</div>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mb-3 opacity-75'></div>
            <div
              className='menu-item px-3'
              data-kt-menu-trigger='hover'
              data-kt-menu-placement='right-start'
              data-kt-menu-flip='left-start, top'
            >
              {/* begin::Menu item */}
              <a href='#' className='menu-link px-3'>
                <span className='menu-title'>New Group</span>
                <span className='menu-arrow'></span>
              </a>
              {/* end::Menu item */}
              {/* begin::Menu sub */}
              <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Admin Group
                  </a>
                </div>
              </div>
              {/* end::Menu sub */}
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Contact
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mt-3 opacity-75'></div>
          </div>
          {/* end::Menu 2 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-150px'>Request Id</th>
                <th className='min-w-140px'>Company</th>
                <th className='min-w-120px'>Date</th>
                <th className='min-w-120px'>Country</th>
                <th className='min-w-120px'>Activity</th>
                <th className='min-w-120px'>Status</th>
                <th className='min-w-100px'>Decision</th>
                <th className='min-w-100px'>Check</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
          {/* Render the list of startupDemands items */}
          {startupDemands.map((item, index) => (
            <tr key={index}>
              <td>
                <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                   STUP-{index+1}
                </span>
              </td>
              <td>
                <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  {item.company_name}
                </span>
              </td>
              <td>
                <span  className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  {formatDate(new Date(item.date))}
                </span>
              </td>
              <td>
                <span className='fw-bold d-block fs-7'>{item.country}</span>
              </td>
              <td>
                <span className='fw-bold d-block fs-7'>{item.activity_sector}</span>
              </td>
               <CustomSelect
                status={item.Status}
                user_ID={item.user_ID}
              />
              <td>
                <ViewDetails item={item} />
              </td>
              <td>
                <ViewFiles item={item} />
              </td>
            </tr>
          ))}
        </tbody>
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {StarupDemandTable}