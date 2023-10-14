import React , {useEffect,useState}from "react";
import {PageTitle} from '../../_metronic/layout/core'
import { StarupDemandTable } from './Admin_Component/StarupDemandTable'
import { InvestorDemandTable } from './Admin_Component/InvestorDemandTable'
import axios from 'axios'

export function AdminPage() {
    const [startupDemandData, setStartupDemandData] = useState([]);
    const [investorDemandData, setInvestorDemandData] = useState([]);

    const getAllDemands = async () => {
      try {
        const response = await axios.get('http://backend.tokenopp.org/api/startup/demands/getAll');
        setStartupDemandData(response.data);
        const response2 = await axios.get('http://backend.tokenopp.org/api/investor/demands/getAll');
        setInvestorDemandData(response2.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };
    useEffect(()=>{
    getAllDemands();
    },[])

    return (
        <>
        <PageTitle > List of Requests </PageTitle>
        <StarupDemandTable  tab_title='Startup Requests' startupDemands={startupDemandData}  />
        <InvestorDemandTable  tab_title='Investors Requests' investorDemands={investorDemandData}/>
        </>
    )
}
