import React, { FC } from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download'

type Props = {
  user_ID: string;
  FileName: string;
};

const FileDownloader: FC<Props> = ({ user_ID, FileName }) => {
    const handleDownload = async () => {
    try {
      // Make the axios GET request to download the file
      const response = await axios.get(
        'http://backend.tokenopp.org/api/startup/demands/document/download',
        {
          responseType: 'blob',
          params: {
            user_ID: user_ID,
            FileName: FileName,
          },
        }
      )
      // Use the FileDownload library to initiate the download
      FileDownload(response.data, FileName);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  return (
    <div>
      {/* Button to trigger the file download */}
      <button onClick={handleDownload} className="btn btn-success">Download</button>
    </div>
  );
};

export {FileDownloader};
