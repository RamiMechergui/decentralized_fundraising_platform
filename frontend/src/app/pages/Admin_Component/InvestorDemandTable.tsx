import React from 'react'
import {FC} from 'react'
import {KTSVG} from '../../../_metronic/helpers/index'
import { CustomSelect } from './View_Details/InvestorSelect'
import { ViewFiles } from '../Admin_Component/View_Files/Investor_View_Files'
import { ViewDetails } from './View_Details/InvestorViewDetails'

type InvestorDemandItem = {
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
  date:string
}

type Props = {
  tab_title: string
  investorDemands : InvestorDemandItem[]
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
}

const InvestorDemandTable : FC<Props> = ({tab_title,investorDemands}) => {
 
  return (
    <div className={`card ${tab_title}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{tab_title}</span>
          <span className='text-muted mt-1 fw-bold fs-7'> { investorDemands.length }</span>
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
                <th className='min-w-150px text center'>Request Id</th>
                <th className='min-w-140px text center'>Investor Name</th>
                <th className='min-w-140px text center'>Investor Surname</th>
                <th className='min-w-120px text center'>Date</th>
                <th className='min-w-120px text center'>Country</th>
                <th className='min-w-120px text center'>Status</th>
                <th className='min-w-100px text center'>Decision</th>
                <th className='min-w-100px text center'>Check</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
          {/* Render the list of startupDemands items */}
          {investorDemands.map((item, index) => (
            <tr key={index}>
              <td>
                <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                   INVS-{index+1}
                </span>
              </td>
              <td>
                <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  {item.investor_name}
                </span>
              </td>
              <td>
                <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  {item.investor_surname}
                </span>
              </td>
              <td>
                <span  className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  {formatDate(new Date(item.date))}
                </span>
              </td>
              <td>
                <span className='fw-bold d-block fs-7'>{item.nationality}</span>
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
export {InvestorDemandTable}