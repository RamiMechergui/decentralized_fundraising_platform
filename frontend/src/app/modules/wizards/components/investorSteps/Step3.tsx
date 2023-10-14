import React, {FC} from 'react'
import {useFormik , Field, ErrorMessage} from 'formik'
import Form from 'react-bootstrap/Form'


const Step3: FC = () => {
  return (
    <div className='w-100'>

      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> Investor profile  </h2>
      </div>
      
      <div className='fv-row mb-10'>
        <label className='form-label required'> Type of Investor</label>
        <Field
          as='select'
          name='investor_type'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select type</option>    
          <option value='retail investor'> retail investor</option>
          <option value='institutional investor'> institutional investor</option>
          <option value='accredited investor'> accredited investor</option>
          <option value='angel investor'> angel investor</option>
          <option value='venture capitalist'> venture capitalist </option>
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='investor_type' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'> Annual Income </label>
        <Field
          as='select'
          name='annual_income'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select Annual Income</option>    
          <option value='inf 500,000'> inf 500,000</option>
          <option value='500,000 - 1,000,000'> 500,000 - 1,000,000 </option>
          <option value='Sup. 1,000,000'> Sup. 1,000,000</option>
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='annual_income' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'> Investment experience </label>
        <Field
          as='select'
          name='investment_experience'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select Investment experience</option>    
          <option value='beginner'> beginner </option>
          <option value='intermediate'> intermediate  </option>
          <option value='advanced'> advanced </option>
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='investment_experience' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'> Risk Tolerance  </label>
        <Field
          as='select'
          name='risk_tolerance'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select Risk Tolerance </option>    
          <option value='Low'> Low  </option>
          <option value='Meduim'> Meduim   </option>
          <option value='High'> High </option>
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='risk_tolerance' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'> Investment objective  </label>
        <Field
          as='select'
          name='investment_objective'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select investment objective </option>    
          <option value='Short term'> Short  </option>
          <option value='Long'> Long   </option>
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='investment_objective' />
        </div>
      </div>
      
      <div className='fv-row mb-10'>
        <label className='form-label required'> Preferred type of investment   </label>
        <Field
          as='select'
          name='preferred_investment'
          className='form-select form-select-lg form-select-solid'
        >
          <option > Select investment experience  </option>    
          <option value='Short term'> No experience   </option>
          <option value='Long'> stocks   </option>
          <option value='bonds'> bonds   </option>
          <option value='derivatives'> derivatives   </option>
          <option value='ETFs'> ETFs   </option>
          <option value='Mutual Funds'> Mutual Funds   </option>
          <option value='commodities'> commodities   </option>
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='preferred_investment' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'> Bank Account Details   </label>
        <Field name='bank_account' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='bank_account' />
        </div>
      </div>

    </div>
  )
}

export {Step3}
