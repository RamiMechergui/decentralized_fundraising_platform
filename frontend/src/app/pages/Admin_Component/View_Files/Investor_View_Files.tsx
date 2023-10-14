import { useState } from 'react'
import React from 'react'
import {FC} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { FileDownloader } from './V_File_Downloader'

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

type SelectedFields = {
  passport_ID : string
  Social_Security_Number: string
};

function getFileExtension(fileName: string): string {
  const parts: string[] = fileName.split('.');
  const extensions: string[] = ["png","mp4","ai", "css", "doc", "fig", "jpg", "pdf", "sql", "tif", "webp", "xml"];
  
  const poppedExtension: string | undefined = parts.pop();
  if (poppedExtension) {
      const lowercaseExtension: string = poppedExtension.toLowerCase();
      if (extensions.includes(lowercaseExtension)) {
          return lowercaseExtension;
      } else {
          return "unknown";
      }
  }
  
  return "unknown"; // Handle the case when the fileName has no extension
}

function getTimePassedFromNow(dateString: string): string {
  const now = new Date();
  const pastDate = new Date(dateString);
  const timeDifference = now.getTime() - pastDate.getTime();

  // Convert time difference to seconds, minutes, and days
  const secondsPassed = Math.floor(timeDifference / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (secondsPassed < 60) {
    return `${secondsPassed} seconds ago`;
  } else if (minutesPassed < 5) {
    return `${minutesPassed} minutes ago`;
  } else if (daysPassed < 1) {
    return 'today';
  } else {
    return `${daysPassed} days ago`;
  }
}


const ViewFiles : FC<Props> = ({item}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const icon='/media/svg/files/'
  const UploadedFiles : SelectedFields = {
      passport_ID : item.passport_ID,
      Social_Security_Number: item.Social_Security_Number,
  }
  const Uploaded_On: string = item.date !== undefined ? item.date : '';
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Uploaded Files
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Uploaded Files </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='card h-100'>
             {Object.entries(UploadedFiles).map(([key, value]) => (
               <div key={key} className='card-body d-flex justify-content-center text-center flex-column p-8'>
                   <a href='#' className='text-gray-800 text-hover-primary d-flex flex-column'>
                   <div className='fw-bolder mb-2 text-dark align-self-start text-uppercase'>{key.replace(/_/g, ' ')}</div>
                   <div className='symbol symbol-75px mb-6'>
                     <img src={toAbsoluteUrl(icon+getFileExtension(value)+'.svg')} alt='' />
                   </div>
                   <div className='fs-5 fw-bolder mb-2'>{value}</div>
                 </a>
                 <div className='fs-7 fw-bold text-gray-400 mt-auto'>{getTimePassedFromNow(Uploaded_On)}</div>
                 <FileDownloader user_ID={item.user_ID} FileName={value}  />
               </div>
             ))}
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

export { ViewFiles };