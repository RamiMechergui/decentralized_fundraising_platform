import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserModel } from '../../../pages/dashboard/models/UserModel';
import axios from 'axios';

export const AddUser: React.FC = () => {
  const history = useHistory();

  const [data, setData] = useState<UserModel>({
    _id: '', 
    id: '',
    address: '', 
    userName: '',
    email: '',
    password:'',
    userType: '',
    role: '',
    createdBy: '',
    verified: 0,
    twoFactorEnabled: 0,
    status: '',
    isDeleted: 0,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Make the API call to add the new user
      const userName=data.userName
      const email=data.email
      const password= data.password
      const userType=data.userType
      const role= data.role
      const verified = 1
      const twoFactorEnabled=1
      await axios.post('http://backend.docker.local/api/users/add', {
        userName,
        email,
        password,
        userType,
        role,
        verified,
        twoFactorEnabled,
      });

      // Redirect to the dashboard page after successful addition
      history.push('/crafted/pages/profile/connections');
    } catch (error) {
      console.error('Error adding user:', error);
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
            value={data.userName}
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
            value={data.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Initial Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={data.password}
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
            value={data.userType}
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
            id="role"
            name="role"
            className="form-control"
            value={data.role}
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