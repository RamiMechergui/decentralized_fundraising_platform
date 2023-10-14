import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import BuyTokensPopup from '../pages/dashboard/_modals/BuyToken'
import TokenForm from '../pages/dashboard/_modals/create-app-stepper/CreateCampaign'
import CampaignDetails from '../pages/dashboard/_modals/CampaignDetails'
import { UserForm } from '../modules/profile/components/UserForm'
import { AddUser } from '../modules/profile/components/AddUser'
import { CampaignDemandUpdate } from '../modules/profile/components/CampaignDemandUpdate'
import { CampaignDemandRejection } from '../modules/profile/components/CampaignDemandRejection'
import { RejectionForm } from '../modules/profile/components/RejectionForm'
import RequestDetails from '../modules/profile/components/RequestDetails'
import {StartupKYC} from '../pages/StartupKYC'
import {InvestorKYC} from '../pages/InvestorKYC'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../setup/index'
import { UserModel } from '../../app/modules/auth/models/UserModel'
import { AdminPage } from '../pages/Admin'

export function PrivateRoutes() {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/BuyToken:tokenName' component={BuyTokensPopup} />
        <Route path='/CreateCampaign' component={TokenForm} />
        <Route path='/CampaignDetails:campaignName' component={CampaignDetails} />
        <Route path='/RequestDetails:id' component={RequestDetails} />

        <Route path='/UpdateUser/:id' component={UserForm} />
        <Route path='/AddUser' component={AddUser} />

        <Route path='/campaign-update/:id' component={CampaignDemandUpdate} />

        <Route path='/campaign-rejection/:id' component={CampaignDemandRejection} />
        <Route path='/RejectionForm/:id' component={RejectionForm} />

        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/startup'>
          {(user.userType === 'startup')? <StartupKYC /> : <Redirect to='' />}
        </Route>
        <Route path='/investor'>
          {(user.userType === 'investor')? <InvestorKYC /> : <Redirect to='' />}
        </Route>
        <Route path='/admin'>
          {(user.userType === 'admin')? <AdminPage /> : <Redirect to='' />}
        </Route>
        {/* <Route path='/menu-test' component={MenuTestPage} /> */}
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
      </Switch>
    </Suspense>
  )
}
