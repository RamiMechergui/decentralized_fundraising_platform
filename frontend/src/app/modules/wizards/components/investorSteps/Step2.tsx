import React, {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Field, ErrorMessage,useFormik,useFormikContext} from 'formik'
import Form from 'react-bootstrap/Form'

const Step2: FC = () => {
  const formik = useFormikContext();
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'> KYC/AML compliance </h2>
      </div>
      <div className="mb-3">
        <label className="form-label required"> Upload Passport / ID </label>
        <input
          type='file'
          name='passport_ID'
          className='form-control'
          onChange={(e) => formik.setFieldValue('passport_ID', e.currentTarget.files?.[0] )
          }/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='passport_ID' />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label required"> Social Security Number (SSN) </label>
        <input
          type='file'
          name='Social_Security_Number'
          className='form-control'
          onChange={(e) => formik.setFieldValue('Social_Security_Number', e.currentTarget.files?.[0] )
          }/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='Social_Security_Number' />
        </div>
      </div>

      <div className='mb-10 fv-row'>
      

      <div className='fv-row mb-10'>
        <label className='form-label required'> Tax ID  </label>
        <Field name='Tax_ID' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='Tax_ID' />
        </div>
      </div>
      
      </div>
    </div>
  )
}

export {Step2}
