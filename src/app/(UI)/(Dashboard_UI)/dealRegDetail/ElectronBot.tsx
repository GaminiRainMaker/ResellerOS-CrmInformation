import React, {useEffect, useState} from 'react';
import Typography from '@/app/components/common/typography';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import {DownOutlined} from '@ant-design/icons';
import {Button} from 'antd';

const ElectronBot = () => {
  const [downloadLink, setDownloadLink] = useState('#');

  const getDownloadLink = () => {
    const os = navigator.platform.startsWith('Win') ? 'windows' : 'mac';
    console.log('OS detected:', os);
    const scriptUrl =
      os === 'windows'
        ? '/playwright-files/install_playwright.ps1'
        : '/playwright-files/install_playwright.sh';

    return scriptUrl;
  };

  useEffect(() => {
    setDownloadLink(getDownloadLink());
  }, []);

  return (
    <div style={{padding: '10px'}}>
      <Space direction="vertical" size="middle">
        <Typography name="Body 3/Medium">
          <Typography name="Body 3/Bold">Step 1:</Typography> Download the file.
        </Typography>

        <a href={downloadLink} download>
          <OsButton buttontype="PRIMARY" text="Download File" />
        </a>

        <Typography name="Body 3/Medium">
          <Typography name="Body 3/Bold">Step 2:</Typography> Move it to the
          folder where the file is downloaded using CMD, and then run the
          following command:
        </Typography>
        <pre
          style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          powershell -ExecutionPolicy Bypass -File "install_playwright.ps1"
        </pre>

        <Typography name="Body 3/Medium">
          <Typography name="Body 3/Bold">Step 3:</Typography> Click the button
          below to download the ElectroNeek App.
        </Typography>

        <a
          href={
            'https://reselller-os.s3.amazonaws.com/ResellerOS-Electron-App.zip'
          }
          download
        >
          <OsButton text="Download Electron App" buttontype="PRIMARY" />
        </a>
      </Space>
    </div>
  );
};

export default ElectronBot;