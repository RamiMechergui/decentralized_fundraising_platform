/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import React , {useEffect,useState}from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import { UserModel } from '../../../../../src/app/modules/auth/models/UserModel'

export interface AsideMenuParamInterface {
  to : string 
  title  :string
}

export function AsideMenuMain() {
  const intl = useIntl()
  const userType = useSelector<RootState>(({ auth }) => auth.user?.userType);
  const [AsideParam,setAsideParam] = useState<AsideMenuParamInterface>({to :'',title:''})
  
  useEffect(() => {
   switch (userType) {
    case 'startup':
        setAsideParam({to : "/startup/" ,
                      title : "Startup Application Form"
        })
        break
     case 'investor':
        setAsideParam({to : "/investor/",
                      title : "Investor Application Form"
        })
       break
     case 'admin':
        setAsideParam({to : "/admin/view-requests",
                      title : "View Requests"
        })    
        break  
  }
  },[])

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      
      <AsideMenuItem 
        to={AsideParam.to}
        title={AsideParam.title}
        icon='/media/icons/duotune/art/art002.svg'
        />
        
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
        {userType === 'admin' && (<AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />)}
          {/* <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} /> */}
          {userType === 'admin' && (  <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />)}
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          {userType === 'admin' && ( <AsideMenuItem to='/crafted/pages/profile/users' title='Users' hasBullet={true}/>)}
          {userType !== 'startup' &&(<AsideMenuItem to='/crafted/pages/profile/request' title='Request' hasBullet={true}/>)}
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  )
}
