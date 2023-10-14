import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

type CustomSelectProps = {
  status: string;
  user_ID: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ status, user_ID }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(status);

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value
    setSelectedStatus(newStatus)
    try {
      // Make the PUT request to update the status in the backend
      await axios.put('http://backend.tokenopp.org/api/investor/demands/updateStatus', {
        user_ID,
        newStatus,
      });

      // Update the local state after the request is successful
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <td>
        <span className='badge badge-light-primary'>{selectedStatus}</span>
      </td>
      <td>
        <select className='form-select form-select-lg form-select-solid' value={selectedStatus} onChange={handleChange}>
          <option value="In Process">Set In Process</option>
          <option value="Accepted">Accept</option>
          <option value="Rejected">Reject</option>
        </select>
      </td>
    </>
  );
};

export default CustomSelect;



export {CustomSelect} ;