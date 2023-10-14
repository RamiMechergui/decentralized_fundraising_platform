import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {IProfileDetails, profileDetailsInitValues as initialValues} from './SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import axios from 'axios';

const profileDetailsSchema = Yup.object().shape({
  user_ID : Yup.string(),
  investor_name: Yup.string().required().label('Investor Name'),
  investor_surname: Yup.string().required().label('Investor Surname'),
  investor_email: Yup.string().required().label('Investor Email'),
  investor_phone_number: Yup.string().required().label('Investor Phone Number'),
  nationality : Yup.string().required().label('Nationality'),
  passport_ID: Yup.mixed().required().label('Passport ID'),
  Social_Security_Number: Yup.mixed().required().label('Social Security Number'),
  Tax_ID: Yup.string().required().label('Tax ID'),
  investor_type: Yup.string().required().label('Investor Type'),
  annual_income: Yup.string().required().label('Annual Income'),
  investment_experience: Yup.string().required().label('Investment Experience'),
  risk_tolerance: Yup.string().required().label('Risk Tolerance'),
  investment_objective: Yup.string().required().label('Investment Objective'),
  preferred_investment: Yup.string().required().label('Preferred Investment'),
  bank_account: Yup.string().required().label('Bank Account RIB'),
  investment_primary_goal: Yup.string().required().label('Investment Primary goal'),
  investor_reaction: Yup.string().required().label('Investor Reaction'),
  investment_time_horizon: Yup.string().required().label('Investment Time Horizon'),
  previous_investment_experience: Yup.string().required().label('Previous Investment Experience'),
  down_market_tolerance: Yup.string().required().label('Down Market Tolerance'),
  loss_tolerance: Yup.string().required().label('Loss Tolerance'),
  risk_attitude: Yup.string().required().label('Risk Attitude')
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
      const response = await axios.put(`http://backend.tokenopp.org/api/investor/demands/update/${data.user_ID}`, fieldsToUpdate);

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
        const response = await axios.get('http://backend.tokenopp.org/api/investor/demands/mydemand');
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
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>investor_name</label>

            <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='investor_name'
                  {...formik.getFieldProps('investor_name')}
                />
                {formik.touched.investor_name && formik.errors.investor_name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investor_name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>investor_name</label>

            <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='investor_surname'
                  {...formik.getFieldProps('investor_surname')}
                />
                {formik.touched.investor_surname && formik.errors.investor_surname && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investor_surname}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'> Investor Email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='investor_email'
                  {...formik.getFieldProps('investor_email')}
                />
                {formik.touched.investor_email && formik.errors.investor_email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investor_email}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'> Investor Phone Number </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Company website'
                  {...formik.getFieldProps('investor_phone_number')}
                />
                {formik.touched.investor_phone_number && formik.errors.investor_phone_number && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investor_phone_number}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Nationality</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('nationality')}
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
                {formik.touched.nationality && formik.errors.nationality && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.nationality}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Tax ID</label>

            <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Tax_ID'
                  {...formik.getFieldProps('Tax_ID')}
                />
                {formik.touched.Tax_ID && formik.errors.Tax_ID && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.Tax_ID}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Investor Type</label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('investor_type')}
                >
                <option > Select type</option>    
                <option value='retail investor'> retail investor</option>
                <option value='institutional investor'> institutional investor</option>
                <option value='accredited investor'> accredited investor</option>
                <option value='angel investor'> angel investor</option>
                <option value='venture capitalist'> venture capitalist </option>
                </select>
                {formik.touched.investor_type && formik.errors.investor_type && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investor_type}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Annual Income </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('annual_income')}
                >
                      <option > Select Annual Income</option>    
                      <option value='inf 500,000'> inf 500,000</option>
                      <option value='500,000 - 1,000,000'> 500,000 - 1,000,000 </option>
                      <option value='Sup. 1,000,000'> Sup. 1,000,000</option>
                </select>
                {formik.touched.annual_income && formik.errors.annual_income && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.annual_income}</div>
                  </div>
                )}
              </div>
            </div>     

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Investment experience </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('investment_experience')}
                >
                      <option > Select Investment experience</option>    
                      <option value='beginner'> beginner </option>
                      <option value='intermediate'> intermediate  </option>
                      <option value='advanced'> advanced </option>
                </select>
                {formik.touched.investment_experience && formik.errors.investment_experience && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investment_experience}</div>
                  </div>
                )}
              </div>
            </div>      

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Risk Tolerance </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('risk_tolerance')}
                >
                      <option > Select Investment experience</option>    
                      <option value='beginner'> beginner </option>
                      <option value='intermediate'> intermediate  </option>
                      <option value='advanced'> advanced </option>
                </select>
                {formik.touched.risk_tolerance && formik.errors.risk_tolerance && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.risk_tolerance}</div>
                  </div>
                )}
              </div>
            </div>  

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Investment objective </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('investment_objective')}
                >
                        <option > Select investment objective </option>    
                        <option value='Short term'> Short  </option>
                        <option value='Long'> Long   </option>
                </select>
                {formik.touched.investment_objective && formik.errors.investment_objective && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investment_objective}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Preferred type of investment </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('preferred_investment')}
                >
                    <option > Select investment experience  </option>    
                    <option value='Short term'> No experience   </option>
                    <option value='Long'> stocks   </option>
                    <option value='bonds'> bonds   </option>
                    <option value='derivatives'> derivatives   </option>
                    <option value='ETFs'> ETFs   </option>
                    <option value='Mutual Funds'> Mutual Funds   </option>
                    <option value='commodities'> commodities   </option>
                </select>
                {formik.touched.preferred_investment && formik.errors.preferred_investment && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.preferred_investment}</div>
                  </div>
                )}
              </div>
            </div>


            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> What is your primary investment goal </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('investment_primary_goal')}
                >
                      <option > Select investment objective </option>    
                      <option value='Capital Preservation (low risk, stable returns)'> Capital Preservation (low risk, stable returns)   </option>
                      <option value='Balanced Growth (moderate risk, steady returns)'> Balanced Growth (moderate risk, steady returns)    </option>
                      <option value='Aggressive Growth (higher risk, potentially higher returns'>  Aggressive Growth (higher risk, potentially higher returns </option> 
                </select>
                {formik.touched.investment_primary_goal && formik.errors.investment_primary_goal && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investment_primary_goal}</div>
                  </div>
                )}
              </div>
            </div>


            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> How would you react to short-term fluctuations in the value of your investments </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('investor_reaction')}
                >
                    <option > Select reaction </option>    
                    <option value='I would be concerned and prefer minimal fluctuations. '> I would be concerned and prefer minimal fluctuations.   </option>
                    <option value='I would tolerate some fluctuations as long as the long-term performance is good '> I would tolerate some fluctuations as long as the long-term performance is good    </option>
                    <option value='I am comfortable with significant fluctuations if it offers the potential for higher returns.'> I am comfortable with significant fluctuations if it offers the potential for higher returns. </option> 
                </select>
                {formik.touched.investor_reaction && formik.errors.investor_reaction && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investor_reaction}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> What is your investment time horizon </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('investment_time_horizon')}
                >
                    <option > Select investment time horizon </option>    
                    <option value='Less than 3 years'> Less than 3 years </option>
                    <option value='3-5 years'> 3-5 years </option>
                    <option value='More than 5 years'> More than 5 years  </option> 
                </select>
                {formik.touched.investment_time_horizon && formik.errors.investment_time_horizon && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.investment_time_horizon}</div>
                  </div>
                )}
              </div>
            </div>


            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> How would you describe your previous investment experience  </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('previous_investment_experience')}
                >
                 <option > Select investment experience  </option>    
                 <option value='Less than 3 years'> Limited or no experience  </option>
                 <option value='3-5 years'> Some experience with various investment products  </option>
                 <option value='More than 5 years'> Extensive experience with diverse investment strategies   </option> 
                </select>
                {formik.touched.previous_investment_experience && formik.errors.previous_investment_experience && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.previous_investment_experience}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> How much loss are you willing to tolerate in your investment portfolio during a market downturn  </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('down_market_tolerance')}
                >
                    <option value='Minimal loss, capital preservation is a top priority'> Minimal loss, capital preservation is a top priority </option>
                    <option value='Moderate loss, as long as it is within reasonable limits'> Moderate loss, as long as it is within reasonable limits </option>
                    <option value='Significant loss, accepting short-term volatility for the potential of higher long-term returns'> Significant loss, accepting short-term volatility for the potential of higher long-term returns </option> 
                </select>
                {formik.touched.down_market_tolerance && formik.errors.down_market_tolerance && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.down_market_tolerance}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> How much loss are you willing to tolerate in your investment portfolio during a market downturn </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('down_market_tolerance')}
                >
                    <option value='Very important, I rely on consistent income from my investments'> Very important, I rely on consistent income from my investments </option>
                    <option value='Moderately important, but I can tolerate some variability'> Moderately important, but I can tolerate some variability </option>
                    <option value='Not important, I am more focused on long-term capital appreciation '> Not important, I am more focused on long-term capital appreciation </option> 
                </select>
                {formik.touched.loss_tolerance && formik.errors.loss_tolerance && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.loss_tolerance}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> What is your attitude towards risk in investments </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('risk_attitude')}
                >
                    <option > select your attitude towards risk in investments </option>    
                    <option value='I am risk-averse and prefer safer investment options'> I am risk-averse and prefer safer investment options </option>
                    <option value='I am willing to take moderate risks for potential gains'> I am willing to take moderate risks for potential gains </option>
                    <option value='I am comfortable with high-risk investments for potentially higher returns'> I am comfortable with high-risk investments for potentially higher returns </option> 
                </select>
                {formik.touched.risk_attitude && formik.errors.risk_attitude && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.risk_attitude}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'> Bank Account Details </label>

            <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='bank_account'
                  {...formik.getFieldProps('bank_account')}
                />
                {formik.touched.bank_account && formik.errors.bank_account && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.bank_account}</div>
                  </div>
                )}
              </div>
            </div>



          

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
