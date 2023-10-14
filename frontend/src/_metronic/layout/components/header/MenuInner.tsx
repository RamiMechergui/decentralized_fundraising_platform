import React ,{useEffect,useState}from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'
import {useIntl} from 'react-intl'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import { UserModel } from '../../../../../src/app/modules/auth/models/UserModel'

export interface MenuItemParamInterface {
  to : string 
  title  :string
}

export function MenuInner() {
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const [MenuItemParam,setMenuItemParamParam] = useState<MenuItemParamInterface>({to :'',title:''})
  const intl = useIntl()

  useEffect(() => {
   switch (user.userType) {
    case 'startup':
        setMenuItemParamParam({to : "/startup/" ,
                      title : "Startup Application Form"
        })
        break
     case 'investor':
        setMenuItemParamParam({to : "/investor/",
                      title : "Investor Application Form"
        })
       break
     case 'admin':
        setMenuItemParamParam({to : "/admin/view-requests",
                      title : "View Requests"
        })     
        break  
  }
  console.log(MenuItemParam)
  },[])
  
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title={MenuItemParam.title} to={MenuItemParam.to} />
      <MenuInnerWithSub
        title='Crafted'
        to='/crafted'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        {/* PAGES */}
        <MenuInnerWithSub
          title='Pages'
          to='/crafted/pages'
          fontIcon='bi-archive'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuInnerWithSub
            title='Profile'
            to='/crafted/pages/profile'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
            <MenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
            <MenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
            <MenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
            <MenuItem
              to='/crafted/pages/profile/demands'
              title='Demands'
              hasBullet={true}
            />
          </MenuInnerWithSub>
          <MenuInnerWithSub
            title='Wizards'
            to='/crafted/pages/wizards'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem to='/crafted/pages/wizards/horizontal' title='Horizontal' hasBullet={true} />
            <MenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
          </MenuInnerWithSub>
        </MenuInnerWithSub>

        {/* ACCOUNT */}
        <MenuInnerWithSub
          title='Accounts'
          to='/crafted/accounts'
          fontIcon='bi-person'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
          <MenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
        </MenuInnerWithSub>

        {/* ERRORS */}
        <MenuInnerWithSub
          title='Errors'
          to='/error'
          fontIcon='bi-sticky'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/error/404' title='Error 404' hasBullet={true} />
          <MenuItem to='/error/500' title='Error 500' hasBullet={true} />
        </MenuInnerWithSub>

        {/* Widgets */}

      </MenuInnerWithSub>



    </>
  )
}
