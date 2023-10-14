import React, {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Field, ErrorMessage} from 'formik'
import Form from 'react-bootstrap/Form'

const Step4: FC = () => {
  return (
    <div className='w-100'>
         <div className='pb-10 pb-lg-12'>
            <h2 className='fw-bolder text-dark'> Investor risk tolerance questionnaire </h2>
         </div>
    <div className='fv-row mb-10 px-2'>
        <label className='form-label required'> What is your primary investment goal  </label>
        <Field
          as='select'
          name='investment_primary_goal'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select investment objective </option>    
          <option value='Capital Preservation (low risk, stable returns)'> Capital Preservation (low risk, stable returns)   </option>
          <option value='Balanced Growth (moderate risk, steady returns)'> Balanced Growth (moderate risk, steady returns)    </option>
          <option value='Aggressive Growth (higher risk, potentially higher returns'>  Aggressive Growth (higher risk, potentially higher returns </option> 
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='investment_primary_goal' />
        </div>
      </div>

      <div className='fv-row mb-10 px-2'>
        <label className='form-label required'> How would you react to short-term fluctuations in the value of your investments  </label>
        <Field
          as='select'
          name='investor_reaction'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select reaction </option>    
          <option value='I would be concerned and prefer minimal fluctuations. '> I would be concerned and prefer minimal fluctuations.   </option>
          <option value='I would tolerate some fluctuations as long as the long-term performance is good '> I would tolerate some fluctuations as long as the long-term performance is good    </option>
          <option value='I am comfortable with significant fluctuations if it offers the potential for higher returns.'> I am comfortable with significant fluctuations if it offers the potential for higher returns. </option> 
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='investor_reaction' />
        </div>
      </div>

      <div className='fv-row mb-10 px-2'>
        <label className='form-label required'> What is your investment time horizon  </label>
        <Field
          as='select'
          name='investment_time_horizon'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select investment time horizon </option>    
          <option value='Less than 3 years'> Less than 3 years </option>
          <option value='3-5 years'> 3-5 years </option>
          <option value='More than 5 years'> More than 5 years  </option> 
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='investment_time_horizon' />
        </div>
      </div>

      <div className='fv-row mb-10 px-2'>
        <label className='form-label required'> How would you describe your previous investment experience  </label>
        <Field
          as='select'
          name='previous_investment_experience'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select investment experience  </option>    
          <option value='Less than 3 years'> Limited or no experience  </option>
          <option value='3-5 years'> Some experience with various investment products  </option>
          <option value='More than 5 years'> Extensive experience with diverse investment strategies   </option> 
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='previous_investment_experience' />
        </div>
      </div>

      <div className='fv-row mb-10 px-2'>
        <label className='form-label required'> How much loss are you willing to tolerate in your investment portfolio during a market downturn  </label>
        <Field
          as='select'
          name='down_market_tolerance'
          className='form-select form-select-lg form-select-solid'
        >
          <option value='Minimal loss, capital preservation is a top priority'> Minimal loss, capital preservation is a top priority </option>
          <option value='Moderate loss, as long as it is within reasonable limits'> Moderate loss, as long as it is within reasonable limits </option>
          <option value='Significant loss, accepting short-term volatility for the potential of higher long-term returns'> Significant loss, accepting short-term volatility for the potential of higher long-term returns </option> 
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='down_market_tolerance' />
        </div>
      </div>

      <div className='fv-row mb-10 px-2'>
        <label className='form-label required'> How much loss are you willing to tolerate in your investment portfolio during a market downturn  </label>
        <Field
          as='select'
          name='loss_tolerance'
          className='form-select form-select-lg form-select-solid'
        >
          <option value='Very important, I rely on consistent income from my investments'> Very important, I rely on consistent income from my investments </option>
          <option value='Moderately important, but I can tolerate some variability'> Moderately important, but I can tolerate some variability </option>
          <option value='Not important, I am more focused on long-term capital appreciation '> Not important, I am more focused on long-term capital appreciation </option> 
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='loss_tolerance' />
        </div>
      </div>

      <div className='fv-row mb-10 px-2'>
        <label className='form-label required'> What is your attitude towards risk in investments </label>
        <Field
          as='select'
          name='risk_attitude'
          className='form-select form-select-lg form-select-solid'
        >
          <option > select your attitude towards risk in investments </option>    
          <option value='I am risk-averse and prefer safer investment options'> I am risk-averse and prefer safer investment options </option>
          <option value='I am willing to take moderate risks for potential gains'> I am willing to take moderate risks for potential gains </option>
          <option value='I am comfortable with high-risk investments for potentially higher returns'> I am comfortable with high-risk investments for potentially higher returns </option> 
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='risk_attitude' />
        </div>
      </div>
      <div>
         <Form.Group controlId="formFile" className="mb-3 px-2">
           <Form.Label>Tokenopp Privacy policy Statement</Form.Label>
           <Form.Control as="textarea" rows={3} placeholder="Privacy Policy

Last updated: June 25, 2023

This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
" />
         </Form.Group>
      </div>
  

      <div className='d-flex flex-stack'>
        <div className='me-5'>
          <label className='fs-6 fw-bold form-label'>Agree to Tokenopp Services Agreement and privacy and cookies statement.</label>
        </div>
        <label className='form-check form-switch form-check-custom form-check-solid'>
          <span className='form-check-label fw-bold text-400 px-2'> Agree </span>
          <Field className='form-check-input' type='checkbox' name="termsAndConditions" />
        </label>
        <div className='text-danger mt-2'>
          <ErrorMessage name='termsAndConditions' />
        </div>
      </div>
      
    </div>
  )
}

export {Step4}
