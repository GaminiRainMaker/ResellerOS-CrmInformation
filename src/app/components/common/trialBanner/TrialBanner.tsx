import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Alert, Layout } from 'antd';
import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getActiveLicensesByOrgUserId } from '../../../../../redux/actions/license';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import { StyleName } from '../typography/typography.interface';
import { setLicense } from '../../../../../redux/slices/license';

const TrialBanner: React.FC<{
  PrimaryTextTypography?: StyleName;
}> = ({ PrimaryTextTypography = 'Heading 3/Bold' }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [token] = useThemeToken();
  const { userInformation } = useAppSelector((state) => state.user);
  const { loading: licenseLoading, activeLicensesByOrg } = useAppSelector(
    (state) => state.license,
  );
  const [licenseMessage, setLicenseMessage] = useState<string>('');
  const [currentQuoteLicense, setCurrentQuoteLicense] = useState<any | null>(
    null,
  );

  useEffect(() => {
    if (userInformation?.id) {
      dispatch(getActiveLicensesByOrgUserId({ user_id: userInformation.id }))
        .then((data) => {
          const activeLicenses = data?.payload?.activeLicenses;
          if (activeLicenses?.length > 0) {
            dispatch(setLicense(activeLicenses));
          } else {
            setLicenseMessage('Your Trial phase is expired!');
          }
        })
        .catch((err) => {
          console.log('ERR===>', err);
        });
    }
  }, [userInformation, dispatch]);

  useEffect(() => {
    if (activeLicensesByOrg) {
      const quoteLicense = activeLicensesByOrg?.activeLicenses?.find(
        (l: any) => l.feature_name === 'QuoteAI',
      );

      if (quoteLicense?.license_type === 'LifeTime') {
        setCurrentQuoteLicense('Lifetime');
      } else {
        setCurrentQuoteLicense(quoteLicense || null);
      }
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

  return (
    <Layout>
      <Alert
        style={{
          display: 'flex',
          padding: '15px',
          borderRadius: '4px',
          border: `1px solid ${currentQuoteLicense === 'Lifetime' ? token?.colorSuccess : token?.colorError}`,
          width: 'fit-content',
        }}
        message={
          <Typography
            color={
              currentQuoteLicense === 'Lifetime'
                ? token?.colorSuccess
                : token?.colorError
            }
            name={PrimaryTextTypography}
          >
            {currentQuoteLicense === 'Lifetime'
              ? 'LifeTime License!'
              : licenseMessage
                ? licenseMessage
                : `Your ${currentQuoteLicense?.license_type === 'demo' ? 'Trial' : currentQuoteLicense?.license_type === 'Paid' ? 'Subscription' : 'extended Trial'} expires in 
      ${remainingDays} Days!`}
          </Typography>
        }
        type={currentQuoteLicense === 'Lifetime' ? 'success' : 'error'}
        icon={
          <CheckBadgeIcon
            width={24}
            color={
              currentQuoteLicense === 'Lifetime'
                ? token?.colorSuccess
                : token?.colorError
            }
          />
        }
      />
    </Layout>
  );
};

export default TrialBanner;
