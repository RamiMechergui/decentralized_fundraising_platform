import React, { useEffect, useState } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {Projects} from './components/Projects'
import { Campaigns } from './components/Campaigns'
import {Documents} from './components/Documents'
import {Demands} from './components/Demands'
import {ProfileHeader} from './ProfileHeader'
import axios from 'axios'
import { connect, useSelector } from 'react-redux'
import { Connections } from './components/Connections'
import { RootState } from '../../../setup'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/crafted/pages/profile/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
interface ConnectionsProps {
  accessToken: string;
}
const ProfilePage: React.FC<ConnectionsProps> = ({ accessToken }) => {
  const [demands, setDemands] = useState([]); // Initialize demands state
  const userType = useSelector<RootState>(({ auth }) => auth.user?.userType);

  useEffect(() => {
    // Fetch demands data from the API or Redux store using axios (adjust the URL as needed)
    axios
      .get('http://backend.tokenopp.org/api/buy/alldemand')
      .then((response) => {
        setDemands(response.data);
      })
      .catch((error) => {
        console.error('Error fetching demands:', error);
      });
  }, []);
  
  return (
    <>
      <ProfileHeader accessToken={accessToken} />
      <Switch>
      {userType === 'admin' && (

        <Route path='/crafted/pages/profile/overview'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
          <Overview />
        </Route>
      )}
        {/* <Route path='/crafted/pages/profile/projects'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Projects</PageTitle>
          <Projects />
        </Route> */}
        <Route path='/crafted/pages/profile/campaigns'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Campaigns</PageTitle>
          <Campaigns />
        </Route>
        <Route path='/crafted/pages/profile/documents'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Documents</PageTitle>
          <Documents />
        </Route>
        <Route path='/crafted/pages/profile/users'>

<PageTitle breadcrumbs={profileBreadCrumbs}>Users</PageTitle>

<Connections />

</Route>
        <Route path='/crafted/pages/profile/request'>
          <PageTitle breadcrumbs={profileBreadCrumbs}>Request</PageTitle>
          <Demands demands={demands} accessToken={accessToken} />
        </Route>
        <Redirect from='/crafted/pages/profile' exact={true} to='/crafted/pages/profile/overview' />
        <Redirect to='/crafted/pages/profile/overview' />
      </Switch>
    </>
  )
}
const mapStateToProps = (state: { auth: { accessToken: any; }; }) => {
  return {
    accessToken: state.auth.accessToken, // Assuming the access token is stored in auth slice of the Redux store
  };
};
export default connect(mapStateToProps)( ProfilePage);
