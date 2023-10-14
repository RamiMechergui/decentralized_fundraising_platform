import React, { FC, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_metronic/layout/core';
import axios from 'axios';
import { CampaignModel } from './models/CampaignModel';
import { toAbsoluteUrl } from '../../../_metronic/helpers';
import { useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../../../setup';
import DataTable, { TableColumn } from 'react-data-table-component';
interface DashboardProps {
  accessToken: string;
}

const DashboardPage: React.FC<DashboardProps> = ({ accessToken }:any) => {
  const [tokenData, setTokenData] = useState<CampaignModel[]>([]);
  const [campaignData, setCampaignData] = useState<CampaignModel[]>([]);
console.log(accessToken);
  const userType = useSelector<RootState>(({auth}) => auth.user?.userType);
  const pme = userType != "startup";

  const history = useHistory();

  const handleBuyToken = (tokenName:any ) => {
    // Navigate to the buy token form and pass the token name as a parameter
    history.push(`/BuyToken:token=${encodeURIComponent(tokenName)}`);



  };
  const handleCampaignDetails = (campaignName:any ) => {
    // Navigate to the buy token form and pass the token name as a parameter
    history.push(`/CampaignDetails:campaignName=${encodeURIComponent(campaignName)}`);



  };

  const tokenMap = useMemo(() => {
    const tokenMap = [];
    for (const token of tokenData) {
      tokenMap[token.id] = token;
    }
    return tokenMap;
  }, [tokenData]);


  useEffect(() => {
    axios
      .get('http://backend.tokenopp.org/api/contract/alltoken')
      .then((response) => {
        setTokenData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching token data:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://backend.tokenopp.org/api/token/mycamapign')
      .then((response) => {
        setCampaignData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching campaign data:', error);
      });
  }, []);
  useEffect(() => {
    console.log(campaignData); // Logs the updated campaignData whenever it changes

  }, [campaignData]);
  const tokenColumns: TableColumn<CampaignModel>[] = [
    {
      name: 'Token Name',
      selector: (row) => row.tokenName,
      sortable: true,
    },
    {
      name: 'Instant Price',
      selector: (row) => row.tokenPrice,
      sortable: true,
    },
    {
      name: 'Min Invest',
      selector: (row) => row.minInvest,
      sortable: true,
    },
    {
      name: 'Remain Tokens',
      selector: (row) => row.remainTokens,
      sortable: true,
    },
    {
      name: 'Action Type',
      selector: (row) => row.actionType,
      sortable: true,
    },
    {
      name: 'Ending At',
      selector: (row) => row.endDate,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div >
        <button
          className="btn btn-primary btn-sm btn-active-light-primary "
          onClick={() => handleBuyToken(row.tokenName)}
        >
          Buy Token
        </button>
        <button
          className="btn btn-light btn-sm btn-active-light-primary"
          onClick={() => handleDetails(row)}
        >
          Details
        </button>
      </div>
      ),
    },
  ]
  const campaignColumns: TableColumn<CampaignModel>[] = [
    {
      name: 'Campaign Name',
      selector: (row) => row.campaignName,
      sortable: true,
    },
    {
      name: 'Montant Fundraising',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Type Fundraising',
      selector: (row) => row.actionType,
      sortable: true,
    },
    {
      name: 'Percentage of Shares',
      selector: (row) => row.shares,
      sortable: true,
    },
    {
      name: 'Numbers of Investors',
      selector: (row) => row.numberOfInvestors,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Details',
      cell: (row) => (
        <button
          className="btn btn-light btn-sm btn-active-light-primary"
          onClick={() => handleCampaignDetails(row.campaignName)}
        >
          Details
        </button>
      ),
    },
  ]
  return (
    <>
      {pme && tokenData ? (
        <DataTable
        title="Campaigns"
          columns={tokenColumns}
          data={tokenData}
          pagination
          highlightOnHover
          defaultSortFieldId="token"
          striped
          pointerOnHover
          selectableRows
          selectableRowsHighlight
          selectableRowsNoSelectAll
        />
      ) : (
        <DataTable
        title="My Campaigns"

          columns={campaignColumns}
          data={campaignData}
          pagination
          highlightOnHover
          defaultSortFieldId="campaignName"
          striped
          pointerOnHover
          selectableRows
          selectableRowsHighlight
          selectableRowsNoSelectAll
        />
      )}
    </>
  );
  
};
const mapStateToProps = (state: { auth: { accessToken: any; }; }) => {
  return {
    accessToken: state.auth.accessToken, // Assuming the access token is stored in auth slice of the Redux store
  };
};
export default connect(mapStateToProps)( DashboardPage);

const DashboardWrapper:React.FC<DashboardProps> = ({ accessToken }:any)=> {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage accessToken={accessToken} />
    </>
  );
};
// const mapStateToProps = (state: { auth: { accessToken: any; }; }) => {
//   return {
//     accessToken: state.auth.accessToken, // Assuming the access token is stored in auth slice of the Redux store
//   };
// };
export { DashboardWrapper };

function handleDetails(row: CampaignModel): void {
  throw new Error('Function not implemented.');
}
