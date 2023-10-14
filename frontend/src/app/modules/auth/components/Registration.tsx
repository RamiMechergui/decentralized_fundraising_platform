/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import * as auth from '../redux/AuthRedux'
import {register} from '../redux/AuthCRUD'
import {Link,useHistory} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const initialValues = {
  userName: '',
  email: '',
  password: '',
  userType: '',
}

const registrationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('user name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  userType: Yup.string().required('userType is required')




})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        register(values.userName, values.email, values.password, values.userType)
          .then(() => {
            setLoading(false)
            dispatch(auth.actions.logoutSuccess())
            history.push('auth/login');
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('Registration process has broken')
          })
      }, 1000)
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Create an Account</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>
          Already have an account?
          <Link to='/auth/login' className='link-primary fw-bolder' style={{marginLeft: '5px'}}>
            Forgot Password ?
          </Link>
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      <div className='d-flex align-items-center mb-10'>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
        <span className='fw-bold text-gray-400 fs-7 mx-2'>OR</span>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>userName</label>
          <input
            placeholder='user name'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('userName')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.userName && formik.errors.userName,
              },
              {
                'is-valid': formik.touched.userName && !formik.errors.userName,
              }
            )}
          />
          {formik.touched.userName && formik.errors.userName && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.userName}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Email */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='mb-10 fv-row' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end::Form group */}
      {/* begin::Form group userType */}
      <div className='row fv-row mb-7'>
  <div className='col-xl-6'>
    <label className='form-label fw-bolder text-dark fs-6'>User Type</label>
    <select
      {...formik.getFieldProps('userType')}
      className={clsx(
        'form-select form-select-lg form-select-solid',
        {
          'is-invalid': formik.touched.userType && formik.errors.userType,
        },
        {
          'is-valid': formik.touched.userType && !formik.errors.userType,
        }
      )}
    >
      <option value='' disabled>Select user type</option>
      <option value='investor'>Investor</option>
      <option value='startup'>Startup</option>
    </select>
    {formik.touched.userType && formik.errors.userType && (
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{formik.errors.userType}</span>
        </div>
      </div>
    )}
  </div>
</div>
      {/* end::Form group */}


  

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
