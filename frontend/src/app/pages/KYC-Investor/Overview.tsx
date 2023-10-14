/* eslint-disable jsx-a11y/anchor-is-valid */
import React , { useEffect , useState } from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../_metronic/helpers'
import { Card4 } from './Card4'
import axios from 'axios';

export interface ApplicationDataInterface {
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
  date:string
}

export interface Uploaded_files_Interface {
  passport_ID : string
  Social_Security_Number: string
}

const Uploaded_files_Initilization : Uploaded_files_Interface = {
  passport_ID : '',
  Social_Security_Number: ''
}
const Application_Initilization: ApplicationDataInterface = {
  user_ID: '',
  investor_name : '',
  investor_surname : '',
  investor_email : '',
  investor_phone_number : '',
  nationality  : '' , 
  passport_ID : '',
  Social_Security_Number: '' ,
  Tax_ID: '' , 
  investor_type:'' ,
  annual_income: '',
  investment_experience: '',
  risk_tolerance: '',
  investment_objective :'' , 
  bank_account :'' , 
  investment_primary_goal:'' , 
  investor_reaction :'' , 
  investment_time_horizon:'' , 
  previous_investment_experience :'' , 
  down_market_tolerance :'' , 
  loss_tolerance :'' , 
  risk_attitude :'' , 
  preferred_investment : '' ,
  date :'',
}
export function Overview() {

  const [ApplicationData, setApplicationData] = useState<ApplicationDataInterface>(Application_Initilization)
  const [UploadedFiles, setUploadedFiles] = useState<Uploaded_files_Interface>(Uploaded_files_Initilization)

  useEffect(()=>{
    const getDemand = async () => {
      try {
        const response = await axios.get('http://backend.tokenopp.org/api/investor/demands/mydemand');
        setApplicationData(response.data)
        setUploadedFiles({
          Social_Security_Number: response.data.Social_Security_Number ,
          passport_ID: response.data.passport_ID,
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

          <Link to='/investor/update' className='btn btn-primary align-self-center'>
            Edit Application
          </Link>
        </div>
        <div className='card-body p-9'>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Investor Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{ApplicationData.investor_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Investor Surname</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{ApplicationData.investor_surname}</span>
            </div>
          </div>



          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Investor Email </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.investor_email} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> investor_phone_number</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.investor_phone_number} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Investor nationality </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.nationality} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> Tax_ID </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.Tax_ID} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> investor_type </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.investor_type } </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> annual_income </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.annual_income} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> investment experience </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.investment_experience} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> risk_tolerance </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.risk_tolerance} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> investment_objective </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.investment_objective} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> bank_account </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.bank_account} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> investment_primary_goal </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.investment_primary_goal } </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> investor_reaction </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.investor_reaction} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> investment_time_horizon </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.investment_time_horizon} </span>
            </div>
          </div>
        
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> previous_investment_experience </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.previous_investment_experience} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> down_market_tolerance </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.down_market_tolerance} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> loss_tolerance </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.loss_tolerance} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> risk_attitude </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.risk_attitude} </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'> preferred_investment </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'> {ApplicationData.preferred_investment} </span>
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
