import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {resetPassword} from '../redux/AuthCRUD'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx';
const initialValues = {
  code: '',
  password:'',
}

const resetPasswordSchema = Yup.object().shape({
  code: Yup.string()
    .required('Code is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Minimum 6 characters')
    .max(50, 'Maximum 50 characters'),
});



export function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        resetPassword(values.code,values.password)
          .then(({data: {result}}) => {
            setHasErrors(false)
            setLoading(false)
            history.push('/auth/login');

          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
      }, 1000)
    },
  })


  return (
    <>
      <form
        className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center mb-10">
          <h1 className="text-dark mb-3">Reset Password</h1>
          <div className="text-gray-400 fw-bold fs-4">Enter the code and your new password.</div>
        </div>

        {hasErrors === true && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">
              Sorry, an error occurred while resetting the password. Please try again.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className="mb-10 bg-light-info p-8 rounded">
            <div className="text-info">Password reset successfully.</div>
          </div>
        )}

        <div className="fv-row mb-10">
          <label className="form-label fw-bolder text-gray-900 fs-6">Code</label>
          <input
            type="text"
            placeholder=""
            autoComplete="off"
            {...formik.getFieldProps('code')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.code && formik.errors.code },
              { 'is-valid': formik.touched.code && !formik.errors.code }
            )}
          />
          {formik.touched.code && formik.errors.code && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.code}</span>
              </div>
            </div>
          )}
        </div>

        <div className="fv-row mb-10">
          <label className="form-label fw-bolder text-gray-900 fs-6">New Password</label>
          <input
            type="password"
            placeholder=""
            autoComplete="off"
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.password && formik.errors.password },
              { 'is-valid': formik.touched.password && !formik.errors.password }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>

        <div className="d-flex flex-wrap justify-content-center pb-lg-0">
          <button
            type="submit"
            className="btn btn-lg btn-primary fw-bolder me-4"
          >
            <span className="indicator-label">Reset Password</span>
            {loading && (
              <span className="indicator-progress">
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>

          <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-lg btn-light-primary fw-bolder"
              disabled={loading}
            >
              Back to Login
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}

