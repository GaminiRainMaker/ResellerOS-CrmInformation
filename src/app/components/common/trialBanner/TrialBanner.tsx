import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {Alert, Layout} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {CheckBadgeIcon} from '@heroicons/react/24/outline';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {getActiveLicensesByOrgUserId} from '../../../../../redux/actions/license';
import {usePathname} from 'next/navigation';

const TrialBanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [token] = useThemeToken();
  const {userInformation} = useAppSelector((state) => state.user);
  const {loading: licenseLoading, activeLicensesByOrg} = useAppSelector(
    (state) => state.license,
  );
  const [licenseMessage, setLicenseMessage] = useState<string>('');
  const [currentQuoteLicense, setCurrentQuoteLicense] = useState<any | null>(
    null,
  );

  useEffect(() => {
    if (userInformation?.id) {
      dispatch(
        getActiveLicensesByOrgUserId({user_id: userInformation.id}),
      ).then((data) => {
        const activeLicenses = data?.payload?.activeLicenses;
        if (activeLicenses?.length > 0) {
          const demoLicense = activeLicenses?.find(
            (l: any) => l.license_type === 'demo',
          );
          const trialLicense = activeLicenses?.find(
            (l: any) => l.license_type === 'trial',
          );

          if (demoLicense) {
            setLicenseMessage(
              'You are currently in the Demo phase. Please subscribe for continued access.',
            );
          } else if (trialLicense) {
            setLicenseMessage(
              'You are now in the Trial phase. Please subscribe for continued access.',
            );
          }
        }
      });
    }
  }, [userInformation, dispatch]);

  useEffect(() => {
    if (activeLicensesByOrg) {
      const quoteLicense = activeLicensesByOrg?.activeLicenses?.find(
        (l: any) => l.feature_name === 'QuoteAI',
      );
      setCurrentQuoteLicense(quoteLicense || null);
    }
  }, [activeLicensesByOrg]);

  useEffect(() => {
    if (currentQuoteLicense?.expiration_date) {
      const today = dayjs();
      const expiryDate = dayjs(currentQuoteLicense.expiration_date);
      const diff = expiryDate.diff(today, 'day');
      setRemainingDays(diff >= 0 ? diff + 1 : 0);
    }
  }, [currentQuoteLicense]);

  useEffect(() => {
    // Check if the user has previously closed the banner
    const isBannerClosed = sessionStorage.getItem('trialBannerClosed');
    if (isBannerClosed === 'true') {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }, [pathname]); // Reset when navigating

  // if (isHidden || remainingDays === null || remainingDays <= 0) return null;

  return (
    <Layout>
      <Alert
        style={{
          display: 'flex',
          padding: '20px',
          borderRadius: '4px',
          border: `1px solid ${token?.colorWarning}`,
        }}
        message={
          <Typography color={token?.colorWarning} name="Heading 3/Bold">
            Your free {licenseMessage.includes('Demo') ? 'demo' : 'trial'}{' '}
            expires in {remainingDays} days!
          </Typography>
        }
        type='warning'
        description={
          <Typography color={token?.colorWarning} name="Body 3/Medium">
            {licenseMessage}
          </Typography>
        }
        icon={<CheckBadgeIcon width={24} color={token?.colorSuccess} />}
        
      />
    </Layout>
  );
};

export default TrialBanner;
