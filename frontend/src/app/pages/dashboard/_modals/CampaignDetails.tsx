
import React, { useEffect, useState } from 'react';
import { CampaignModel } from '../models/CampaignModel';
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers';
import { Dropdown1 } from '../../../../_metronic/partials';
import { BuyTokenModel } from '../models/BuyTokenModel';
import axios from 'axios';
import { connect } from 'react-redux';
import DataTable, { TableColumn } from 'react-data-table-component';
import ContactForm from './ContactForm';
import { Modal } from 'react-bootstrap-v5';

interface CampaignDetailsProps {
  token: BuyTokenModel[];
  accessToken: string;
  campaign: CampaignModel[];

}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ accessToken }) => {
  const [tokenData, setTokenData] = useState< BuyTokenModel[]>([]);
  const [campaignData,setcampaignData]=useState<CampaignModel[]>([]);
  const [rejectionData,setrejectionData]=useState<CampaignModel[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);

    useEffect(() => {
      axios
        .get('http://backend.tokenopp.org/api/buy/allbuytoken', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Replace with the actual access token from your frontend authentication.
          },
        })
        .then((response) => {
          setTokenData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching token data:', error);
        });
    }, []);
    useEffect(() => {
      console.log(tokenData);
  
    }, [tokenData]);
    useEffect(() => {
      axios
        .get('http://backend.tokenopp.org/api/campaign/campaignDetails', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Replace with the actual access token from your frontend authentication.
          },
        })
        .then((response) => {
          setcampaignData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching token data:', error);
        });
    }, []);
    useEffect(() => {
      axios
        .get('http://backend.tokenopp.org/api/campaign/rejectionDetails', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Replace with the actual access token from your frontend authentication.
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
      console.log(campaignData);
  
    }, [campaignData]);

    const columns: TableColumn<BuyTokenModel>[] = [
      {
        name: 'Investor',
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: 'Amount of Invest',
        selector: (row) => row.amount,
        sortable: true,
      },
      {
        name: 'Amount of Tokens',
        selector: (row) => row.quantity,
        sortable: true,
      },
      {
        name: 'Date',
        selector: (row) => (row.Date ? row.Date.toString() : ''),
        sortable: true,
      },
    ];


  return (   
    <>
    <div className='card mb-5 mb-xl-10'>
         <div className='card-body pt-9 pb-0'>
           <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>


             <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    Company Name
                  </a>
                  <a href='#'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen026.svg'
                      className='svg-icon-1 svg-icon-primary' />
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com006.svg'
                      className='svg-icon-4 me-1' />
                    Tech Domaine
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/general/gen018.svg'
                      className='svg-icon-4 me-1' />
                     Localisation 
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1' />
                    Email
                  </a>
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2' />
                      <div className='fs-2 fw-bolder'>{parseFloat(campaignData[0]?.totalRaised).toLocaleString('en')}$</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Fund Raised</div>
                  </div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2' />
<div className='fs-2 fw-bolder'>{parseFloat(campaignData[0]?.amount).toLocaleString('en')}$</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Goal</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-danger me-2' />
                      <div className='fs-2 fw-bolder'>{campaignData[0]?.investorsCount}</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Numbers of Investors</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2' />
                      <div className='fs-2 fw-bolder'>{campaignData[0]?.percentageofcompletation}%</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Success Rate</div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Days to End Campaign</span>
                  <span className='fw-bolder fs-6'>{campaignData[0]?.timetocompletation} /{campaignData[0]?.duration} </span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{ width: `${campaignData[0]?.percentageoffinish}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="card">
        <div className="card-header card-header-stretch">
          <div className="card-title">
            <h3 className="m-0 text-gray-800">Campaign Details</h3>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
          <DataTable
              columns={columns}
              data={tokenData}
              pagination
              highlightOnHover
              defaultSortFieldId="amount"
              defaultSortAsc
              striped
              pointerOnHover
              selectableRows
              selectableRowsHighlight
              selectableRowsNoSelectAll
            />
          </div>
        </div>
      </div>
      <div className="card">
  <div className='card-header card-header-stretch'>
    <div className='card-title m-0'>
      <h3 className='m-0 text-gray-800'>Rejection Details</h3>
    </div>
    <div className='card-body p-9'>
      {rejectionData[0]?.status==='Rejected'? (
        <>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Rejection Motif</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'> {rejectionData[0].motifRejection}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Rejected By</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'> {rejectionData[0]?.rejectedBy}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Rejected At</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'> {rejectionData[0]?.rejectDate}</span>
            </div>
          </div>
          <div className='row mb-7'>
          <label className='col-lg-4 fw-bold text-muted'></label>

          <div className='col-lg-8'>
          <button
          className="btn btn-primary btn-sm flex-shrink-0 me-3"
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
        </Modal.Body>
        {/* You can also add a footer here if needed */}
      </Modal>

  </div>
</div>

      
      
      </>
  );
};
const mapStateToProps = (state: { auth: { accessToken: any; }; }) => {
  return {
    accessToken: state.auth.accessToken, // Assuming the access token is stored in auth slice of the Redux store
  };
};
export default connect(mapStateToProps) (CampaignDetails);