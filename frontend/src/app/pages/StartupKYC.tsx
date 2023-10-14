import React, { useEffect, useState } from "react";
import { Horizontal }from '../modules/wizards/components/Horizontal'   
import {Route, Switch,Redirect} from 'react-router-dom'
import {PageTitle} from '../../_metronic/layout/core'
import { AccountHeader } from "./KYC/AccountHeader"
import { Overview } from "./KYC/Overview"
import { Settings } from "./KYC/Settings";
import axios from 'axios'

export function StartupKYC() {
    const [Submission_Status,setSubmitted]=useState('Not Submitted')
    const NotSubmitted : boolean = Submission_Status === 'Not Submitted'

   useEffect(()=>{
    const getDemand = async () => {
      try {
        const response = await axios.get('http://backend.tokenopp.org/api/startup/demands/mydemand');
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

           <Route exact path="/startup/"> 
                 {!NotSubmitted ? (<Redirect to="/startup/check" />) : (<Redirect to="/startup/depositdemand" /> )}
           </Route>

           <Route path='/startup/depositdemand'> 
              <PageTitle > Startup Application Form </PageTitle>
              <Horizontal />
           </Route>

           <Route path='/startup/check'>
              <AccountHeader />
              <PageTitle > Application Overview </PageTitle>
              <Overview />
           </Route>
         
           <Route path='/startup/update'>
              <AccountHeader />
              <PageTitle > Settings</PageTitle>
              <Settings />
           </Route>
        </Switch>
    </>
    )
}