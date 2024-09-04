import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsTooltip from '@/app/components/common/os-tooltip';
import Typography from '@/app/components/common/typography';
import {InformationCircleIcon} from '@heroicons/react/24/outline';
import {useEffect, useState} from 'react';

const ElectronBot = () => {
  const [os, setOs] = useState('');
  const [token] = useThemeToken();

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) {
      setOs('windows');
    } else if (platform.includes('mac')) {
      setOs('mac');
    } else if (platform.includes('linux')) {
      setOs('linux');
    }
  }, []);

  const getLink = () => {
    switch (os) {
      case 'windows':
        return '/docs/windows-requirements.txt';
      case 'mac':
        return '/docs/mac-requirements.txt';
      case 'linux':
        return '/docs/linux-requirements.txt';
      default:
        return '#';
    }
  };

  return (
    <div style={{padding: '10px', marginTop: '10px'}}>
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
        <br />
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
      <br />
      <br />
      <br />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography
          name="Body 3/Bold"
          color={token?.colorLink}
          style={{marginBottom: '6px'}}
        >
          Note:
        </Typography>
        <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
          <ul style={{listStyleType: 'disc', marginLeft: '20px'}}>
            <li>
              <a
                href={getLink()}
                download
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <span
                  style={{
                    textDecoration: 'underline',
                    color: 'blue',
                    cursor: 'pointer',
                  }}
                >
                  Download
                </span>{' '}
                Node.js Requirements for {os || 'Your OS'}
              </a>
            </li>
          </ul>
        </Typography>
      </div>
    </div>
  );
};

export default ElectronBot;
