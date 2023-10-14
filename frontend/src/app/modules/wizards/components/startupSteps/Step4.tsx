import React, {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Field, ErrorMessage , useFormikContext} from 'formik'
import Form from 'react-bootstrap/Form'

const Step4: FC = () => {
  const formik = useFormikContext();
  return (
    <div className='w-100'>

      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark px-2'> Upload additional information </h2>
        <div className="mb-3">
          <label className="form-label required"> additional_information </label>
          <input
            type='file'
            name='additional_information'
            className='form-control'
            onChange={(e) => formik.setFieldValue('additional_information', e.currentTarget.files?.[0] )
          }/>
          <div className='text-danger mt-2'>
          <ErrorMessage name='additional_information' />
          </div>
        </div>
        <Form.Group controlId="formFile" className="mb-3 px-2">
          <div className='pb-8 '> </div>
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
          <Field className='form-check-input' type='checkbox' value='1' checked={true}/>
        </label>
      </div>
    </div>
  )
}

export {Step4}
