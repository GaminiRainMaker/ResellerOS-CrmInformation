import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {
  customerColumnsSync,
  formatStatus,
  opportunityColumnsSync,
  quotLineItemsColumnsSync,
  quoteColumns,
} from '@/app/utils/CONSTANTS';
import {Button, Form} from 'antd';
import {useRouter} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {insertFormStack} from '../../../../../redux/actions/formStackSync';
import {getAllDocuments} from '../../../../../redux/actions/formstack';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const AddDocument: FC<any> = ({
  form,
  documentId,
  setDocumentId,
  syncedNewValue,
  setNewSyncedValue,
  showDoucmentDropDown,
  pdfUrlForDocument,
  setPdfUrlForDocument,
}) => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {data: FormstackData, loading: FormstackLoading} = useAppSelector(
    (state) => state.formstack,
  );
  const {loading: GeneralSettingLoading} = useAppSelector(
    (state) => state.gereralSetting,
  );
  const [selectDropdownType, setSelectDropdownType] = useState<string>('Quote');
  const [columnSelectOptions, setColumnSelectOptions] = useState<any>([]);

  useEffect(() => {
    dispatch(getAllDocuments(''));
  }, []);
  useEffect(() => {
    setNewSyncedValue([]);
    setPdfUrlForDocument();
  }, [documentId]);

  const buttonActiveStyle = {
    background: token.colorPrimaryBg,
    borderColor: token.colorPrimaryBg,
  };

  const buttonInactiveStyle = {
    borderColor: token.colorPrimaryBg,
  };

  const FormstackDataOptions =
    FormstackData &&
    FormstackData.length > 0 &&
    FormstackData?.map((FormstackDataItem: any) => ({
      value: FormstackDataItem.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {FormstackDataItem.name}
        </Typography>
      ),
    }));

  useEffect(() => {
    switch (selectDropdownType) {
      case 'Quote Line Item':
        setColumnSelectOptions(quotLineItemsColumnsSync);
        break;
      case 'Customer':
        setColumnSelectOptions(customerColumnsSync);
        break;
      case 'Opportunity':
        setColumnSelectOptions(opportunityColumnsSync);
        break;
      default:
        setColumnSelectOptions(quoteColumns);
    }
  }, [selectDropdownType]);

  const syncTableToLineItems = (
    preValue: string,
    newSyncValue: string,
    keyInd: number,
  ) => {
    const newSyncTableData =
      syncedNewValue?.length > 0 ? [...syncedNewValue] : [];

    const indexOfPre = newSyncTableData?.findIndex(
      (item: any) => item?.key === keyInd,
    );
    // const syncOtions =
    //   syncTableQuoteLItemValues?.length > 0
    //     ? [...syncTableQuoteLItemValues]
    //     : [];

    // const indexOFItem = syncOtions?.findIndex(
    //   (itemV: any) => itemV?.value === newSyncValue,
    // );
    // syncOtions?.splice(indexOFItem, 1);

    // setSyncTableQuoteLItemValues(syncOtions);

    if (indexOfPre === -1) {
      newSyncTableData?.push({
        preVal: preValue,
        newVal: newSyncValue,
        key: keyInd,
      });
    } else {
      let newObj = newSyncTableData[indexOfPre];
      newObj = {
        ...newObj,
        newVal: newSyncValue,
      };
      newSyncTableData[indexOfPre] = newObj;
    }
    setNewSyncedValue(newSyncTableData);
  };

  const addNewSyncValues = () => {
    let obj = {
      doc_id: documentId,
      syncJson: [JSON.stringify(syncedNewValue)],
    };

    if (obj && documentId) {
      dispatch(insertFormStack(obj));
    }
  };

  return (
    <GlobalLoader loading={FormstackLoading || GeneralSettingLoading}>
      {FormstackDataOptions ? (
        <>
          {syncedNewValue?.length > 0 ? (
            <>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '20px',
                  height: '50vh',
                  overflow: 'auto',
                }}
              >
                <Col>
                  <Row style={{marginTop: '6px'}}>
                    {' '}
                    <Typography
                      style={{marginLeft: '10px'}}
                      align="center"
                      name="Body 3/Medium"
                    >
                      Your File Header
                    </Typography>
                  </Row>
                  <Divider />
                  {syncedNewValue?.map((item: any) => (
                    <Row style={{marginTop: '6px'}}>
                      <OsInput disabled value={formatStatus(item?.preVal)} />
                    </Row>
                  ))}
                </Col>

                <Col span={16}>
                  <Row style={{marginTop: '6px'}}>
                    {' '}
                    <Typography
                      style={{marginLeft: '10px'}}
                      align="center"
                      name="Body 3/Medium"
                    >
                      Quote Header
                    </Typography>
                  </Row>
                  <Divider />
                  {syncedNewValue?.map((item: any, indexOfCol: number) => (
                    <Row style={{marginTop: '6px'}}>
                      <br />
                      <CommonSelect
                        style={{width: '100%'}}
                        placeholder="Select Columns"
                        allowClear
                        options={columnSelectOptions}
                        onChange={(e: any) => {
                          syncTableToLineItems(item?.preVal, e, indexOfCol);
                        }}
                        value={item?.newVal}
                        dropdownRender={(menu) => (
                          <>
                            <Space
                              direction="vertical"
                              style={{padding: '9px 0px 0px 16px'}}
                            >
                              <Typography
                                color={token?.colorPrimaryText}
                                name="Body 3/Regular"
                              >
                                Select by:
                              </Typography>
                              <Space>
                                <Button
                                  onClick={() => {
                                    setSelectDropdownType('Quote');
                                  }}
                                  style={
                                    selectDropdownType === 'Quote'
                                      ? buttonActiveStyle
                                      : buttonInactiveStyle
                                  }
                                >
                                  <Typography
                                    name="Body 4/Regular"
                                    color={
                                      token[
                                        selectDropdownType === 'Quote'
                                          ? 'colorPrimaryHover'
                                          : 'colorPrimaryBorder'
                                      ]
                                    }
                                    cursor="pointer"
                                  >
                                    Quote
                                  </Typography>
                                </Button>
                                <Button
                                  onClick={() => {
                                    setSelectDropdownType('Quote Line Item');
                                  }}
                                  style={
                                    selectDropdownType === 'Quote Line Item'
                                      ? buttonActiveStyle
                                      : buttonInactiveStyle
                                  }
                                >
                                  <Typography
                                    name="Body 4/Regular"
                                    color={
                                      token[
                                        selectDropdownType === 'Quote Line Item'
                                          ? 'colorPrimaryHover'
                                          : 'colorPrimaryBorder'
                                      ]
                                    }
                                    cursor="pointer"
                                  >
                                    Quote Line Item
                                  </Typography>
                                </Button>
                                <Button
                                  onClick={() => {
                                    setSelectDropdownType('Customer');
                                  }}
                                  style={
                                    selectDropdownType === 'Customer'
                                      ? buttonActiveStyle
                                      : buttonInactiveStyle
                                  }
                                >
                                  <Typography
                                    name="Body 4/Regular"
                                    color={
                                      token[
                                        selectDropdownType === 'Customer'
                                          ? 'colorPrimaryHover'
                                          : 'colorPrimaryBorder'
                                      ]
                                    }
                                    cursor="pointer"
                                  >
                                    Customer
                                  </Typography>
                                </Button>
                                <Button
                                  onClick={() => {
                                    setSelectDropdownType('Opportunity');
                                  }}
                                  style={
                                    selectDropdownType === 'Opportunity'
                                      ? buttonActiveStyle
                                      : buttonInactiveStyle
                                  }
                                >
                                  <Typography
                                    name="Body 4/Regular"
                                    color={
                                      token[
                                        selectDropdownType === 'Opportunity'
                                          ? 'colorPrimaryHover'
                                          : 'colorPrimaryBorder'
                                      ]
                                    }
                                    cursor="pointer"
                                  >
                                    Opportunity
                                  </Typography>
                                </Button>
                              </Space>
                            </Space>
                            <Divider style={{margin: '5px'}} />
                            {menu}
                          </>
                        )}
                      />
                    </Row>
                  ))}
                </Col>
              </Row>
              <Row justify={'end'} style={{marginTop: '50px'}}>
                <OsButton
                  buttontype="PRIMARY"
                  text="Save"
                  clickHandler={addNewSyncValues}
                />
              </Row>
            </>
          ) : (
            <>
              <Form layout="vertical" requiredMark={false} form={form}>
                <Row gutter={[16, 24]} justify="space-between">
                  {showDoucmentDropDown && (
                    <Col span={24}>
                      <SelectFormItem
                        label={
                          <Typography name="Body 4/Medium">Document</Typography>
                        }
                        name="document_id"
                        rules={[
                          {
                            required: true,
                            message: 'Document is required!',
                          },
                        ]}
                      >
                        <CommonSelect
                          style={{width: '100%'}}
                          placeholder="Select Document"
                          allowClear
                          options={FormstackDataOptions}
                          onChange={(e: any) => {
                            console.log('setDocumentId', e);
                            setDocumentId(e);
                          }}
                        />
                      </SelectFormItem>
                    </Col>
                  )}
                </Row>
              </Form>
            </>
          )}
        </>
      ) : (
        <>
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
                  You haven't provided the secret key and API yet, or the
                  provided keys are invalid. Please verify and update them.
                </li>
                <li>
                  You can{' '}
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorLink}
                    style={{textDecoration: 'underline'}}
                    hoverOnText
                    onClick={() => {
                      router.push('/admin?tab=formstack');
                    }}
                  >
                    click here
                  </Typography>{' '}
                  to update the keys.
                </li>
              </ul>
            </Typography>
          </div>
        </>
      )}
    </GlobalLoader>
  );
};

export default AddDocument;
