import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {BuyTokenSucess} from './BuyTokenSucess'

interface BuyTokenForm {
  accessToken: string;
}
const BuyTokensPopup :React.FC<BuyTokenForm> = ({ accessToken })=> {
  const [tokenName, setTokenName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('virement bancaire');

  const history = useHistory();
  const location = useLocation();

 

  const handleQuantityChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setQuantity(event.target.value);
  };

  const handlePaymentMethodChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPaymentMethod(event.target.value);
  };

  useEffect(() => {
    const url = window.location.href;
    const tokenIndex = url.lastIndexOf(':token=');
    if (tokenIndex !== -1) {
      const tokenName = url.substring(tokenIndex + 7);
      setTokenName(tokenName);
    }
  }, []);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const formData = {
      quantity,
      paymentMethod,
      tokenName:tokenName
    };

    // Send a POST request to the API endpoint
    fetch('http://backend.tokenopp.org/api/buy/buytokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Use the accessToken from Redux store

      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Token purchase successful:', data);
        // Reset the form

        setQuantity('');
        setPaymentMethod('virement bancaire');
        window.alert('Your Token purchase demand is send successful');

        // Redirect to the dashboard page
        history.push('/dashboard');
      })
      .catch((error) => {
        console.error('Error purchasing tokens:', error);
      });
  };

  const handleCancel = () => {
    // Perform any necessary cleanup or additional logic here
    // Redirect to the dashboard page
    history.push('/dashboard');
  };

  return (
    <div className="buy-tokens-popup">
      <div className="modal-content rounded">
        <div className="modal-header pb-0 border-0 justify-content-end">
          <div className="btn btn-sm btn-icon btn-active-color-primary" data-kt-modal-action-type="close">
            <i className="ki-duotone ki-cross fs-1">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
          </div>
        </div>
        <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="quantity" className="form-label">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                className="form-control"
                placeholder="Enter the desired quantity"
                value={quantity}
                onChange={handleQuantityChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="payment" className="form-label">
                Payment Method:
              </label>
              <select
                id="payment"
                className="form-control"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="crypto">Crypto Currency</option>
              </select>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-light me-3" onClick={handleCancel}>
                Cancel
              </button>
              <BuyTokenSucess />
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
export default connect(mapStateToProps)(BuyTokensPopup);
