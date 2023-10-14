import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { TokenModel } from '../../../pages/dashboard/models/TokenModel';
interface RouteParams {
    id: string; // Assuming "id" is a string, change the type if it's different
}
export const RejectionForm: React.FC = () =>  {
 
    const history = useHistory();
    const { id } = useParams<RouteParams>(); // Destructure the "id" parameter from useParams
    console.log(id);
    const [data, setData] = useState<TokenModel | null>(null); // Initialize data state with null
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://backend.docker.local/api/buy/getBuyTokenById/${id}`);
        //   console.log('gh',response.data);
          setData(response.data); // Update the data state with the response data

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
          await axios.post(`http://backend.docker.local/api/buy/rejectTransfer/${id}`, {
            motifRejection: data?.motifRejection, // Use the user state to get the updated name and email
            // status: 'Rejected'

          });
          
    
          // Redirect to the dashboard page after successful update
          history.push('/crafted/pages/profile/demands');
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    const handleCancel = () => {
        // Redirect to the dashboard page
        history.push('/crafted/pages/profile/demands');
      };
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Update the user state when the input fields change
        setData({
          ...data,
          [event.target.name]: event.target.value,
        });
      };  

      return (
        <div className="buy-tokens-popup">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="motifRejection" className="form-label">
                Rejection Motif:
              </label>
              <textarea
                id="motifRejection"
                name="motifRejection"
                className="form-control"
                defaultValue={data.motifRejection}
                onChange={handleInputChange}
                required
              />
            </div>


            <div className="text-center">
              <button type="button" className="btn btn-light me-3" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-danger">
                Reject
              </button> 
              {/* <button type="button" className="btn btn-success" onClick={handleReadyToStart}>
                Ready To Start
              </button>  */}
            </div>

          </form>
        </div>
      
    
  );
};