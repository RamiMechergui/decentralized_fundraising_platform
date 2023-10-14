import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { TokenModel } from '../../../pages/dashboard/models/TokenModel';

interface RouteParams {
    id: string; // Assuming "id" is a string, change the type if it's different
}
export const CampaignDemandUpdate: React.FC = () =>  {
 
    const history = useHistory();
    const { id } = useParams<RouteParams>(); // Destructure the "id" parameter from useParams
    console.log(id);
    const [data, setData] = useState<TokenModel | null>(null); // Initialize data state with null
    const [readyToStart, setReadyToStart] = useState<boolean>(data?.readyToStart === 1);
    const [RedemptionType, setRedemptionType] = useState('yearly');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://backend.docker.local/api/campaign/getToken/${id}`);
          console.log('gh',response.data);
          setData(response.data); // Update the data state with the response data

          setReadyToStart(response.data?.readyToStart === 1);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [id]); // Add "id" to the dependency array to refetch data when the "id" parameter changes
  
    if (!data) {
      return <div>Loading...</div>;
    }  

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
          // Make the API call to update the user
          await axios.put(`http://backend.docker.local/api/campaign/updateCampaign/${id}`, {
            tokenName: data?.tokenName, // Use the user state to get the updated name and email
            tokenSymbol: data?.tokenSymbol,
            tokenTotalSupply:data?.tokenTotalSupply,
            tokenPrice:data?.tokenPrice,
            minInvest:data?.minInvest,
            maxInvest:data?.maxInvest,
            duration:data?.duration,
            RedemptionType:RedemptionType,
            yieldValue:data?.yieldValue,
            actionType:data?.actionType,
            amount:data?.amount,
            readyToStart: readyToStart ? 1 : 0,

          });
          
    
          // Redirect to the dashboard page after successful update
          history.push('/crafted/pages/profile/campaigns');
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    const handleCancel = () => {
        // Redirect to the dashboard page
        history.push('/crafted/pages/profile/campaigns');
      };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the user state when the input fields change
        setData({
          ...data,
          [event.target.name]: event.target.value,
        });
      };  

      return (
        <div className="buy-tokens-popup">
        <div className="modal-content rounded">
        <div className="modal-header pb-0 border-0 justify-content-center">

            <h3 className='fw-bolder my-2'>Tokenomics</h3>
        </div>
          <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="tokenName" className="form-label">
              Token Name 
              </label>
              <input
                type="text"
                id="tokenName"
                name="tokenName"
                className="form-control"
                defaultValue={data.tokenName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tokenSymbol" className="form-label">
              Token Symbol 
              </label>
              <input
                type="text"
                id="tokenSymbol"
                name="tokenSymbol"
                className="form-control"
                defaultValue={data.tokenSymbol}
                onChange={handleInputChange}
                required
              />
            </div>

          
            <div className="mb-4">
              <label htmlFor="tokenTotalSupply" className="form-label">
                Token Total Supply  (Quantity of tokens)
              </label>
              <input
                type="text"
                id="tokenTotalSupply"
                name="tokenTotalSupply"
                className="form-control"
                defaultValue={data.tokenTotalSupply}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tokenPrice" className="form-label">
              Token Price (price/token)
              </label>
              <input
                type="text"
                id="tokenPrice"
                name="tokenPrice"
                className="form-control"
                defaultValue={data.tokenPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="minInvest" className="form-label">
              Minimum Invest (Price of single Token) = Token Price
              </label>
              <input
                type="text"
                id="minInvest"
                name="minInvest"
                className="form-control"
                defaultValue={data.minInvest}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maxInvest" className="form-label">
              Maximum Invest (Price of all Tokens) = Token Price * Total Supply
              </label>
              <input
                type="text"
                id="maxInvest"
                name='maxInvest'
                className="form-control"
                value={data.maxInvest}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="form-label">
              Duration of Campaign
              </label>
              <input
                type="number"
                id="duration"
                name='duration'
                className="form-control"
                value={data.duration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="RedemptionType" className="form-label">
                 Redemption Type
               </label>
                  <select
                   id="RedemptionType"
                   name="RedemptionType"
                    className="form-control"
                     value={RedemptionType}
                     onChange={(e) => setRedemptionType(e.target.value)}
                     required
                       >
                 <option value="yearly">Yearly</option>
                 <option value="monthly">Monthly</option>
                 <option value="quarterly">Quarterly</option>
                   </select>
               </div>

            <div className="mb-4">
              <label htmlFor="yieldValue" className="form-label">
              Yield Value
              </label>
              <input
                type="text"
                id="yieldValue"
                name='yieldValue'
                className="form-control"
                value={data.yieldValue}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="actionType" className="form-label">
              Action Type
              </label>
              <input
                type="text"
                id="actionType"
                name='actionType'
                className="form-control"
                value={data.actionType}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="form-label">
              Amount of money to be collected
              </label>
              <input
                type="text"
                id="amount"
                name='amount'
                className="form-control"
                value={data.amount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 form-check">
               <input
                 type="checkbox"
                 id="readyToStart"
                 name="readyToStart"
                 className="form-check-input"
                 checked={readyToStart}
                 onChange={(e) => setReadyToStart(e.target.checked)}
               />
               <label htmlFor="readyToStart" className="form-check-label">
                 Ready to Start
               </label>
            </div>

            <div className="text-center">
              <button type="button" className="btn btn-light me-3" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {readyToStart ? 'Ready To Start' : 'Update'}
              </button> 
              {/* <button type="button" className="btn btn-success" onClick={handleReadyToStart}>
                Ready To Start
              </button>  */}
            </div>

          </form>
        </div>
        </div>
        </div>
    
  );
};