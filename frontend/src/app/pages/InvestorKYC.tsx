import { Vertical }from '../modules/wizards/components/Vertical'   
import React, { useEffect, useState } from "react";
import {Route, Switch,Redirect} from 'react-router-dom'
import {PageTitle} from '../../_metronic/layout/core'
import { AccountHeader } from "./KYC-Investor/AccountHeader"
import { Overview } from "./KYC-Investor/Overview"
import { Settings } from "./KYC-Investor/Settings";
import axios from 'axios'

export function InvestorKYC() {
    const [Submission_Status,setSubmitted]=useState('Not Submitted')
    const NotSubmitted : boolean = Submission_Status === 'Not Submitted'

   useEffect(()=>{
    const getDemand = async () => {
      try {
        const response = await axios.get('http://backend.tokenopp.org/api/investor/demands/mydemand');
        setSubmitted(response.data.KYC_Status)
        console.log(response.data)
        console.log('Hello World')
        return response.data
      } catch (error) {
        console.error('Error getting book:', error);
      }
    };
    const myData= getDemand()
   },[Submission_Status])

    return (
        <>
        <Switch>

           <Route exact path="/investor/"> 
                 {!NotSubmitted ? (<Redirect to="/investor/check" />) : (<Redirect to="/investor/depositdemand" /> )}
           </Route>

           <Route path='/investor/depositdemand'> 
              <PageTitle > Investor Application Form </PageTitle>
              <Vertical />
           </Route>

           <Route path='/investor/check'>
              <AccountHeader />
              <PageTitle > Application Overview </PageTitle>
              <Overview />
           </Route>
         
           <Route path='/investor/update'>
              <AccountHeader />
              <PageTitle > Settings</PageTitle>
              <Settings />
           </Route>
        </Switch>
    </>
    )
}