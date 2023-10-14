import React, {FC} from 'react'
import {useFormik , Field, ErrorMessage , useFormikContext} from 'formik'
import Form from 'react-bootstrap/Form'

const Step3: FC = () => {
  const formik = useFormikContext();
  return (
    <div className='w-100'>

      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> Upload Financial information </h2>
      </div>

      <div> 
      <div className="mb-3">
        <label className="form-label required"> Upload Business Plan </label>
        <input
          type='file'
          name='business_plan'
          className='form-control'
          onChange={(e) => formik.setFieldValue('business_plan', e.currentTarget.files?.[0] )
          }/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='business_plan' />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label required"> Upload Market analysis </label>
        <input
          type='file'
          name='market_analysis'
          className='form-control'
          onChange={(e) => formik.setFieldValue('market_analysis', e.currentTarget.files?.[0] )
          }/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='market_analysis' />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label required"> Upload Balance sheet </label>
        <input
          type='file'
          name='balance_sheet'
          className='form-control'
          onChange={(e) => formik.setFieldValue('balance_sheet', e.currentTarget.files?.[0] )
          }/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='balance_sheet' />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label required"> Upload Cash flow statement </label>
        <input
          type='file'
          name='cash_flow_statement'
          className='form-control'
          onChange={(e) => formik.setFieldValue('cash_flow_statement', e.currentTarget.files?.[0] )
          }/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='cash_flow_statement' />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label required"> Upload Equity statement </label>
        <input
          type='file'
          name='equity_statement'
          className='form-control'
          onChange={(e) => formik.setFieldValue('equity_statement', e.currentTarget.files?.[0] )
          }/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='equity_statement' />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label required"> Upload Income statement </label>
        <input
          type='file'
          name='income_statement'
          className='form-control'
          onChange={(e) => formik.setFieldValue('income_statement', e.currentTarget.files?.[0] )
          }/>
        <div className='text-danger mt-2'>
          <ErrorMessage name='income_statement' />
        </div>
      </div>

      </div>
    </div>
  )
}

export {Step3}
