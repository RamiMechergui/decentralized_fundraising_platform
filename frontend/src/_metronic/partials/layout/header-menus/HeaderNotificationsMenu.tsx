/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import {FC,useEffect, useState,useRef} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl, defaultAlerts, defaultLogs} from '../../../helpers'
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { Notification } from '../../../../app/modules/notifications/models/NotificationModel';
import './notif.css';
import Swal from 'sweetalert2';
import { UserModel } from '../../../../app/modules/auth/models/UserModel';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

// interface Props {
//   notif: Notification;
//   setNotification: Dispatch<SetStateAction<Notification[]>>;
// }

// const Notifications: React.FC<Notification> = ({ notifTitle,notifPayload }) => (
//   <div>
//     <p>{notifTitle}</p>
//     <p>{notifPayload}</p>
//   </div>
// );




const HeaderNotificationsMenu: FC =  () => {
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const [notification, setNotification] = useState<Notification[]>([]);
  const socketRef = useRef<Socket | null>(null);
  
  const fetchData = async () => {
    try {
      const response = await axios.get<Notification[]>(`http://backend.docker.local/api/users/notifications/${user._id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const fetchInitialNotifications = async () => {
    const data = await fetchData();
    setNotification(data);
    setShowAlert(data);

  };
  const showNotification =async (data: Notification[]) => {
    // Show the latest notification using Swal.fire
    const latestNotif = data[0];
    const iconValue = latestNotif.notifType as 'success' | 'error' | 'warning' | 'info' | 'question';
    await Swal.fire({
          position: 'top-end',
          icon: iconValue,
          title: latestNotif.titleAlert,
          showConfirmButton: false,
          timer: 5000,
          customClass: {
            popup: 'custom-alert',
          },
    })
   
  };
  const setShowAlert = async (data: Notification[]) => {
    console.log('setShowAlert data',data);
    if (data.length > 0 && data[0].shown === 0) {
      await showNotification(data);
      await axios.post(`http://backend.docker.local/api/users/notification/alert/${data[0]._id}`);
    }
  };
  useEffect(() => {
    
    fetchInitialNotifications();


    socketRef.current = io('http://backend.tokenopp.org');
    socketRef.current.on('newLoginNotif', async() => {
       fetchInitialNotifications();
      
      console.log('new login',notification);
    });
      socketRef.current.on('userStatusUpdate', () => {
        // setNotification(prevNotification => [...prevNotification, ...data]);
        fetchInitialNotifications();
        // setShowAlert(notification);
      });

      socketRef.current.on('notifStartCampaign', () => {
        fetchInitialNotifications();
        // setShowAlert(notification);

      });

      socketRef.current.on('campaignExpirationAlert', () => {
        fetchInitialNotifications();
        // setShowAlert(notification);

      });

      socketRef.current.on('successCampaign', () => {
        fetchInitialNotifications();
        // setShowAlert(notification);

      });

      socketRef.current.on('failedCampaign', () => {
        fetchInitialNotifications();
        // setShowAlert(notification);
        console.log('failedCampaign',notification);

      });
    
 
      return () => {
        // Clean up the socket when the component unmounts
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
  }, []);
  
  const displayNotification = (notif:Notification ) => {

    const removeNotif = async () => {
      try {
        await axios.delete(`http://backend.docker.local/api/users/notification/delete/${notif._id}`);
            // setNotification(notification.filter(not => not._id !== notif._id));      
            fetchInitialNotifications();
            
     
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    } 
    const check = ()=>{
      Swal.fire({
        title: notif.notifTitle,
        text: notif.notifPayload,
        imageUrl: notif.notifTitle=='Welcome!' ? `${toAbsoluteUrl('/media/swall/welcome.jpg')}`
                : notif.notifTitle=='Status Verification' ? `${toAbsoluteUrl('/media/swall/status_verif.gif')}`
                : notif.notifTitle=='New Campaign' ? `${toAbsoluteUrl('/media/swall/new_campaign.jpg')}`
                : notif.notifTitle=='Campaign Expiration' ? `${toAbsoluteUrl('/media/swall/exp_date.gif')}`
                
                : `${toAbsoluteUrl('/media/misc/pattern-1.jpg')}` ,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      //   backdrop: `
      //   rgba(0,0,123,0.4)
      //   url(${require('/images/status_verif.gif').default})
      //   left top
      //   no-repeat
      // `,
        customClass: 'custom-sweetalert'
      })
      
    }
    const trancatedMessage = notif.notifPayload.length > 20
    ? `${notif.notifPayload.slice(0, 40)} ...`
    : notif.notifPayload;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  return notif.isDeleted !== 1 ? (
    <div className="notification" key={notif._id}>
      <button className="button" onClick={() => removeNotif()}>
        x
      </button>
      <div onClick={check}>
        <span className="notifTitle">{notif.notifTitle}</span> {trancatedMessage}
      </div>
    </div>
  ) : null;
  };
  console.log('nottttt',notification) 



 return(

<div
className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
style={{backgroundImage: `url('${toAbsoluteUrl('/media/misc/notification.png')}')`}}
data-kt-menu='true'
>
<div
  className='d-flex flex-column bgi-no-repeat rounded-top'
  style={{backgroundImage: `url('${toAbsoluteUrl('/media/misc/pattern-1.jpg')}')`}}
>
  <h3 className='text-white fw-bold px-9 mt-6 mb-6 text-center'>
    Notifications  {
                 notification.length >0 &&
                 <div className="counter">{notification.length}</div>
                 }
                 
  </h3>
        <div className='tab-content'>
          {notification.length === 0 ? (
            <p className='void'>You have zero notifications</p>
          ) : (
            
            <div className='notifications'>{notification.map((notif) => 
              
              displayNotification(notif))}
              </div>
          )}
        </div>
</div>
</div>  

 )
}

export {HeaderNotificationsMenu}
