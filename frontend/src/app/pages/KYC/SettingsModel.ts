export interface IProfileDetails {
  company_name: string
  user_ID: string
  company_email: string
  company_website: string
  country: string
  state_of_funding: string 
  activity_description: string 
  activity_sector : string
  pitch_video: string 
  legal_status: string
  business_registration_number: string
  member_name: string
  member_surname: string
  member_occupation: string
  member_cv: string
  business_plan: string
  market_analysis: string
  balance_sheet: string
  cash_flow_statement: string
  equity_statement: string
  income_statement: string
  additional_information: string
  date?:string
}


export const profileDetailsInitValues: IProfileDetails = {
  company_name: '',
  user_ID: '',
  company_email: '',
  company_website: '',
  country: '',
  state_of_funding: '', 
  activity_description: '', 
  activity_sector  :'',
  pitch_video: '', 
  legal_status: '',
  business_registration_number: '',
  member_name: '',
  member_surname: '',
  member_occupation: '',
  member_cv: '',
  business_plan: '',
  market_analysis: '',
  balance_sheet: '',
  cash_flow_statement: '',
  equity_statement: '',
  income_statement: '',
  additional_information: '',
  date :''
}




