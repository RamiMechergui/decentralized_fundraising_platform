/* eslint-disable jsx-a11y/anchor-is-valid */
import React , { useEffect , useState } from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../_metronic/helpers'
import { Card4 } from './Card4'
import axios from 'axios';

export interface ApplicationDataInterface {
  company_name: string
  user_ID: string
  company_email: string
  company_website: string
  country: string
  state_of_funding: string 
  activity_sector: string
  activity_description: string 
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
  date:string
}

export interface Uploaded_files_Interface {
  pitch_video: string 
  legal_status: string
  business_registration_number: string
  member_cv: string
  business_plan: string
  market_analysis: string
  balance_sheet: string
  cash_flow_statement: string
  equity_statement: string
  income_statement: string
  additional_information: string
}

const Uploaded_files_Initilization : Uploaded_files_Interface = {
  pitch_video: '' ,
  legal_status: '' ,
  business_registration_number: '' ,
  member_cv: '' ,
  business_plan: '' ,
  market_analysis: '' ,
  balance_sheet: '' ,
  cash_flow_statement:'' ,
  equity_statement: '' ,
  income_statement: '' ,
  additional_information: '' ,
}
const Application_Initilization: ApplicationDataInterface = {
  company_name: '',
  user_ID: '',
  company_email: '',
  company_website: '',
  country: '',
  state_of_funding: '', 
  activity_sector : '',
  activity_description: '', 
  pitch_video: '', 
  legal_status: '',
  business_registration_number: '',
  member_name: '',
  member_surname: '',
  member_occupation: '',
  member_cv: '',
  business_plan: '',
  market_analysis: '',
  balance_sheet: '',
  cash_flow_statement: '',
  equity_statement: '',
  income_statement: '',
  additional_information: '',
  date :''
}
export function Overview() {

  const [ApplicationData, setApplicationData] = useState<ApplicationDataInterface>(Application_Initilization)
  const [UploadedFiles, setUploadedFiles] = useState<Uploaded_files_Interface>(Uploaded_files_Initilization)

  useEffect(()=>{
    const getDemand = async () => {
      try {
        const response = await axios.get('http://backend.tokenopp.org/api/startup/demands/mydemand');
        setApplicationData(response.data)
        setUploadedFiles({
          pitch_video: response.data.pitch_video ,
          legal_status: response.data.legal_status,
          business_registration_number: response.data.business_registration_number ,
          member_cv: response.data.member_cv ,
          business_plan: response.data.business_plan ,
          market_analysis: response.data.market_analysis ,
          balance_sheet: response.data.balance_sheet ,
          cash_flow_statement:response.data.cash_flow_statement ,
          equity_statement: response.data.equity_statement ,
          income_statement: response.data.income_statement ,
          additional_information: response.data.additional_information ,
        })
        console.log(UploadedFiles)
        return response.data
      } catch (error) {
        console.error('Error getting book:', error);
      }
    };
    const Data= getDemand()
  },[])

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'> Application Details</h3>
          </div>

          <Link to='/startup/update' className='btn btn-primary align-self-center'>
            Edit Application
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Company Name </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.company_name} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Company Email </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.company_email} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Company Website </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.company_website} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Country </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.country} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> State of funding </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.state_of_funding} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Activity Sector </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.activity_sector} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Business Description </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.activity_description} </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Member Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{ApplicationData.member_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Member Surname</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{ApplicationData.member_surname}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Member Occupation </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'> {ApplicationData.member_occupation}</span>
            </div>
          </div>
        
          <div className='row mb-10'>
            <div className='card-title m-0'>
               <h3 className='fw-bolder m-0'> Uploaded Files </h3>
            </div>
            <Card4 icon='/media/svg/files/' Uploaded_on={ApplicationData.date} description='5 days ago'  UploadedFiles={UploadedFiles}/>
          </div>
        </div>
      </div>
    </>
  )
}
