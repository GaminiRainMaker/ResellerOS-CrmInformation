import React, {useEffect, useState} from 'react';
import Typography from '@/app/components/common/typography';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import {DownOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {InformationCircleIcon} from '@heroicons/react/24/outline';
import OsTooltip from '@/app/components/common/os-tooltip';

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
          <Typography name="Body 3/Bold">Step 1:</Typography> Download Node.js
          according to your operating system.
        </Typography>
        <Space size={20}>
          <a
            href="https://nodejs.org/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OsButton buttontype="PRIMARY" text="Download Node.js" />
          </a>

          <div style={{position: 'relative', display: 'inline-block'}}>
            <a href={'videoLink'} target="_blank" rel="noopener noreferrer">
              <OsButton buttontype="SECONDARY" text="Watch Video" />
            </a>
            <OsTooltip
              color="white"
              title={
                <Typography name="Body 3/Medium">
                  <Typography name="Body 3/Bold">Watch the video:</Typography>{' '}
                  Follow the steps shown in the video to download and install
                  Node.js.
                </Typography>
              }
              overlayStyle={{marginLeft: '500px', width: '800px'}}
            >
              <InformationCircleIcon
                width={25}
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-25px',
                }}
              />{' '}
            </OsTooltip>
          </div>
        </Space>

        {/* Step 2: Download Electron App */}

        <Typography name="Body 3/Medium">
          <Typography name="Body 3/Bold">Step 2:</Typography> Click the button
          below to download the ResellerOS Electron App.
        </Typography>
        <Space size={20}>
          <a
            href={'https://reselller-os.s3.amazonaws.com/MyApp-win32-x64.zip'}
            download
          >
            <OsButton text="Download Electron App" buttontype="PRIMARY" />
          </a>

          <div style={{position: 'relative', display: 'inline-block'}}>
            <a href={'videoLink'} target="_blank" rel="noopener noreferrer">
              <OsButton buttontype="SECONDARY" text="Watch Video" />
            </a>
            <OsTooltip
              color="white"
              title={
                <Typography name="Body 3/Medium">
                  <Typography name="Body 3/Bold">Watch the video:</Typography>{' '}
                  Follow the steps shown in the video to download the electron
                  app and install Playwright.
                </Typography>
              }
              overlayStyle={{marginLeft: '500px', width: '800px'}}
            >
              <InformationCircleIcon
                width={25}
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-25px',
                }}
              />{' '}
            </OsTooltip>
          </div>
        </Space>
      </Space>
    </div>
  );
};

export default ElectronBot;
