import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {IProfileDetails, profileDetailsInitValues as initialValues} from './SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import axios from 'axios';

const profileDetailsSchema = Yup.object().shape({
  user_ID : Yup.string(),
  company_name: Yup.string().required('company name is required'),
  company_email: Yup.string().required('company email is required'),
  company_website: Yup.string().required('company_websiteis required'),
  country: Yup.string().required('country is required'),
  state_of_funding: Yup.string().required('state of funding is required'),
  activity_description: Yup.string().required('activity description is required'),
  activity_sector: Yup.string().required('activity sector is required'),
  pitch_video: Yup.string().required('pitch video is required'),
  legal_status: Yup.string().required('legal status is required'),
  member_name: Yup.string().required('member name is required'),
  member_occupation: Yup.string().required('member occupation is required'),
  member_cv: Yup.string().required('member cv is required'),
  business_plan: Yup.string().required('business plan is required'),
  market_analysis: Yup.string().required('market analysis is required'),
  balance_sheet: Yup.string().required('balance sheet is required'),
  cash_flow_statement: Yup.string().required('cash flow statement is required'),
  equity_statement: Yup.string().required('equity statement is required'),
  additional_information: Yup.string().required('additional information is required'),
})

const ProfileDetails: React.FC = () => {
  const [data, setData] = useState<IProfileDetails>(initialValues)
  {/*
    const updateData = (fieldsToUpdate: Partial<IProfileDetails>): void => {
    const updatedData = Object.assign(data, fieldsToUpdate)
    setData(updatedData)
  }
  */}

  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateData = async (fieldsToUpdate: Partial<IProfileDetails>): Promise<void> => {  
    try {
      setLoading(true);

      // Send a PUT request to the backend API endpoint using Axios
      const response = await axios.put(`http://backend.tokenopp.org/api/startup/demands/update/${data.user_ID}`, fieldsToUpdate);

      // Assuming the backend returns the updated data as part of the response
      const updatedData = response.data;
      setData(updatedData);
      setLoading(false);

      setSuccessMessage('Data updated successfully!');
      // Clear success message after a few seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const formik = useFormik<IProfileDetails>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await updateData(values);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const getDemand = async () => {
      try {
        const response = await axios.get('http://backend.tokenopp.org/api/startup/demands/mydemand');
        formik.setValues(response.data);
        setData(response.data); // Set the initial form values
        console.log(response.data);
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };
    getDemand();
  }, []);

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Application Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Company Name</label>

            <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Company name'
                  {...formik.getFieldProps('company_name')}
                />
                {formik.touched.company_name && formik.errors.company_name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.company_name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'> Company Email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Phone number'
                  {...formik.getFieldProps('company_email')}
                />
                {formik.touched.company_email && formik.errors.company_email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.company_email}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'> company_website </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Company website'
                  {...formik.getFieldProps('company_website')}
                />
                {formik.touched.company_website && formik.errors.company_website && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.company_website}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Country</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('country')}
                >
                  <option value=''>Select a Country...</option>
                  <option value='AF'>Afghanistan</option>
                  <option value='AX'>Aland Islands</option>
                  <option value='AL'>Albania</option>
                  <option value='DZ'>Algeria</option>
                  <option value='AS'>American Samoa</option>
                  <option value='AD'>Andorra</option>
                  <option value='AO'>Angola</option>
                  <option value='AI'>Anguilla</option>
                  <option value='AQ'>Antarctica</option>
                  <option value='AG'>Antigua and Barbuda</option>
                  <option value='AR'>Argentina</option>
                  <option value='AM'>Armenia</option>
                  <option value='AW'>Aruba</option>
                  <option value='AU'>Australia</option>
                  <option value='AT'>Austria</option>
                  <option value='AZ'>Azerbaijan</option>
                  <option value='BS'>Bahamas</option>
                  <option value='BH'>Bahrain</option>
                  <option value='BD'>Bangladesh</option>
                  <option value='BB'>Barbados</option>
                  <option value='BY'>Belarus</option>
                  <option value='BE'>Belgium</option>
                  <option value='BZ'>Belize</option>
                  <option value='BJ'>Benin</option>
                  <option value='BM'>Bermuda</option>
                  <option value='BT'>Bhutan</option>
                  <option value='BO'>Bolivia, Plurinational State of</option>
                  <option value='BQ'>Bonaire, Sint Eustatius and Saba</option>
                  <option value='BA'>Bosnia and Herzegovina</option>
                  <option value='BW'>Botswana</option>
                  <option value='BV'>Bouvet Island</option>
                  <option value='BR'>Brazil</option>
                  <option value='IO'>British Indian Ocean Territory</option>
                  <option value='BN'>Brunei Darussalam</option>
                  <option value='BG'>Bulgaria</option>
                  <option value='BF'>Burkina Faso</option>
                  <option value='BI'>Burundi</option>
                  <option value='KH'>Cambodia</option>
                  <option value='CM'>Cameroon</option>
                  <option value='CA'>Canada</option>
                  <option value='CV'>Cape Verde</option>
                  <option value='KY'>Cayman Islands</option>
                  <option value='CF'>Central African Republic</option>
                  <option value='TD'>Chad</option>
                  <option value='CL'>Chile</option>
                  <option value='CN'>China</option>
                  <option value='CX'>Christmas Island</option>
                  <option value='CC'>Cocos (Keeling) Islands</option>
                  <option value='CO'>Colombia</option>
                  <option value='KM'>Comoros</option>
                  <option value='CG'>Congo</option>
                  <option value='CD'>Congo, the Democratic Republic of the</option>
                  <option value='CK'>Cook Islands</option>
                  <option value='CR'>Costa Rica</option>
                  <option value='CI'>Côte d'Ivoire</option>
                  <option value='HR'>Croatia</option>
                  <option value='CU'>Cuba</option>
                  <option value='CW'>Curaçao</option>
                  <option value='CY'>Cyprus</option>
                  <option value='CZ'>Czech Republic</option>
                  <option value='DK'>Denmark</option>
                  <option value='DJ'>Djibouti</option>
                  <option value='DM'>Dominica</option>
                  <option value='DO'>Dominican Republic</option>
                  <option value='EC'>Ecuador</option>
                  <option value='EG'>Egypt</option>
                  <option value='SV'>El Salvador</option>
                  <option value='GQ'>Equatorial Guinea</option>
                  <option value='ER'>Eritrea</option>
                  <option value='EE'>Estonia</option>
                  <option value='ET'>Ethiopia</option>
                  <option value='FK'>Falkland Islands (Malvinas)</option>
                  <option value='FO'>Faroe Islands</option>
                  <option value='FJ'>Fiji</option>
                  <option value='FI'>Finland</option>
                  <option value='FR'>France</option>
                  <option value='GF'>French Guiana</option>
                  <option value='PF'>French Polynesia</option>
                  <option value='TF'>French Southern Territories</option>
                  <option value='GA'>Gabon</option>
                  <option value='GM'>Gambia</option>
                  <option value='GE'>Georgia</option>
                  <option value='DE'>Germany</option>
                  <option value='GH'>Ghana</option>
                  <option value='GI'>Gibraltar</option>
                  <option value='GR'>Greece</option>
                  <option value='GL'>Greenland</option>
                  <option value='GD'>Grenada</option>
                  <option value='GP'>Guadeloupe</option>
                  <option value='GU'>Guam</option>
                  <option value='GT'>Guatemala</option>
                  <option value='GG'>Guernsey</option>
                  <option value='GN'>Guinea</option>
                  <option value='GW'>Guinea-Bissau</option>
                  <option value='GY'>Guyana</option>
                  <option value='HT'>Haiti</option>
                  <option value='HM'>Heard Island and McDonald Islands</option>
                  <option value='VA'>Holy See (Vatican City State)</option>
                  <option value='HN'>Honduras</option>
                  <option value='HK'>Hong Kong</option>
                  <option value='HU'>Hungary</option>
                  <option value='IS'>Iceland</option>
                  <option value='IN'>India</option>
                  <option value='ID'>Indonesia</option>
                  <option value='IR'>Iran, Islamic Republic of</option>
                  <option value='IQ'>Iraq</option>
                  <option value='IE'>Ireland</option>
                  <option value='IM'>Isle of Man</option>
                  <option value='IL'>Israel</option>
                  <option value='IT'>Italy</option>
                  <option value='JM'>Jamaica</option>
                  <option value='JP'>Japan</option>
                  <option value='JE'>Jersey</option>
                  <option value='JO'>Jordan</option>
                  <option value='KZ'>Kazakhstan</option>
                  <option value='KE'>Kenya</option>
                  <option value='KI'>Kiribati</option>
                  <option value='KP'>Korea, Democratic People's Republic of</option>
                  <option value='KW'>Kuwait</option>
                  <option value='KG'>Kyrgyzstan</option>
                  <option value='LA'>Lao People's Democratic Republic</option>
                  <option value='LV'>Latvia</option>
                  <option value='LB'>Lebanon</option>
                  <option value='LS'>Lesotho</option>
                  <option value='LR'>Liberia</option>
                  <option value='LY'>Libya</option>
                  <option value='LI'>Liechtenstein</option>
                  <option value='LT'>Lithuania</option>
                  <option value='LU'>Luxembourg</option>
                  <option value='MO'>Macao</option>
                  <option value='MK'>Macedonia, the former Yugoslav Republic of</option>
                  <option value='MG'>Madagascar</option>
                  <option value='MW'>Malawi</option>
                  <option value='MY'>Malaysia</option>
                  <option value='MV'>Maldives</option>
                  <option value='ML'>Mali</option>
                  <option value='MT'>Malta</option>
                  <option value='MH'>Marshall Islands</option>
                  <option value='MQ'>Martinique</option>
                  <option value='MR'>Mauritania</option>
                  <option value='MU'>Mauritius</option>
                  <option value='YT'>Mayotte</option>
                  <option value='MX'>Mexico</option>
                  <option value='FM'>Micronesia, Federated States of</option>
                  <option value='MD'>Moldova, Republic of</option>
                  <option value='MC'>Monaco</option>
                  <option value='MN'>Mongolia</option>
                  <option value='ME'>Montenegro</option>
                  <option value='MS'>Montserrat</option>
                  <option value='MA'>Morocco</option>
                  <option value='MZ'>Mozambique</option>
                  <option value='MM'>Myanmar</option>
                  <option value='NA'>Namibia</option>
                  <option value='NR'>Nauru</option>
                  <option value='NP'>Nepal</option>
                  <option value='NL'>Netherlands</option>
                  <option value='NC'>New Caledonia</option>
                  <option value='NZ'>New Zealand</option>
                  <option value='NI'>Nicaragua</option>
                  <option value='NE'>Niger</option>
                  <option value='NG'>Nigeria</option>
                  <option value='NU'>Niue</option>
                  <option value='NF'>Norfolk Island</option>
                  <option value='MP'>Northern Mariana Islands</option>
                  <option value='NO'>Norway</option>
                  <option value='OM'>Oman</option>
                  <option value='PK'>Pakistan</option>
                  <option value='PW'>Palau</option>
                  <option value='PS'>Palestinian Territory, Occupied</option>
                  <option value='PA'>Panama</option>
                  <option value='PG'>Papua New Guinea</option>
                  <option value='PY'>Paraguay</option>
                  <option value='PE'>Peru</option>
                  <option value='PH'>Philippines</option>
                  <option value='PN'>Pitcairn</option>
                  <option value='PL'>Poland</option>
                  <option value='PT'>Portugal</option>
                  <option value='PR'>Puerto Rico</option>
                  <option value='QA'>Qatar</option>
                  <option value='RE'>Réunion</option>
                  <option value='RO'>Romania</option>
                  <option value='RU'>Russian Federation</option>
                  <option value='RW'>Rwanda</option>
                  <option value='BL'>Saint Barthélemy</option>
                  <option value='SH'>Saint Helena, Ascension and Tristan da Cunha</option>
                  <option value='KN'>Saint Kitts and Nevis</option>
                  <option value='LC'>Saint Lucia</option>
                  <option value='MF'>Saint Martin (French part)</option>
                  <option value='PM'>Saint Pierre and Miquelon</option>
                  <option value='VC'>Saint Vincent and the Grenadines</option>
                  <option value='WS'>Samoa</option>
                  <option value='SM'>San Marino</option>
                  <option value='ST'>Sao Tome and Principe</option>
                  <option value='SA'>Saudi Arabia</option>
                  <option value='SN'>Senegal</option>
                  <option value='RS'>Serbia</option>
                  <option value='SC'>Seychelles</option>
                  <option value='SL'>Sierra Leone</option>
                  <option value='SG'>Singapore</option>
                  <option value='SX'>Sint Maarten (Dutch part)</option>
                  <option value='SK'>Slovakia</option>
                  <option value='SI'>Slovenia</option>
                  <option value='SB'>Solomon Islands</option>
                  <option value='SO'>Somalia</option>
                  <option value='ZA'>South Africa</option>
                  <option value='GS'>South Georgia and the South Sandwich Islands</option>
                  <option value='KR'>South Korea</option>
                  <option value='SS'>South Sudan</option>
                  <option value='ES'>Spain</option>
                  <option value='LK'>Sri Lanka</option>
                  <option value='SD'>Sudan</option>
                  <option value='SR'>Suriname</option>
                  <option value='SJ'>Svalbard and Jan Mayen</option>
                  <option value='SZ'>Swaziland</option>
                  <option value='SE'>Sweden</option>
                  <option value='CH'>Switzerland</option>
                  <option value='SY'>Syrian Arab Republic</option>
                  <option value='TW'>Taiwan, Province of China</option>
                  <option value='TJ'>Tajikistan</option>
                  <option value='TZ'>Tanzania, United Republic of</option>
                  <option value='TH'>Thailand</option>
                  <option value='TL'>Timor-Leste</option>
                  <option value='TG'>Togo</option>
                  <option value='TK'>Tokelau</option>
                  <option value='TO'>Tonga</option>
                  <option value='TT'>Trinidad and Tobago</option>
                  <option value='TN'>Tunisia</option>
                  <option value='TR'>Turkey</option>
                  <option value='TM'>Turkmenistan</option>
                  <option value='TC'>Turks and Caicos Islands</option>
                  <option value='TV'>Tuvalu</option>
                  <option value='UG'>Uganda</option>
                  <option value='UA'>Ukraine</option>
                  <option value='AE'>United Arab Emirates</option>
                  <option value='GB'>United Kingdom</option>
                  <option value='US'>United States</option>
                  <option value='UY'>Uruguay</option>
                  <option value='UZ'>Uzbekistan</option>
                  <option value='VU'>Vanuatu</option>
                  <option value='VE'>Venezuela, Bolivarian Republic of</option>
                  <option value='VN'>Vietnam</option>
                  <option value='VI'>Virgin Islands</option>
                  <option value='WF'>Wallis and Futuna</option>
                  <option value='EH'>Western Sahara</option>
                  <option value='YE'>Yemen</option>
                  <option value='ZM'>Zambia</option>
                  <option value='ZW'>Zimbabwe</option>
                </select>
                {formik.touched.country && formik.errors.country && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.country}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>State of funding</label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('state_of_funding')}
                >
                  <option value=''>Select funding state</option>
                  <option value='Pre-Seed Stage'>Pre-Seed Stage</option>
                  <option value='Seed Stage'>Seed Stage</option>
                  <option value='Series A Stage'>Series A Stage</option>
                  <option value='Growth Stage'>Growth Stage</option>
                  <option value='Late Stage'>Late Stage</option>
                </select>
                {formik.touched.state_of_funding && formik.errors.state_of_funding && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.state_of_funding}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'> Activity Sector </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('activity_sector')}
                >
                    <option value='' > Select activity sector</option>    
                    <option value='IT'> IT </option>
                    <option value='Finance'>Finance </option>
                    <option value='Fintech'>Fintech</option>
                </select>
                {formik.touched.activity_sector && formik.errors.activity_sector && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.activity_sector}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'> Acivity Description </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='textarea'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Activity Description Placeholder'
                  {...formik.getFieldProps('activity_description')}
                />
                {formik.touched.activity_description && formik.errors.activity_description && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.activity_description}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Member Full Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='member_name'
                      {...formik.getFieldProps('member_name')}
                    />
                    {formik.touched.member_name && formik.errors.member_name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.member_name}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Member surname'
                      {...formik.getFieldProps('member_surname')}
                    />
                    {formik.touched.member_surname && formik.errors.member_surname && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.member_surname}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Member occupation</label>

            <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Member occupation'
                  {...formik.getFieldProps('member_occupation')}
                />
                {formik.touched.member_occupation && formik.errors.member_occupation && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.member_occupation}</div>
                  </div>
                )}
              </div>
            </div>
          {/* 
                      <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> member cv</label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                     onChange = {v => formik.setFieldValue('member_cv', v)}
                    />
                    {formik.touched.member_cv && formik.errors.member_cv && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.member_cv}</div>
                      </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> pitch deck / video</label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.pitch_video && formik.errors.pitch_video && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.pitch_video}</div>
                      </div>
                )}
              </div>
            </div>


            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> business registration number </label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.business_registration_number && formik.errors.business_registration_number && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.business_registration_number}</div>
                      </div>
                )}
              </div>
            </div>
            

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Business Plan</label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.business_plan && formik.errors.business_plan && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.business_plan}</div>
                      </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Market Analysis </label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.market_analysis && formik.errors.market_analysis && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.market_analysis}</div>
                      </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Balance sheet </label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.balance_sheet && formik.errors.balance_sheet && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.balance_sheet}</div>
                      </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> cash flow statement </label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.cash_flow_statement && formik.errors.cash_flow_statement && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.cash_flow_statement}</div>
                      </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Equity statement  </label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.equity_statement && formik.errors.equity_statement && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.equity_statement}</div>
                      </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Income statement  </label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.income_statement && formik.errors.income_statement && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.income_statement}</div>
                      </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Additional Information  </label>
              <div className='col-lg-8 fv-row'>
                    <input
                     type='file'
                     className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.additional_information && formik.errors.additional_information && (
                      <div className='fv-plugins-message-container'>
                         <div className='fv-help-block'>{formik.errors.additional_information}</div>
                      </div>
                )}
              </div>
            </div>
          */}  

          </div>
          {/* Show success message if available */}
          {successMessage && (
              <div className='alert alert-success mt-3' role='alert'>
                {successMessage}
              </div>
          )}
          <div className='card-footer d-flex justify-content-end py-6 px-9'>
             <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>


        </form>
      </div>
    </div>
  )
}

export {ProfileDetails}
