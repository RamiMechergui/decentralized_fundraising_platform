import { FC,useEffect,useState} from 'react';
import { toAbsoluteUrl } from '../../../_metronic/helpers';

type Props = {
  status: string;
};

const Statuscard: FC<Props> = ({ status }) => {
  const [badge, setBadge] = useState('');

  useEffect(() => {
    // Set the badge based on the value of the status prop
    switch (status) {
      case 'In Process':
        setBadge('badge badge-warning fs-5 fw-bolder');
        break;
      case 'Accepted':
        setBadge('badge badge-success fs-5 fw-bolder');
        break;
      case 'Rejected':
        setBadge('badge badge-danger fs-5 fw-bolder');
        break;
      default:
        setBadge('badge badge-primary fs-5 fw-bolder');
    }
  }, [status]);

  return (
    <div>
      <span className={badge}>{status}</span>
    </div>
  );
};

export { Statuscard };
