import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { UserModel } from '../../../pages/dashboard/models/UserModel';
import axios from 'axios';

interface RouteParams {
    id: string; // Assuming "id" is a string, change the type if it's different
}
export const UserForm: React.FC = () =>  {
 
    const history = useHistory();
    const { id } = useParams<RouteParams>(); // Destructure the "id" parameter from useParams
    console.log('userid',id)
    const [data, setData] = useState<UserModel | null>(null); // Initialize data state with null
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://backend.docker.local/api/users/${id}`);
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
          await axios.put(`http://backend.docker.local/api/users/update/${id}`, {
            userName: data?.userName, // Use the user state to get the updated name and email
            email: data?.email,
            userType:data?.userType,
            role:data?.role,
            createdBy:data?.createdBy,
            verified:data?.verified,
            twoFactorEnabled:data?.twoFactorEnabled,
            status:data?.status,
            isDeleted:data?.isDeleted
          });
          
    
          // Redirect to the dashboard page after successful update
          history.push('/crafted/pages/profile/connections');
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    const handleCancel = () => {
        // Redirect to the dashboard page
        history.push('/crafted/pages/profile/connections');
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="userName" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                className="form-control"
                defaultValue={data.userName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                defaultValue={data.email}
                onChange={handleInputChange}
                required
              />
            </div>

          
            <div className="mb-4">
              <label htmlFor="userType" className="form-label">
                Type:
              </label>
              <input
                type="text"
                id="userType"
                name="userType"
                className="form-control"
                defaultValue={data.userType}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="form-label">
                Role:
              </label>
              <input
                type="text"
                id="Role"
                name="Role"
                className="form-control"
                defaultValue={data.role}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="createdBy" className="form-label">
                Created By:
              </label>
              <input
                type="text"
                id="createdBy"
                name="createdBy"
                className="form-control"
                defaultValue={data.createdBy}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="verified" className="form-label">
                Verification:
              </label>
              <input
                type="number"
                id="verified"
                name='verified'
                className="form-control"
                value={data.verified}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="twoFactorEnabled" className="form-label">
              twoFactorEnabled
              </label>
              <input
                type="number"
                id="verified"
                name='twoFactorEnabled'
                className="form-control"
                value={data.twoFactorEnabled}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="form-label">
                Status:
              </label>
              <input
                type="text"
                id="status"
                name="status"
                className="form-control"
                defaultValue={data.status}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="isDeleted" className="form-label">
              Deleted
              </label>
              <input
                type="number"
                id="isDeleted"
                name='isDeleted'
                className="form-control"
                value={data.isDeleted}
                onChange={handleInputChange}
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
      
    
  );
};