import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface TokenFormProps {
  accessToken: string;
}

const TokenForm: React.FC<TokenFormProps> = ({ accessToken }) =>  {
  const [campaignName, setCampaignName] = useState('');
  const [montant,setMontant]=useState('');
  const [actionType, setActionType] = useState('share');
  const [shares,setShares]=useState('');
  const [numberOfInvestors,setNumberOfInvestors]=useState('');
  const history = useHistory();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    // Prepare the data object with the form values
    const data = {
      campaignName,
      montant,
      actionType,
      shares,
      numberOfInvestors
    };

  
      // Make the API call
      fetch('http://backend.tokenopp.org/api/token/addcampaigntoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Use the accessToken from Redux store

        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Token purchase successful:', data);
        // Reset the form


        // Redirect to the dashboard page
        history.push('/dashboard');
      })
      .catch((error) => {
        console.error('Error purchasing tokens:', error);
      });
  }


  const handleCancel = () => {
    // Perform any necessary cleanup or additional logic here
    // Redirect to the dashboard page
    history.push('/dashboard');
  };

  return (
    <div className="buy-tokens-popup">
      <div className="modal-content rounded">
        <div className="modal-header pb-0 border-0 justify-content-end">
          <div className="btn btn-sm btn-icon btn-active-color-primary" >
            <i className="ki-duotone ki-cross fs-1">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
          </div>
        </div>
        <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="CampaignName" className="form-label">
                Campaign Name:
              </label>
              <input
                type="text"
                id="CampaignName"
                className="form-control"
                placeholder="Enter Campaign Name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="montant" className="form-label">
                amount of money to raise:
              </label>
              <input
                type="number"
                id="montant"
                className="form-control"
                placeholder="Enter the amount of money you want to raise "
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="actionType" className="form-label">
                Action Type:
              </label>
              <select
                id="actionType"
                className="form-control"
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
              >
                <option value="share">Share</option>
                <option value="debt">Debt</option>
                <option value="revenue sharing">Revenue Sharing</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="shares" className="form-label">
                Percentage of shares:
              </label>
              <input
                type="number"
                id="shares"
                className="form-control"
                placeholder="Enter Percentage of shares"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="numberOfInvestors" className="form-label">
              number Of Investors:
              </label>
              <input
                type="number"
                id="numberOfInvestors"
                className="form-control"
                placeholder="Enter duration"
                value={numberOfInvestors}
                onChange={(e) => setNumberOfInvestors(e.target.value)}
                required
              />
            </div>

            <div className="text-center">
              <button type="button" className="btn btn-light me-3" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: { auth: { accessToken: any; }; }) => {
  return {
    accessToken: state.auth.accessToken, // Assuming the access token is stored in auth slice of the Redux store
  };
};
export default connect(mapStateToProps)(TokenForm);
