/* eslint-disable jsx-a11y/anchor-is-valid */
import React , {useEffect,useState}from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useLocation} from 'react-router'
import axios from 'axios';
import { Statuscard } from './statuscard'

export interface HeaderDataInterface {
     investor_name : string
     investor_surname : string
     investor_email : string
     date :  string
     nationality : string
     status : string
}

const Header_Initilization : HeaderDataInterface = {
     investor_name : '',
     investor_surname : '',
     investor_email : '',
     date :  '',
     nationality : '',
     status : ''
}

function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
const AccountHeader: React.FC = () => {
  const location = useLocation()
  const [HeaderData, setHeaderData] = useState<HeaderDataInterface>(Header_Initilization)

useEffect(()=>{
    const getDemand = async () => {
      try {
        const response = await axios.get('http://backend.tokenopp.org/api/investor/demands/mydemand');
        const response2 = await axios.get('http://backend.tokenopp.org/api/investor/demands/demandowner')
        console.log(response.data)
        setHeaderData({
          investor_name : response.data.investor_name,
          investor_surname : response.data.investor_surname,
          investor_email : response.data.investor_email,
          date :  response.data.date,
          nationality : response.data.nationality,
          status: response2.data.KYC_Status
        })
        console.log('hello world')
        return response.data
      } catch (error) {
        console.error('Error data from database:', error);
      }
    };
    const Data= getDemand()
  },[])

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-row flex-sm-nowrap mb-3'>
          <div className='flex-grow-1'>

                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1 text-uppercase'>
                    {HeaderData.investor_name} {HeaderData.investor_surname}
                  </a>
                  <div className='flex-grow-1 d-flex flex-row justify-content-end '>
                    {/*<span className='badge badge-light-warning fs-5 fw-bolder'> {HeaderData.status} </span> */}  
                    <Statuscard status={HeaderData.status} />                  
                  </div>
                </div>
          </div>
        </div>

        <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com006.svg'
                      className='svg-icon-4 me-1'
                    />
                    {formatDateTime(HeaderData.date)}
                  </a>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/investor/check' && 'active')
                }
                to='/investor/check'
              >
                Overview
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/investor/update' && 'active')
                }
                to='/investor/update'
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {AccountHeader}
