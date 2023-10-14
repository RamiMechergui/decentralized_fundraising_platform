import React, {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Field, ErrorMessage, useFormikContext} from 'formik'
import Form from 'react-bootstrap/Form'

const Step2: FC = () => {
  const formik = useFormikContext();
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'> Member Info</h2>
      </div>

      <div className='mb-10 fv-row'>

      <div className='fv-row mb-10'>
        <label className='form-label required'> Member name </label>
        <Field name='memberName' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='memberName' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'> Member surname </label>
        <Field name='memberSurname' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='memberSurname' />
        </div>
      </div>
      
      <div className='fv-row mb-10'>
        <label className='form-label required'> Occupation  </label>
        <Field name='memberOccupation' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='memberOccupation' />
        </div>
      </div>
            
      <div className="mb-3">
        <label className="form-label required"> Upload member cv </label>
        <input
          type='file'
          name='member_cv'
          className='form-control'
          onChange={(e) => formik.setFieldValue('member_cv', e.currentTarget.files?.[0] )
          }/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='member_cv' />
        </div>
      </div>
      </div>

    </div>
  )
}

export {Step2}
