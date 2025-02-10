/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Col from 'antd/es/grid/col';
import Row from 'antd/es/grid/row';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {CustomTabStyle} from './styled-components';
import OsButton from '../os-button';
import {OSDraggerStyleForSupport} from '../os-upload/styled-components';
import TextArea from 'antd/es/input/TextArea';
import GlobalLoader from '../os-global-loader';
import {Divider, message, notification} from 'antd';
import {convertFileToBase64} from '@/app/utils/base';
import {
  uploadDocumentOnAzure,
  uploadToAws,
  uploalImageonAzure,
} from '../../../../../redux/actions/upload';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {sendEmailForSuport} from '../../../../../redux/actions/auth';
import {Color} from 'antd/es/color-picker';

const AdminCustomTabs: FC<any> = (tabs) => {
  const searchParams = useSearchParams()!;
  const getTab = searchParams.get('tab');
  const pathname = usePathname();
  const {userInformation, searchDataa, loginUserInformation} = useAppSelector(
    (state) => state.user,
  );
  const dispatch = useAppDispatch();

  const [activekeysall, setActivekeysall] = useState<number>(1);
  const [token] = useThemeToken();
  const [tempChild, setTempChild] = useState<any>();

  const [uploadedData, setUpoadedData] = useState<any>();
  const [addIssueToSupport, SetAddIssueToSupport] = useState<any>();
  const [errorForSupport, setErrorForSupport] = useState<boolean>(false);
  const [loadingSpin, setLoadingSpin] = useState<boolean>(false);
  const router = useRouter();

  console.log('23432432432', tabs);
  useEffect(() => {
    if (tabs?.tabs?.length > 0) {
      let tabIndex;
      let superChildIndex;
      if (pathname === '/admin') {
        switch (getTab) {
          case 'Configuration':
            tabIndex = 0;
            superChildIndex = 0;
            break;
          case 'AddProducts':
            tabIndex = 0;
            superChildIndex = 1;
            break;
          case 'AddContracts':
            tabIndex = 0;
            superChildIndex = 2;
            break;
          case 'AddContractProducts':
            tabIndex = 0;
            superChildIndex = 3;
            break;
          case 'allUsers':
            tabIndex = 1;
            superChildIndex = 0;
            break;
          case 'rolesAndPermission':
            tabIndex = 1;
            superChildIndex = 1;
            break;
          case 'formstack':
            tabIndex = 2;
            superChildIndex = 0;
            break;
          default:
            tabIndex = 0;
            superChildIndex = 0;
        }
        const initialChild =
          tabs.tabs[tabIndex]?.childitem?.[superChildIndex]?.superChild;
        setTempChild(initialChild);
        setActivekeysall(
          tabs.tabs[tabIndex]?.childitem?.[superChildIndex]?.key,
        );
      } else {
        switch (getTab) {
          case 'myProfile':
            tabIndex = 0;
            superChildIndex = 0;
            break;
          case 'myTeam':
            tabIndex = 0;
            superChildIndex = 1;
            break;
          case 'partnerPassword':
            tabIndex = 1;
            superChildIndex = 0;
            break;
          case 'support':
            tabIndex = 2;
            superChildIndex = 0;
            break;
          case 'faq':
            tabIndex = 2;
            superChildIndex = 1;
            break;
          default:
            tabIndex = 0;
            superChildIndex = 0;
        }
        const initialChild =
          tabs.tabs[tabIndex]?.childitem?.[superChildIndex]?.superChild;
        setTempChild(initialChild);
        setActivekeysall(
          tabs.tabs[tabIndex]?.childitem?.[superChildIndex]?.key,
        );
      }
    }
  }, [getTab]);
  const setDataFunc = (namess: string, location: any) => {
    // Using the functional setState to access the latest state
    setUpoadedData((prevData: any) => {
      // Ensure prevData is always an array
      const validPrevData = Array.isArray(prevData) ? prevData : [];

      // Create a new array with the updated data
      const newArr = [...validPrevData, {name: namess, urlAdded: location}];

      // Log the updated array before setting the state

      // Return the updated array to be set as the new state
      return newArr;
    });
  };
  const beforeUpload = async (file: File) => {
    const obj: any = {...file};
    setLoadingSpin(true);
    let pathUsedToUpload = file?.type?.split('.')?.includes('document')
      ? uploadDocumentOnAzure
      : file?.type?.split('.')?.includes('image/jpeg') ||
          file?.type?.split('/')?.includes('image')
        ? uploalImageonAzure
        : uploadToAws;

    convertFileToBase64(file)
      .then(async (base64String: string) => {
        obj.base64 = base64String;
        obj.name = file?.name;

        await dispatch(pathUsedToUpload({document: base64String})).then(
          (payload: any) => {
            setDataFunc(file?.name, payload?.payload?.data);
          },
        );

        setLoadingSpin(false);
      })
      .catch((error: any) => {
        message.error('Error converting file to base64', error);
      });
  };
  useEffect(() => {
    if (addIssueToSupport && addIssueToSupport?.length > 0) {
      setErrorForSupport(false);
    }
  }, [addIssueToSupport]);

  const sendEmailTOSupport = async () => {
    if (!addIssueToSupport) {
      setErrorForSupport(true);

      return;
    }

    setLoadingSpin(true);
    let newArrForUploadded: any = [];

    if (uploadedData && uploadedData?.length > 0) {
      uploadedData?.map((items: any) => {
        newArrForUploadded?.push(items?.urlAdded);
      });
    }

    let newObj = {
      issue: addIssueToSupport,
      attach: newArrForUploadded,
      // organizationName: userInformation?.organization,
      organizationName: userInformation?.organization,
      userName: userInformation?.username,
      userEmail: userInformation?.email,
      tab: pathname,
    };

    await dispatch(sendEmailForSuport(newObj))?.then((payload: any) => {
      notification?.open({
        message: 'Your issue request submitted successfully',
        type: 'success',
      });
    });

    setLoadingSpin(false);
    SetAddIssueToSupport('');
    setUpoadedData([]);
  };
  const getSuperChild = () => {
    return (
      <div
        style={{
          width: '100%',
          background: 'transparent',
          padding: '0px 0px 24px 24px',
          borderRadius: '12px',
        }}
      >
        {tempChild ??
          (getTab === 'support' ? (
            <>
              <GlobalLoader loading={loadingSpin}>
                {/* <Typography name="Body 2/Medium">Report an Issue</Typography>
                <Divider /> */}
                <Space
                  content="center"
                  style={{display: 'flex', justifyContent: 'center'}}
                >
                  <Typography name="Body 2/Medium">
                    Please provide detail for your issue.
                  </Typography>
                </Space>
                <Space
                  content="center"
                  direction="vertical"
                  style={{width: '100%', marginTop: '20px'}}
                  // style={{display: 'flex', justifyContent: 'center'}}
                >
                  <Typography name="Body 3/Medium">Issue Details:</Typography>
                  <TextArea
                    style={{
                      width: '100%',
                      height: '100px',
                      border: errorForSupport ? '1px solid red' : '',
                    }}
                    value={addIssueToSupport}
                    onChange={(e: any) => {
                      SetAddIssueToSupport(e?.target?.value);
                    }}
                  />
                  {errorForSupport && (
                    <div style={{color: 'red'}}>Issue details is required!</div>
                  )}
                  <div>
                    <Row>
                      {uploadedData &&
                        uploadedData?.length > 0 &&
                        uploadedData?.map((items: any) => {
                          return (
                            <Col
                              span={6}
                              style={{
                                width: '300px',
                                height: '100px',
                                background:
                                  'var(--foundation-n-pri-2-n-30, #f0f4f7)',
                                margin: '5px',
                                borderRadius: '5px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                padding: '10px',
                                border: ' 1px solid #3da5d9',
                                borderStyle: 'dashed',
                              }}
                              onClick={() => {
                                window?.open(items?.urlAdded);
                              }}
                            >
                              {items?.name?.toString()?.slice(0, 30)}
                            </Col>
                          );
                        })}
                    </Row>
                  </div>
                  <div style={{width: '200px'}}>
                    {' '}
                    <OSDraggerStyleForSupport
                      beforeUpload={beforeUpload}
                      showUploadList={false}
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.docx"
                    >
                      {' '}
                      <span style={{color: '#3da5d9'}}>Upload a file</span>
                    </OSDraggerStyleForSupport>
                  </div>
                </Space>
                <div style={{display: 'flex', justifyContent: 'right'}}>
                  <OsButton
                    buttontype="PRIMARY"
                    text="Submit"
                    clickHandler={sendEmailTOSupport}
                  />
                </div>
              </GlobalLoader>
            </>
          ) : (
            'No Data'
          ))}
      </div>
    );
  };

  return (
    <Row>
      <Col xs={24} sm={8} md={5} span={5}>
        <CustomTabStyle token={token}>
          <div style={{width: '100%'}}>
            {tabs?.tabs?.map((itemtab: any) => {
              return (
                <Space
                  direction="vertical"
                  key={itemtab?.key}
                  size={12}
                  style={{width: '100%'}}
                >
                  <Typography name="Body 4/Medium">{itemtab?.title}</Typography>
                  <div style={{marginBottom: '15px', cursor: 'pointer'}}>
                    {itemtab?.childitem?.map((itemild: any) => {
                      return (
                        <>
                          <Typography
                            style={{
                              padding: '12px 24px',
                              background:
                                activekeysall === itemild?.key
                                  ? token.colorInfo
                                  : '',
                              color:
                                activekeysall === itemild?.key
                                  ? token.colorBgContainer
                                  : token.colorTextDisabled,
                              borderRadius: '12px',
                            }}
                            as="div"
                            cursor="pointer"
                            name="Button 1"
                            onClick={() => {
                              router?.push(itemild?.route);
                              setTempChild(itemild?.superChild);
                              setActivekeysall(itemild?.key);
                            }}
                            key={`${itemild?.key}`}
                          >
                            {itemild?.name}
                          </Typography>
                        </>
                      );
                    })}
                  </div>
                </Space>
              );
            })}
          </div>
        </CustomTabStyle>
      </Col>
      <Col xs={24} sm={16} md={19} span={19}>
        {getSuperChild()}
      </Col>
    </Row>
  );
};

export default AdminCustomTabs;
