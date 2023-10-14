import * as Yup from 'yup'
    
export interface ICreateAccount {
  investor_name : string
  investor_surname : string
  investor_email : string
  investor_phone_number : string
  nationality : string
  passport_ID : string
  Social_Security_Number : string
  Tax_ID : string
  investor_type : string
  annual_income : string
  investment_experience : string
  preferred_investment : string
  risk_tolerance : string
  investment_objective : string
  bank_account : string
  investment_primary_goal : string    
  investor_reaction : string  
  investment_time_horizon  : string   
  previous_investment_experience : string  
  down_market_tolerance : string  
  loss_tolerance : string  
  risk_attitude : string  
//  termsAndConditions : boolean
} 

const createAccountSchemas = [
  Yup.object({
    investor_name: Yup.string().required().label('Investor Name'),
    investor_surname: Yup.string().required().label('Investor Surname'),
    investor_email: Yup.string().required().label('Investor Email'),
    investor_phone_number: Yup.string().required().label('Investor Phone Number'),
    nationality : Yup.string().required().label('Nationality'),
  }),
  Yup.object({
    passport_ID: Yup.mixed().required().label('Passport ID'),
    Social_Security_Number: Yup.mixed().required().label('Social Security Number'),
    Tax_ID: Yup.string().required().label('Tax ID'),
  }),
  Yup.object({
    investor_type: Yup.string().required().label('Investor Type'),
    annual_income: Yup.string().required().label('Annual Income'),
    investment_experience: Yup.string().required().label('Investment Experience'),
    risk_tolerance: Yup.string().required().label('Risk Tolerance'),
    investment_objective: Yup.string().required().label('Investment Objective'),
    preferred_investment: Yup.string().required().label('Preferred Investment'),
    bank_account: Yup.string().required().label('Bank Account RIB'),
  }),
  Yup.object({
    investment_primary_goal: Yup.string().required().label('Investment Primary goal'),
    investor_reaction: Yup.string().required().label('Investor Reaction'),
    investment_time_horizon: Yup.string().required().label('Investment Time Horizon'),
    previous_investment_experience: Yup.string().required().label('Previous Investment Experience'),
    down_market_tolerance: Yup.string().required().label('Down Market Tolerance'),
    loss_tolerance: Yup.string().required().label('Loss Tolerance'),
    risk_attitude: Yup.string().required().label('Risk Attitude'),
  }),
//    Yup.object({
//    termsAndConditions: Yup.bool().oneOf([true], 'You need to accept the terms and conditions').required().label('Acceptance of terms and conditions'),
//  }),
]
const inits: ICreateAccount = {
  investor_name : '',
  investor_surname : '',
  investor_email : '',
  investor_phone_number : '',
  nationality  : '' , 
  passport_ID : '',
  Social_Security_Number: '' ,
  Tax_ID: '' , 
  investor_type:'' ,
  annual_income: '',
  investment_experience: '',
  risk_tolerance: '',
  investment_objective :'' , 
  bank_account :'' , 
  investment_primary_goal:'' , 
  investor_reaction :'' , 
  investment_time_horizon:'' , 
  previous_investment_experience :'' , 
  down_market_tolerance :'' , 
  loss_tolerance :'' , 
  risk_attitude :'' , 
  preferred_investment : '' ,
//  termsAndConditions: false,
}

export {createAccountSchemas, inits}