import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {authentication} from '../redux/AuthCRUD'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import * as auth from '../redux/AuthRedux'

import clsx from 'clsx';
import { useDispatch } from 'react-redux';
const initialValues = {
    email: '',
    twoFactorCode:'',
}

const AuthSchema = Yup.object().shape({

  email: Yup.string()
    .required('email is required')
    .min(6, 'Minimum 6 characters')
    .max(50, 'Maximum 50 characters'),
  twoFactorCode: Yup.string()
    .required('Code is required'),  
});



export function Authentication() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)

  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    validationSchema: AuthSchema,
    onSubmit: async (values, { setStatus }) => {
      setLoading(true);
      try {
        const res = await authentication(values.email, values.twoFactorCode);
        const accessToken = res.data.accessToken;
        
          dispatch(auth.actions.login(accessToken));
          history.push('/dashboard');
        }
        finally {
        setLoading(false);
      }
    },
  });


  return (
    <>
      <form
        className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center mb-10">
          <h1 className="text-dark mb-3">Two Factor Authentification</h1>
          <div className="text-gray-400 fw-bold fs-4">Enter the code and your email.</div>
        </div>

        {hasErrors === true && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">
              Sorry, an error occurred while you login. Please try again.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className="mb-10 bg-light-info p-8 rounded">
            <div className="text-info">logging successfully.</div>
          </div>
        )}

        <div className="fv-row mb-10">
          <label className="form-label fw-bolder text-gray-900 fs-6">email</label>
          <input
            type="text"
            placeholder=""
            autoComplete="off"
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              { 'is-valid': formik.touched.email && !formik.errors.email }
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>

        <div className="fv-row mb-10">
          <label className="form-label fw-bolder text-gray-900 fs-6">twoFactorCode</label>
          <input
            type="text"
            placeholder=""
            autoComplete="off"
            {...formik.getFieldProps('twoFactorCode')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.twoFactorCode && formik.errors.twoFactorCode },
              { 'is-valid': formik.touched.twoFactorCode && !formik.errors.twoFactorCode }
            )}
          />
          {formik.touched.twoFactorCode && formik.errors.twoFactorCode && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.twoFactorCode}</span>
              </div>
            </div>
          )}
        </div>

        <div className="d-flex flex-wrap justify-content-center pb-lg-0">
          <button
            type="submit"
            className="btn btn-lg btn-primary fw-bolder me-4"
          >
            <span className="indicator-label">Login</span>
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

