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
import {Space} from 'antd';

const EditorFile = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQUoteId = searchParams.get('id');
  const [nanonetsLoading, setNanonetsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [countTrigger, setCountTrigger] = useState<number>(0);
  const [arrayOflineItem, setArrayOflineItem] = useState<any>([]);

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

  const AddNewHeaderToTheObject = (newArr: any) => {
    // Extract headers from the first object
    const headers = newArr[0];

    // Remove the first object from the array
    const dataArray = newArr.slice(1);

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

      if (countTrigger === 0) {
        AddNewHeaderToTheObject(cleanedData);
        setCountTrigger(1);
      } else {
        setArrayOflineItem(arrayOflineItem);
      }
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
  console.log('43543543543', arrayOflineItem);
  return (
    <GlobalLoader loading={nanonetsLoading}>
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
            syncShow('sync');
          }}
        />
      </Space>

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
