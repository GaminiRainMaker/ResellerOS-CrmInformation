import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {Alert} from 'antd'; // Ant Design alert banner
import {CloseOutlined} from '@ant-design/icons'; // Close icon
import useThemeToken from '../hooks/useThemeToken';
import {CheckBadgeIcon} from '@heroicons/react/24/outline';
import Typography from '../typography';

const TrialBanner = ({
  trialExpiry,
  licenseMessage,
}: {
  trialExpiry: string;
  licenseMessage: string;
}) => {
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [token] = useThemeToken();

  useEffect(() => {
    if (trialExpiry) {
      const today = dayjs();
      const expiryDate = dayjs(trialExpiry);
      const diff = expiryDate.diff(today, 'day');
      setRemainingDays(diff >= 0 ? diff + 1 : 0);
    }
  }, [trialExpiry]);

  const handleClose = () => {
    setIsHidden(true); // Hide banner only for the session
  };

  if (isHidden || remainingDays === null || remainingDays <= 0) return null; // Hide banner if expired or manually closed

  return (
    <Alert
      style={{
        display: 'flex',
        padding: '20px',
        borderRadius: '4px',
        border: `12px solid ${token?.colorSuccess}`,
      }}
      message={
        <Typography color={token?.colorWarning} name="Heading 3/Bold">
          Your free {licenseMessage?.includes('Demo') ? 'demo ' : 'trial '}
          expires in {remainingDays} days!
        </Typography>
      }
      description={
        <Typography color={token?.colorWarning} name="Body 3/Medium">
          {licenseMessage}
        </Typography>
      }
      //   type="warning"
      icon={<CheckBadgeIcon width={24} color={token?.colorSuccess} />}
      banner
      closable
      onClose={handleClose}
      closeIcon={<CloseOutlined />}
    />
  );
};

export default TrialBanner;
