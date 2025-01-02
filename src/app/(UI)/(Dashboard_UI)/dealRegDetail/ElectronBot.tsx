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

  const getNodeJsRequirementsLink = () => {
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

  const getVideoLink = () => {
    switch (os) {
      case 'windows':
        return 'https://reselller-os.s3.amazonaws.com/Node-installation-process.mkv';
      case 'mac':
        return 'https://reselller-os.s3.amazonaws.com/Node-installation-process-mac.mkv';
      case 'linux':
        return 'https://reselller-os.s3.amazonaws.com/Node-installation-process-linux.mkv';
      default:
        return '#';
    }
  };

  const getElectronAppLink = () => {
    switch (os) {
      case 'windows':
        return 'https://rosdevdi.blob.core.windows.net/reselleros/DealRegAI%20Setup%200.1.0.exe?sp=r&st=2025-01-02T13:00:05Z&se=2050-01-02T21:00:05Z&spr=https&sv=2022-11-02&sr=b&sig=k4yoqBcxeyaFGNA4dWtDteuQ2F41XmpoBDLgnGzbH6Y%3D';
      case 'mac':
        return 'https://rosdevdi.blob.core.windows.net/reselleros/DealRegAI-0.1.0.dmg?sp=r&st=2024-12-23T12:34:34Z&se=2050-12-23T20:34:34Z&spr=https&sv=2022-11-02&sr=b&sig=hd9sAnyxsoOsXn41iuKnDVFkqwreff3T165iwQ7gFuc%3D';
      case 'linux':
        return 'https://reselller-os.s3.amazonaws.com/MyApp-linux-x64.zip';
      default:
        return '#';
    }
  };

  const getPlaywrightVideoLink = () => {
    switch (os) {
      case 'windows':
        return 'https://reselller-os.s3.amazonaws.com/ResellerOS_Electron_App_installation_process.mkv';
      case 'mac':
        return 'https://reselller-os.s3.amazonaws.com/Electron+APP+and+Playwright+installation+process-mac.mkv';
      case 'linux':
        return 'https://reselller-os.s3.amazonaws.com/Electron+APP+and+Playwright+installation+process-linux.mkv';
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
            <a href={getVideoLink()} target="_blank" rel="noopener noreferrer">
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
          {/* {os !== 'mac' ? ( */}
          <a href={getElectronAppLink()} download>
            <OsButton text="Download Electron App" buttontype="PRIMARY" />
          </a>
          {/* ) : (
            <Space>
              <Space
                direction="vertical"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: "center"
                }}
              >
                {' '}
                <a href='https://reselller-os.s3.amazonaws.com/ResellerOS+App-0.1.0-arm64-mac.zip' download>
                  <OsButton text="Electron App" buttontype="PRIMARY" />
                </a>
                <Typography name="Body 4/Regular">
                  For M Chip Users
                </Typography>
              </Space>

              <Space
                direction="vertical"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: "center"
                }}
              >
                <a href='https://reselller-os.s3.amazonaws.com/ResellerOS+App-0.1.0-mac.zip' download>
                  <OsButton text="Electron App" buttontype="PRIMARY" />
                </a>
                <Typography name="Body 4/Regular">
                  For
                  Intel Processor Users
                </Typography>
              </Space>
            </Space>
          )} */}
          <div style={{position: 'relative', display: 'inline-block'}}>
            <a
              href={getPlaywrightVideoLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
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
                href={getNodeJsRequirementsLink()}
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
