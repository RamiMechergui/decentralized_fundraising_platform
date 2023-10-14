import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CampaignModel } from '../../../pages/dashboard/models/CampaignModel';
import ContactForm from '../../../pages/dashboard/_modals/ContactForm';
interface CampaignDetailsProps {
    accessToken: string;
    campaign: CampaignModel[];
  
  }
const RequestDetails: React.FC<CampaignDetailsProps> = ({ accessToken }) => {

  const [showContactForm, setShowContactForm] = useState(false);
  const [rejectionData,setrejectionData]=useState<CampaignModel[]>([]);

  useEffect(() => {
    axios
      .get('http://backend.tokenopp.org/api/buy/rejectionDetails', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
      })
      .then((response) => {
        setrejectionData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching token data:', error);
      });
  }, []);

  useEffect(() => {
    console.log(rejectionData);

  }, [rejectionData]);
  return (
    <div className='card-header card-header-stretch'>
      <div className='card-title m-0'>
        <h3 className='m-0 text-gray-800'>Rejection Details</h3>
      </div>
      <div className='card-body p-9'>
        {rejectionData[0]?.status === 'rejected' ? (
          <>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Rejection Motif</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {rejectionData[0]?.motifRejection}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Rejected By</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {rejectionData[0]?.rejectedBy}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Rejected At</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {rejectionData[0]?.rejectDate}
                </span>
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'></label>
              <div className='col-lg-8'>
                <button
                  className='btn btn-primary btn-sm flex-shrink-0 me-3'
                  onClick={() => setShowContactForm(true)}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>No rejection details available</p>
        )}
      </div>

      <Modal show={showContactForm} onHide={() => setShowContactForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ContactForm rejectedBy={rejectionData[0]?.rejectedBy} />
          {/* <p>Rejected By: {rejectionData[0]?.rejectedBy}</p> */}
        </Modal.Body>
        {/* You can also add a footer here if needed */}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: { auth: { accessToken: any; }; }) => {
    return {
      accessToken: state.auth.accessToken, // Assuming the access token is stored in auth slice of the Redux store
    };
  };
  export default connect(mapStateToProps) (RequestDetails);
