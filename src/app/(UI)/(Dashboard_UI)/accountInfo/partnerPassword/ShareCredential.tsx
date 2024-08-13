import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {OsContactCardStyle} from '@/app/components/common/os-card/styled-components';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {EnvelopeIcon} from '@heroicons/react/24/outline';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {queryAllUsers} from '../../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {getSharedPartnerPasswordForOrganization} from '../../../../../../redux/actions/sharedPartnerPassword';
import GlobalLoader from '@/app/components/common/os-global-loader';

const ShareCredential: FC<any> = ({
  setShareCredentialsIds,
  shareCredentialsIds,
  partnerPasswordId,
}) => {
  const searchParams = useSearchParams()!;
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const getOrganization = searchParams.get('organization');
  const {data: userData} = useAppSelector((state) => state.user);
  const {userInformation} = useAppSelector((state) => state.user);
  const [allSharedWith, setAllSharedWith] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const [requireThePass, setReqThePass] = useState<any>();

  useEffect(() => {
    setLoading(true);
    dispatch(
      queryAllUsers({
        organization: getOrganization,
      }),
    );
    dispatch(getSharedPartnerPasswordForOrganization(partnerPasswordId))?.then(
      (payload: any) => {
        if (payload?.payload) {
          let newArr: any = [];
          payload?.payload?.map((items: any) => {
            newArr?.push(items?.shared_with);
          });
          setAllSharedWith(newArr);
        }
      },
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      let newArr: any = [];
      if (userData) {
        userData?.map((item: any) => {
          if (
            item?.id !== userInformation?.id &&
            !allSharedWith?.includes(item?.id)
          ) {
            newArr?.push(item);
          }
        });
      }
      setReqThePass(newArr);
    }, 1000);
    setLoading(false);
  }, [userData, allSharedWith]);

  const shareCredentials = (shared_with: number) => {
    const updatedArr = [...shareCredentialsIds];
    const index = updatedArr.findIndex(
      (obj) => obj?.shared_with === shared_with,
    );

    if (index === -1) {
      updatedArr.push({
        partner_password_id: partnerPasswordId || 0,
        shared_by: userInformation?.id || 0,
        shared_with: shared_with,
        organization: userInformation?.organization,
      });
    } else {
      updatedArr.splice(index, 1);
    }

    setShareCredentialsIds(updatedArr);
  };

  return (
    <GlobalLoader loading={loading}>
      <Row gutter={[16, 16]}>
        {requireThePass?.length > 0 ? (
          <>
            {' '}
            {requireThePass?.map((item: any, index: number) => {
              return (
                <Col key={item?.id} style={{width: '100%'}} span={8}>
                  <OsContactCardStyle key={`${index}`}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Space direction="vertical" size={8} align="start">
                          <TableNameColumn
                            primaryText={
                              <Typography name="Body 3/Regular">
                                {item?.first_name && item?.last_name
                                  ? `${item.first_name} ${item.last_name}`
                                  : item?.first_name
                                    ? item.first_name
                                    : item?.user_name}
                              </Typography>
                            }
                            secondaryText={
                              <Typography name="Body 4/Regular">
                                {item?.role ?? '--'}
                              </Typography>
                            }
                            fallbackIcon={`${(
                              item?.first_name ?? item?.user_name
                            )
                              ?.toString()
                              ?.charAt(0)
                              ?.toUpperCase()}`}
                            iconBg="#1EB159"
                          />

                          <Space size={8} align="center">
                            <EnvelopeIcon
                              width={24}
                              color={token?.colorInfoBorder}
                              style={{marginTop: '5px'}}
                            />
                            <Typography name="Body 4/Regular" as="span">
                              {item?.billing_email ?? item?.email}
                            </Typography>
                          </Space>
                        </Space>
                      </Col>
                      <Col>
                        <Checkbox
                          onChange={() => {
                            shareCredentials(item?.id);
                          }}
                        />
                      </Col>
                    </Row>
                  </OsContactCardStyle>
                </Col>
              );
            })}
          </>
        ) : (
          <>
            {' '}
            {!loading && (
              <Typography name="Body 2/Regular">
                There is no user to provide with this password.
              </Typography>
            )}
          </>
        )}
      </Row>
    </GlobalLoader>
  );
};

export default ShareCredential;
