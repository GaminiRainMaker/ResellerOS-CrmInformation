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

import {useSearchParams} from 'next/navigation';
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
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import {XCircleIcon} from '@heroicons/react/24/outline';

const EditorFile = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();

  const searchParams = useSearchParams();
  const [nanonetsLoading, setNanonetsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [arrayOflineItem, setArrayOflineItem] = useState<any>([]);
  const [saveNewHeader, setSaveNewHeader] = useState<boolean>(false);
  const [showConfirmHeader, setShowConfirmHeader] = useState<boolean>(false);

  useEffect(() => {
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

  const mergeedColumn: any = [];
  const keys = arrayOflineItem?.length > 0 && Object.keys(arrayOflineItem?.[0]);
  if (keys) {
    keys?.map((item: any) => {
      if (item) {
        mergeedColumn?.push(formatStatus(item));
      }
    });
  }
  useEffect(() => {
    if (arrayOflineItem?.length > 1) {
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
  return (
    <GlobalLoader loading={nanonetsLoading}>
      <Typography
        name="Body 1/Bold"
        // color={token?.colorLink}
        style={{marginBottom: '6px'}}
      >
        Note:
      </Typography>
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
                <li>Data need to copied from excel file only.</li>
                <li>Your first is going to be headers of you file data.</li>
              </ul>
            </Typography>
          </div>
        </Col>
        {!saveNewHeader && (
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
            </Space>
          </Col>
        )}
      </Row>
      <HotTable
        data={arrayOflineItem}
        colWidths={[
          200, 200, 400, 800, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
          200, 200,
        ]}
        height="auto"
        colHeaders={mergeedColumn}
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
        allowInsertColumn={false}
        afterGetColHeader={alignHeaders}
        beforeRenderer={() => {
          addClassesToRows('', '', '', '', '', '', arrayOflineItem);
        }}
        afterRemoveRow={(change, source) => {
          deleteRowsItems(source, change);
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
        navigableHeaders
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
        <OsButton
          text="Cancel"
          buttontype="SECONDARY"
          clickHandler={() => {
            syncShow('cancel');
          }}
        />
        <OsButton
          text="Sync Table"
          buttontype="PRIMARY"
          clickHandler={() => {
            if (saveNewHeader) {
              syncShow('sync');
            } else {
              notification?.open({
                message:
                  'Please add data from excel file. Then please save the first row as the header',
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
                  Your First Row is going to be the headers of the data
                </Typography>
                <Typography name="Body 3/Regular">
                  Are you sure you want to save headers
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
            />
          }
          width={600}
          open={showModal}
          onCancel={() => {
            setShowModal((p) => !p);
          }}
        />
      )}
    </GlobalLoader>
  );
};
export default EditorFile;
