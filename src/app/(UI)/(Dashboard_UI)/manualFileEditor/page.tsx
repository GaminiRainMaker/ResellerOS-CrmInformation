/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import '@handsontable/pikaday/css/pikaday.css';
import {HotTable} from '@handsontable/react';
import {useEffect, useState} from 'react';
import './styles.css';
import {useRouter, useSearchParams} from 'next/navigation';
import {addClassesToRows, alignHeaders} from '../fileEditor/hooksCallbacks';
import GlobalLoader from '@/app/components/common/os-global-loader';
import 'handsontable/dist/handsontable.min.css';
import {useAppDispatch} from '../../../../../redux/hook';
import {formatStatus} from '@/app/utils/CONSTANTS';
import OsModal from '@/app/components/common/os-modal';
import SyncTableData from '../fileEditor/syncTableforpdfEditor';
import OsButton from '@/app/components/common/os-button';
import {notification, Space} from 'antd';
import Typography from '@/app/components/common/typography';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {getfileByQuoteIdWithManual} from '../../../../../redux/actions/quoteFile';
import {getSalesForceFileData} from '../../../../../redux/actions/auth';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';

const EditorFile = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const router = useRouter();
  const getQuoteID = searchParams.get('id');
  const SaleQuoteId = searchParams.get('quote_Id');
  const [nanonetsLoading, setNanonetsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [arrayOflineItem, setArrayOflineItem] = useState<any>([]);
  const [saveNewHeader, setSaveNewHeader] = useState<boolean>(false);
  const [showConfirmHeader, setShowConfirmHeader] = useState<boolean>(false);
  const [currentFileData, setCurrentFileData] = useState<any>();
  const salesToken = searchParams.get('key');
  const EditSalesLineItems = searchParams.get('editLine');
  const salesForceFiledId = searchParams.get('file_Id');
  const [mergeedColumnHeader, setMergeedColumnHeader] = useState<any>();
  const [oldColumnName, setOldColumnName] = useState<any>();
  const [showAddColumnModal, setShowAddColumnModal] = useState<boolean>(false);
  const [newHeaderName, setNewHeaderName] = useState<any>();
  const salesForceUrl = searchParams.get('instance_url');
  const [showUpdateColumnModal, setShowUpdateColumnModal] =
    useState<boolean>(false);

  const addNewLine = () => {
    let newArr = [
      {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        o: '',
        p: '',
      },
    ];

    setArrayOflineItem(newArr);
  };

  useEffect(() => {
    addNewLine();
  }, []);
  const AddNewHeaderToTheObject = () => {
    setSaveNewHeader(true);
    setShowConfirmHeader(false);
    // Extract headers from the first object
    const headers = arrayOflineItem[0];

    // Remove the first object from the array
    const dataArray = arrayOflineItem.slice(1);

    // Function to replace keys in each object
    const replaceKeys = (obj: any, headers: any) => {
      const newObj: any = {};
      for (const key in obj) {
        const headerKey = headers && headers[key]?.trim(); // Get the corresponding header key and trim any whitespace
        if (headerKey !== '') {
          // Exclude empty headers
          newObj[headerKey] = obj[key];
        }
      }
      return newObj;
    };

    // Map and replace keys for each object in the array
    const transformedData = dataArray.map((obj: any) =>
      replaceKeys(obj, headers),
    );

    setArrayOflineItem(transformedData);
  };
  useEffect(() => {
    const mergeedColumn: any = [];
    const keys =
      arrayOflineItem?.length > 0 && Object.keys(arrayOflineItem?.[0]);
    if (keys) {
      keys?.map((item: any) => {
        if (item) {
          mergeedColumn?.push(formatStatus(item));
        }
      });
    }
    setMergeedColumnHeader(mergeedColumn);
  }, [arrayOflineItem]);

  useEffect(() => {
    if (arrayOflineItem?.length > 1 && !saveNewHeader) {
      const removeDuplicateValues = (obj: any) => {
        const seenValues = new Set();
        const newObj: any = {};

        for (const key in obj) {
          const value = obj[key];
          if (!seenValues.has(value)) {
            seenValues.add(value);
            newObj[key] = value;
          }
        }

        return newObj;
      };

      // Remove duplicates from each object in the array
      const cleanedData = arrayOflineItem.map((obj: any) =>
        removeDuplicateValues(obj),
      );

      setArrayOflineItem(cleanedData);
    }
  }, [arrayOflineItem]);

  const deleteRowsItems = (indexOfDeletion: number, NumberOf: number) => {
    const newArrr = arrayOflineItem?.length > 0 ? [...arrayOflineItem] : [];
    newArrr
      ?.slice(0, indexOfDeletion)
      .concat(newArrr?.slice(indexOfDeletion + NumberOf));

    setArrayOflineItem(newArrr);
  };
  useEffect(() => {
    // SaleQuoteId
    if (SaleQuoteId) {
      let data = {
        token: salesToken,
        FileId: null,
        urls: salesForceUrl,
        quoteId: SaleQuoteId,
      };
      dispatch(getSalesForceFileData(data))?.then((payload: any) => {
        let newObj = {
          file_name: payload?.payload?.title,
          FileId: payload?.payload?.fileId,
        };
        setCurrentFileData(newObj);
      });
    } else {
      dispatch(getfileByQuoteIdWithManual(Number(getQuoteID)))?.then(
        (payload: any) => {
          setCurrentFileData(payload?.payload);
          window.history.replaceState(
            null,
            '',
            `manualFileEditor?id=${Number(getQuoteID)}&fileId=${Number(payload?.payload?.id)}`,
          );
        },
      );
    }
  }, []);

  const updateRowsValue = (
    rowIndex: number,
    keyValue: string,
    changedValue: any,
  ) => {
    const changedArr = arrayOflineItem?.map(
      (itemTop: any, indexOfTop: number) => {
        if (indexOfTop === rowIndex) {
          return {
            ...itemTop,
            [keyValue]: changedValue,
          };
        }
        return itemTop;
      },
    );
    setArrayOflineItem(changedArr);
  };

  const syncShow = (value: string) => {
    if (value === 'sync') {
      setShowModal(true);
    }
    // if (value === 'cancel') {
    //   CancelEditing();
    // }
  };

  const checkForNewFileForSalesForce = async () => {
    let data = {
      token: salesToken,
      FileId: null,
      urls: salesForceUrl,
      quoteId: SaleQuoteId,
    };

    setShowModal(false);
    setShowConfirmHeader(false);
    setSaveNewHeader(false);
    addNewLine();
    dispatch(getSalesForceFileData(data))?.then((payload: any) => {
      if (payload?.payload) {
        let newObj = {
          file_name: payload?.payload?.title,
          FileId: payload?.payload?.fileId,
        };
        setCurrentFileData(newObj);
        notification?.open({
          message: 'Please Update Line Items for new manual File',
          type: 'info',
        });
      } else {
        notification?.open({
          message: 'The Line Items are created! Please close the modal!',
        });
      }
    });
  };

  const checkForNewFile = async () => {
    let isExist: boolean = false;
    let dataNew: any;
    setSaveNewHeader(false);
    addNewLine();
    await dispatch(getfileByQuoteIdWithManual(Number(getQuoteID)))?.then(
      (payload: any) => {
        if (payload?.payload) {
          setCurrentFileData(payload?.payload);
          isExist = true;
          dataNew = payload?.payload;
        } else {
          isExist = false;
        }
      },
    );

    setShowModal(false);
    setShowConfirmHeader(false);
    if (SaleQuoteId) {
    } else {
      if (isExist) {
        location?.reload();
        return;
      } else {
        router.push(`/generateQuote?id=${Number(getQuoteID)}`);
        window.history.replaceState(
          null,
          '',
          `/generateQuote?id=${Number(getQuoteID)}`,
        );
        location?.reload();
      }
    }
  };
  const UpdateTheColumnName = async (type: any, old: string, newVal: any) => {
    let newArr: any = [...arrayOflineItem];
    const renameKey = (arr: any, oldKey: any, newKey: any) => {
      return arr.map((obj: any) => {
        // Create a new object preserving the order of keys
        let newObj: any = {};
        for (let key of Object.keys(obj)) {
          if (key === oldKey) {
            // Rename the old key to new key
            newObj[newKey] = obj[key];
          } else {
            // Copy the other keys as they are
            newObj[key] = obj[key];
          }
        }
        return newObj;
      });
    };
    let updatedArr = renameKey(newArr, old, newVal);
    setArrayOflineItem(updatedArr);
    notification.open({
      message: `Column header ${old} sucessfully changed to ${newVal}.`,
      type: 'success',
    });
    setOldColumnName('');
    setNewHeaderName('');

    if (type === 'close') {
      setShowUpdateColumnModal(false);
    }
  };
  const AddNewCloumnToMergedTable = async (value: any) => {
    let newArr: any = [...arrayOflineItem];
    let resultantArr: any = [];

    newArr?.map((items: any) => {
      resultantArr?.push({...items, [value]: ''});
    });
    setArrayOflineItem(resultantArr);
    setShowAddColumnModal(false);
    setNewHeaderName('');
  };
  const [existingColumnOptions, setExistingColumnName] = useState<any>();
  useEffect(() => {
    let newArr: any = [];
    mergeedColumnHeader?.map((items: any) => {
      newArr?.push({label: items, value: items});
    });
    setExistingColumnName(newArr);
  }, [mergeedColumnHeader]);
  return (
    <GlobalLoader loading={nanonetsLoading}>
      {currentFileData && (
        <Typography
          name="Body 1/Bold"
          // color={token?.colorLink}
          style={{marginBottom: '6px'}}
        >
          {currentFileData?.file_name}
        </Typography>
      )}
      <Row gutter={[32, 16]} style={{marginTop: '10px', marginBottom: '40px'}}>
        <Col span={12}>
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
                <li>Data needs to be copied from an Excel file only.</li>
                <li>
                  The first row will contain the headers of your file data.
                </li>
              </ul>
            </Typography>
          </div>
        </Col>

        <Col span={12}>
          {' '}
          <Space
            onClick={(e) => {
              e?.preventDefault();
            }}
            size={25}
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginRight: '50px',
              right: '0',
              bottom: '0',
              marginBottom: '20px',
            }}
          >
            {' '}
            {!saveNewHeader ? (
              <OsButton
                text="Save Header"
                buttontype="PRIMARY"
                clickHandler={() => {
                  if (arrayOflineItem?.length > 1) {
                    setShowConfirmHeader(true);
                  } else {
                    notification?.open({
                      message: 'Please add data fisrt to save the headers',
                      type: 'info',
                    });
                  }

                  // AddNewHeaderToTheObject();
                }}
              />
            ) : (
              <>
                {' '}
                <Space
                  onClick={(e) => {
                    e?.preventDefault();
                  }}
                  size={25}
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginRight: '50px',
                    right: '0',
                    bottom: '0',
                    marginBottom: '20px',
                  }}
                >
                  <OsButton
                    text="Update Column Name"
                    buttontype="PRIMARY"
                    clickHandler={() => {
                      setShowUpdateColumnModal(true);
                    }}
                  />
                  <OsButton
                    text="Add New Column"
                    buttontype="PRIMARY"
                    clickHandler={() => {
                      setShowAddColumnModal(true);
                    }}
                  />
                </Space>
              </>
            )}
          </Space>
        </Col>
      </Row>
      <HotTable
        data={arrayOflineItem}
        colWidths={[
          300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
          300, 300,
        ]}
        height="auto"
        colHeaders={mergeedColumnHeader}
        width="auto"
        minSpareRows={0}
        autoWrapRow
        autoWrapCol
        licenseKey="non-commercial-and-evaluation"
        dropdownMenu
        hiddenColumns={{
          indicators: true,
        }}
        contextMenu
        multiColumnSorting
        filters
        rowHeaders
        allowInsertRow
        // allowInsertColumn={true}
        afterGetColHeader={alignHeaders}
        beforeRenderer={() => {
          addClassesToRows('', '', '', '', '', '', arrayOflineItem);
        }}
        afterRemoveRow={(change, source) => {
          if (arrayOflineItem?.length > 1) {
            deleteRowsItems(source, change);
          } else {
            // notification?.open({
            //   message: 'You can not delete only row from table',
            //   type: 'error',
            // });
            addNewLine();
          }
        }}
        afterChange={(change: any, source) => {
          if (change) {
            updateRowsValue(
              change?.[0]?.[0],
              change?.[0]?.[1],
              change?.[0]?.[3],
            );
          }
        }}
      />
      <br />
      <Space
        onClick={(e) => {
          e?.preventDefault();
        }}
        size={25}
        style={{
          display: 'flex',
          justifyContent: 'end',
          marginRight: '50px',
          right: '0',
          bottom: '0',
          marginBottom: '20px',
        }}
      >
        {/* <OsButton
          text="Cancel"
          buttontype="SECONDARY"
          clickHandler={() => {
            syncShow('cancel');
          }}
        /> */}
        <OsButton
          text="Sync Table"
          buttontype="PRIMARY"
          clickHandler={() => {
            // router.push(`/generateQuote?id=${Number(getQuoteID)}`);

            if (saveNewHeader) {
              syncShow('sync');
            } else {
              notification?.open({
                message:
                  'Please add the data from excel and save the header first.',
                type: 'info',
              });
            }
          }}
        />
      </Space>
      <OsModal
        // title={'Share Credentials in Team'}
        body={
          <Row style={{width: '100%', padding: '15px'}}>
            <Space
              style={{width: '100%'}}
              size={24}
              direction="vertical"
              align="center"
            >
              <Space direction="vertical" align="center" size={1}>
                <Typography
                  name="Heading 3/Medium"
                  style={{display: 'flex', textAlign: 'center'}}
                >
                  Your first row is going to be the headers of the data.
                </Typography>
                <Typography name="Body 3/Regular">
                  Are you sure you want to save the headers?
                </Typography>
              </Space>

              <Space size={12}>
                <OsButton
                  text={`Don't Save`}
                  buttontype="SECONDARY"
                  clickHandler={() => {
                    setShowConfirmHeader(false);
                  }}
                />
                <OsButton
                  text="Yes, Save"
                  buttontype="PRIMARY"
                  clickHandler={() => {
                    AddNewHeaderToTheObject();
                  }}
                />
              </Space>
            </Space>
          </Row>
        }
        width={600}
        open={showConfirmHeader}
        // open={true}
        onCancel={() => {
          setShowConfirmHeader(false);
        }}
        onOk={AddNewHeaderToTheObject}
        // primaryButtonText=""
        bodyPadding={40}
      />

      {showModal && (
        <OsModal
          // loading={loading}
          body={
            <SyncTableData
              mergedValue={arrayOflineItem}
              setMergedVaalues={setArrayOflineItem}
              setNanonetsLoading={setNanonetsLoading}
              nanonetsLoading={nanonetsLoading}
              routingConditions={checkForNewFile}
              currentFileId={currentFileData?.FileId}
              currentFileName={currentFileData?.file_name}
              manualFlow={true}
              checkForNewFileForSalesForce={checkForNewFileForSalesForce}
            />
          }
          width={600}
          open={showModal}
          onCancel={() => {
            setShowModal((p) => !p);
          }}
        />
      )}
      <OsModal
        title="Add New Column"
        bodyPadding={30}
        body={
          <Row gutter={[16, 24]} justify="space-between">
            <Col span={21}>
              <OsInput
                style={{width: '100%'}}
                placeholder="Please add the column header name"
                onChange={(e: any) => {
                  setNewHeaderName(e?.target?.value);
                }}
              />
            </Col>
            <OsButton
              disabled={newHeaderName?.length > 0 ? false : true}
              text="Add"
              buttontype="PRIMARY"
              clickHandler={() => {
                AddNewCloumnToMergedTable(newHeaderName);
              }}
            />
          </Row>
        }
        width={900}
        open={showAddColumnModal}
        onCancel={() => {
          setShowAddColumnModal(false);
        }}
      />
      <OsModal
        title="Update  Column Name"
        bodyPadding={30}
        body={
          <Row gutter={[16, 24]} justify="space-between">
            <Col span={12}>
              <CommonSelect
                style={{width: '100%'}}
                value={oldColumnName}
                placeholder="Please select the column header name"
                options={existingColumnOptions}
                onChange={(e: any) => {
                  setNewHeaderName('');
                  setOldColumnName(e);
                }}
              />
            </Col>
            <Col span={12}>
              <OsInput
                style={{width: '100%'}}
                placeholder="Please add new column header name"
                value={newHeaderName}
                onChange={(e: any) => {
                  setNewHeaderName(e?.target?.value);
                }}
              />
            </Col>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              {' '}
              <div style={{marginRight: '30px'}}>
                <OsButton
                  // style={{marginRight: '100px'}}
                  disabled={
                    newHeaderName?.length > 0 && oldColumnName?.length > 0
                      ? false
                      : true
                  }
                  text="Update"
                  buttontype="SECONDARY"
                  clickHandler={() => {
                    UpdateTheColumnName('open', oldColumnName, newHeaderName);
                  }}
                />{' '}
              </div>
              <OsButton
                disabled={
                  newHeaderName?.length > 0 && oldColumnName?.length > 0
                    ? false
                    : true
                }
                text="Update & Close"
                buttontype="PRIMARY"
                clickHandler={() => {
                  UpdateTheColumnName('close', oldColumnName, newHeaderName);
                }}
              />
            </div>
          </Row>
        }
        width={900}
        open={showUpdateColumnModal}
        onCancel={() => {
          setShowUpdateColumnModal(false);
          setNewHeaderName('');
          setOldColumnName('');
        }}
      />
    </GlobalLoader>
  );
};
export default EditorFile;
