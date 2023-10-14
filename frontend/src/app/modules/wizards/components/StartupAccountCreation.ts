import * as Yup from 'yup'

export interface ICreateAccount {
  companyName : string
  companyEmail : string
  companyWebsite : string
  country : string
  fundingState : string
  activitySector : string
  pitch_video: string 
  legal_status : string
  businessDescription :  string
  business_registration_number : string
  memberName: string
  memberSurname: string
  memberOccupation: string
  member_cv : string
  business_plan : string
  market_analysis : string
  balance_sheet : string
  cash_flow_statement : string
  equity_statement : string
  income_statement : string
  additional_information : string
} 

const createAccountSchemas = [
  Yup.object({
    companyName: Yup.string().required().label('Company Name'),
    companyEmail: Yup.string().required().label('Company Email'),
    companyWebsite: Yup.string().required().label('Company Website'),
    country: Yup.string().required().label('Country'),
    businessDescription: Yup.string().required().label('Business Description'),
    fundingState : Yup.string().required().label('Funding State'),
    activitySector : Yup.string().required().label('Activity Sector'),
    pitch_video: Yup.mixed().required().label('Pitch Video'),
    legal_status: Yup.mixed().required().label('Legal Status'),
    business_registration_number: Yup.mixed().required().label('Business Registration'),
  }),
  Yup.object({
    memberName: Yup.string().required().label('Member Name'),
    memberSurname: Yup.string().required().label('Member Surname'),
    memberOccupation: Yup.string().required().label('Member Occupation'),
    member_cv: Yup.mixed().required().label('Member CV'),
  }),
  Yup.object({
    business_plan: Yup.mixed().required().label('Business Plan'),
    market_analysis: Yup.mixed().required().label('Market Analysis'),
    balance_sheet: Yup.mixed().required().label('Balance Sheet'),
    cash_flow_statement: Yup.mixed().required().label('Cash Flow Statement'),
    equity_statement: Yup.mixed().required().label('Equity Statement'),
    income_statement: Yup.mixed().required().label('Income Statement'),
  }),
    Yup.object({
    additional_information: Yup.mixed().required().label('Additional Information'),
  }),
]
const inits: ICreateAccount = {
  companyName : '',
  companyEmail : '',
  companyWebsite : '',
  country : '',
  fundingState  : '' , 
  activitySector : '',
  businessDescription : '',
  pitch_video: '' ,
  legal_status: '' , 
  business_registration_number :'' ,
  memberName: '',
  memberSurname: '',
  memberOccupation: '',
  member_cv :'' , 
  business_plan :'' , 
  market_analysis :'' , 
  balance_sheet :'' , 
  cash_flow_statement :'' , 
  equity_statement :'' , 
  income_statement :'' , 
  additional_information :'' , 
}

export {createAccountSchemas, inits}