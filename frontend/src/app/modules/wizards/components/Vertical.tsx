import React, {FC, useEffect, useRef, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {Step1} from './investorSteps/Step1'
import {Step2} from './investorSteps/Step2'
import {Step3} from './investorSteps/Step3'
import {Step4} from './investorSteps/Step4'
import {Step5} from './investorSteps/Step5'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Formik, Form, FormikValues} from 'formik'
import {ICreateAccount, createAccountSchemas, inits} from './InvestorAccountCreation'
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Vertical: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)
  const [isSubmitButton, setSubmitButton] = useState(false)
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const simulateAsyncAction = () => {
    setLoading(true);
    // Simulating an API call or any async action
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Successful Message!");
      // After 3 seconds, reset the success message and navigate to the desired page
      setTimeout(() => {
        setSuccessMessage(null);
        history.push('/investor/checkup');
      }, 3000);
    }, 5000); // Show loading button for 5 seconds before showing success message
  };
  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = async (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      setLoading(true);
      const formData = new FormData()
      const {investor_name , investor_surname ,bank_account,Social_Security_Number ,investor_email , investor_phone_number , nationality , passport_ID , Tax_ID,investor_type,annual_income, investment_experience , preferred_investment , risk_tolerance, investment_objective,investment_primary_goal,investor_reaction,investment_time_horizon,previous_investment_experience,down_market_tolerance,loss_tolerance,risk_attitude} = values
      
      formData.append('investor_name',investor_name)
      formData.append('investor_surname',investor_surname)
      formData.append('investor_email',investor_email)     
      formData.append('investor_phone_number',investor_phone_number)      
      formData.append('nationality',nationality)      
      formData.append('passport_ID',passport_ID)     
      formData.append('Social_Security_Number',Social_Security_Number)
      formData.append('Tax_ID',Tax_ID)
      formData.append('investor_type',investor_type)
      formData.append('annual_income',annual_income)
      formData.append('investment_experience',investment_experience)
      formData.append('preferred_investment',preferred_investment)
      formData.append('risk_tolerance',risk_tolerance)
      formData.append('investment_objective',investment_objective)
      formData.append('bank_account',bank_account)
      formData.append('investment_primary_goal',investment_primary_goal)
      formData.append('investor_reaction',investor_reaction)
      formData.append('investment_time_horizon',investment_time_horizon)
      formData.append('previous_investment_experience',previous_investment_experience)
      formData.append('down_market_tolerance',down_market_tolerance)
      formData.append('loss_tolerance',loss_tolerance)
      formData.append('risk_attitude',risk_attitude)
 
      const response = await axios.post('http://backend.tokenopp.org/api/investor/demands/depositdemand',formData)
      //simulateAsyncAction()
      history.push('/investor/check')
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div
      ref={stepperRef}
      className='stepper stepper-pills stepper-column   d-flex flex-column flex-xl-row flex-row-fluid'
      id='kt_create_account_stepper'
    >
      <div className='d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9'>
        <div className='px-6 px-lg-10 px-xxl-15 py-20'>
          <div className='stepper-nav'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>1</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'> Personal Information </h3>

                <div className='stepper-desc fw-bold'> Put your personal information </div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>2</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'> KYC/AML compliance </h3>
                <div className='stepper-desc fw-bold'> Upload your information </div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>3</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Investor profile</h3>
                <div className='stepper-desc fw-bold'> Put your financial information</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>4</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'> Investor risk tolerance questionnaire </h3>
                <div className='stepper-desc fw-bold'>Please fill the following form</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>5</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Completed</h3>
                <div className='stepper-desc fw-bold'>Congratulation You've completed the process </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex flex-row-fluid flex-center bg-white rounded'>
        <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
          {() => (
            <Form className='py-20 w-100 w-xl-700px px-9' noValidate id='kt_create_account_form'>
              <div className='current' data-kt-stepper-element='content'>
                <Step1 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step2 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step3 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step4 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step5 />
              </div>

              <div className='d-flex flex-stack pt-10'>
                <div className='mr-2'>
                  <button
                    onClick={prevStep}
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    data-kt-stepper-action='previous'
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr063.svg'
                      className='svg-icon-4 me-1'
                    />
                    Back
                  </button>
                </div>

                <div>
                  <button type='submit' className='btn btn-lg btn-primary me-3'>
                    <span className='indicator-label'>
                      {stepper.current?.currentStepIndex !==
                        stepper.current?.totatStepsNumber! - 1 && 'Continue'}
                      {stepper.current?.currentStepIndex ===
                        stepper.current?.totatStepsNumber! - 1 && 'Submit'}
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr064.svg'
                        className='svg-icon-3 ms-2 me-0'
                      />
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export {Vertical}
