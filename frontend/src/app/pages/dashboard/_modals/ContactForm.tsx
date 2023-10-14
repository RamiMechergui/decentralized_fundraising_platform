import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../setup';

interface FormValues {
  name: string;
  subject: string;
  message: string;
}
interface ContactFormProps {
  rejectedBy: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ rejectedBy }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: rejectedBy || '',
    subject: '',
    message: '',
  });
  const history = useHistory();
  const userType = useSelector<RootState>(({auth}) => auth.user?.userType);
  const pme = userType == "startup";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      // Make an HTTP POST request to send feedback data to the server
      await axios.post('http://backend.tokenopp.org/api/campaign/addFeedback', formValues);
      console.log('Feedback sent successfully!');
      history.push('/dashboard');

    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };
  const handleSubmitInvestor = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      // Make an HTTP POST request to send feedback data to the server
      await axios.post('http://backend.tokenopp.org/api/buy/addFeedback', formValues);
      console.log('Feedback sent successfully!');
      history.push('/dashboard');

    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <form
      className="form mb-15 fv-plugins-bootstrap5 fv-plugins-framework"
      onSubmit={pme ? handleSubmit : handleSubmitInvestor}
    >    
      <div className="d-flex flex-column mb-5 fv-row">
        <label className="fs-5 fw-semibold mb-2">Subject</label>
        <input
          className="form-control form-control-solid"
          placeholder=""
          name="subject"
          value={formValues.subject}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex flex-column mb-10 fv-row fv-plugins-icon-container">
        <label className="fs-6 fw-semibold mb-2">Message</label>
        <textarea
          className="form-control form-control-solid"
          rows={6}
          name="message"
          placeholder=""
          value={formValues.message}
          onChange={handleChange}
        />
      </div>

       <button type="submit" className="btn btn-primary" id="kt_contact_submit_button">
        <span className="indicator-label">Send Complaint</span>
        <span className="indicator-progress">Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
      </button>
      
    </form>
  );
};

export default ContactForm;
