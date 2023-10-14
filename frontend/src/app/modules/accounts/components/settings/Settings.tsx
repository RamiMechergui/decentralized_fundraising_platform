import React from 'react'
import ProfileDetails from './cards/ProfileDetails'
import SignInMethod from './cards/SignInMethod'
import {EmailPreferences} from './cards/EmailPreferences'
import {Notifications} from './cards/Notifications'
import {DeactivateAccount} from './cards/DeactivateAccount'
interface ConnectionsProps {
  accessToken: string;
}
export function Settings({ accessToken }: ConnectionsProps ) {
  return (
    <>
      <ProfileDetails  />
      <SignInMethod />

      <DeactivateAccount />
    </>
  )
}
