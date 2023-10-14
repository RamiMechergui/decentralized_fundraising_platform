import React, {FC, useEffect, useRef, useState} from 'react'
import {Step1} from './startupSteps/Step1'
import {Step2} from './startupSteps/Step2'
import {Step3} from './startupSteps/Step3'
import {Step4} from './startupSteps/Step4'
import {Step5} from './startupSteps/Step5'
import {KTSVG} from '../../../../_metronic/helpers'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Formik, Form, FormikValues, FormikContext} from 'formik'
import {createAccountSchemas, ICreateAccount, inits} from './StartupAccountCreation'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
 
const Horizontal: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)
  const [isSubmitButton, setSubmitButton] = useState(false)
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

   // Function to simulate an API call or some asynchronous action
  const simulateAsyncAction = () => {
    setLoading(true);
    // Simulating an API call or any async action
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Successful Message!");
      // After 3 seconds, reset the success message and navigate to the desired page
      setTimeout(() => {
        setSuccessMessage(null);
        history.push('/startup/checkup');
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

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1)

    stepper.current.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = async (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1)

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      console.log(values)
      stepper.current.goNext()
    } else {
      setLoading(true)
      const formData = new FormData()
      const {companyName , companyEmail , companyWebsite , country ,businessDescription, fundingState , activitySector , pitch_video,legal_status,business_registration_number, memberName , memberSurname , memberOccupation, member_cv,business_plan,market_analysis,balance_sheet,cash_flow_statement,equity_statement,income_statement,additional_information} = values
      formData.append('companyName',companyName)
      formData.append('companyEmail',companyEmail)
      formData.append('companyWebsite',companyWebsite)     
      formData.append('country',country)      
      formData.append('fundingState',fundingState)      
      formData.append('activitySector',activitySector)     
      formData.append('businessDescription',businessDescription)     
      formData.append('pitch_video',pitch_video)
      formData.append('legal_status',legal_status)
      formData.append('business_registration_number',business_registration_number)
      formData.append('memberName',memberName)
      formData.append('memberSurname',memberSurname)
      formData.append('memberOccupation',memberOccupation)
      formData.append('member_cv',member_cv)
      formData.append('business_plan',business_plan)
      formData.append('market_analysis',market_analysis)
      formData.append('balance_sheet',balance_sheet)
      formData.append('cash_flow_statement',cash_flow_statement)
      formData.append('equity_statement',equity_statement)
      formData.append('income_statement',income_statement)
      formData.append('additional_information',additional_information)
      
      const response = await axios.post('http://backend.tokenopp.org/api/startup/demands/depositdemand', formData)
      setTimeout(() => {
        setLoading(false)
        history.push('/startup/checkup');
      }, 3000);
    }
    }

  useEffect(() => {
    loadStepper()
  }, [stepperRef])



  return (
    <div className='card'>
      <div className='card-body'>
        <div
          ref={stepperRef}
          className='stepper stepper-links d-flex flex-column pt-15'
          id='kt_create_account_stepper'
        >
          <div className='stepper-nav mb-5'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Company info</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Teams info</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'> Financial info</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'> Additional information </h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Completed</h3>
            </div>
          </div>

          <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
            {() => (
              <Form className='mx-auto mw-600px w-100 pt-15 pb-10' id='kt_create_account_form'>
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
               
                 {successMessage && (
                 <div className='d-flex flex-stack pt-15'>
                 <div className='alert alert-success mt-3' role='alert'>
                           {successMessage}
                  </div>
                  </div>
                )}   
                <div className='d-flex flex-stack pt-15'>
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
                    <button type='submit' className='btn btn-lg btn-primary me-3'  disabled={loading}>
                      
                        {!loading && !isSubmitButton && 'Continue'} 
                        {!loading && isSubmitButton && 'Submit'}
                        {/*
                        <span className='indicator-label'>  
                         <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-3 ms-2 me-0'
                        />
                        */}
                        {loading && (
                         <span className='indicator-progress' style={{display: 'block'}}>
                           Please wait...{' '}
                           <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                         </span>
                       )}
                    </button>
                  </div>
                  </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export {Horizontal}
