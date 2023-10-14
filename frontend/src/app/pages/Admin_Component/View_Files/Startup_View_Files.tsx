import { useState } from 'react'
import React from 'react'
import {FC} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { FileDownloader } from './S_File_Downloader'


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

type SelectedFields = {
  pitch_video: string 
  legal_status: string
  member_cv: string
  business_plan: string
  market_analysis: string
  balance_sheet: string
  cash_flow_statement: string
  equity_statement: string
  income_statement: string
  additional_information: string
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
      pitch_video:  item.pitch_video,
      legal_status: item.legal_status,
      member_cv: item.member_cv,
      business_plan: item.business_plan,
      market_analysis: item.market_analysis,
      balance_sheet: item.balance_sheet,
      cash_flow_statement: item.cash_flow_statement,
      equity_statement: item.equity_statement,
      income_statement: item.income_statement,
      additional_information: item.additional_information,
  }
  const Uploaded_On: string = item.date !== undefined ? item.date : ''

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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ViewFiles };