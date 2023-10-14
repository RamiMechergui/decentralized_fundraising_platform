export interface IProfileDetails {
  user_ID: string
  investor_name : string
  investor_surname : string
  investor_email : string
  investor_phone_number : string
  nationality  : string
  passport_ID : string
  Social_Security_Number: string
  Tax_ID: string
  investor_type:string
  annual_income: string
  investment_experience: string
  risk_tolerance: string
  investment_objective : string
  preferred_investment : string
  bank_account : string 
  investment_primary_goal:string
  investor_reaction :string
  investment_time_horizon:string
  previous_investment_experience : string
  down_market_tolerance : string
  loss_tolerance :string
  risk_attitude : string 
  date?:string
}


export const profileDetailsInitValues: IProfileDetails = {
  user_ID: '',
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
  date :''
}




