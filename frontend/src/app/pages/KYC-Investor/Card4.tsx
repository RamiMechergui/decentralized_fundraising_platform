/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { toAbsoluteUrl } from '../../../_metronic/helpers';

type Props = {
  icon: string;
  Uploaded_on: string;
  description: string;
  UploadedFiles: {
    passport_ID: string;
    Social_Security_Number: string;
  };
};

function getFileExtension(fileName: string): string {
  const parts: string[] = fileName.split('.');
  const extensions: string[] = ["png","mp4","ai", "css", "doc", "fig", "jpg", "pdf", "sql", "tif", "webp", "xml"];
  
  const poppedExtension: string | undefined = parts.pop();
  if (poppedExtension) {
      const lowercaseExtension: string = poppedExtension.toLowerCase();
      if (extensions.includes(lowercaseExtension)) {
          return lowercaseExtension;
      } else {
          return "unknown";
      }
  }
  
  return "unknown"; // Handle the case when the fileName has no extension
}

function getTimePassedFromNow(dateString: string): string {
  const now = new Date();
  const pastDate = new Date(dateString);
  const timeDifference = now.getTime() - pastDate.getTime();

  // Convert time difference to seconds, minutes, and days
  const secondsPassed = Math.floor(timeDifference / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (secondsPassed < 60) {
    return `${secondsPassed} seconds ago`;
  } else if (minutesPassed < 5) {
    return `${minutesPassed} minutes ago`;
  } else if (daysPassed < 1) {
    return 'today';
  } else {
    return `${daysPassed} days ago`;
  }
}

const Card4: FC<Props> = ({ icon, Uploaded_on, description, UploadedFiles }) => {
  return (
   <div className='card h-100'>
    {Object.entries(UploadedFiles).map(([key, value]) => (
      <div key={key} className='card-body d-flex justify-content-center text-center flex-column p-8'>
        <a href='#' className='text-gray-800 text-hover-primary d-flex flex-column'>
          <div className='fw-bolder mb-2 text-dark align-self-start text-uppercase'>{key.replace(/_/g, ' ')}</div>
          <div className='symbol symbol-75px mb-6'>
            <img src={toAbsoluteUrl(icon+getFileExtension(value)+'.svg')} alt='' />
          </div>
          <div className='fs-5 fw-bolder mb-2'>{value}</div>
        </a>
        <div className='fs-7 fw-bold text-gray-400 mt-auto'>{getTimePassedFromNow(Uploaded_on)}</div>
      </div>
    ))}
    </div>
  );
};

export { Card4 };
