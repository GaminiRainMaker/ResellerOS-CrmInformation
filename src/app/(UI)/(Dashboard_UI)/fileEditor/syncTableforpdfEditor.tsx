/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

'use client';

import {FC, useEffect, useState} from 'react';

import {Space} from '@/app/components/common/antd/Space';
import {Col, Row} from 'antd';
import CommonSelect from '@/app/components/common/os-select';
import OsInput from '@/app/components/common/os-input';
import {formatStatus, quoteLineItemColumn} from '@/app/utils/CONSTANTS';
import OsButton from '@/app/components/common/os-button';

interface EditPdfDataInterface {
  setMergedVaalues?: any;
  mergedValue?: any;
}
const SyncTableData: FC<EditPdfDataInterface> = ({
  setMergedVaalues,
  mergedValue,
}) => {
  const [syncedNewValue, setNewSyncedValue] = useState<any>();

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

    if (indexOfPre === -1) {
      newSyncTableData?.push({
        preVal: preValue,
        newVal: newSyncValue,
        key: keyInd,
      });
    } else {
      newSyncTableData?.[indexOfPre]?.push({
        preVal: preValue,
        newVal: newSyncValue,
        key: keyInd,
      });
    }
    setNewSyncedValue(newSyncTableData);
  };

  console.log('indexOfPre', syncedNewValue);

  const mergeedColumn: any = [];
  const keys = mergedValue?.length > 0 && Object.keys(mergedValue?.[0]);
  if (keys) {
    keys?.map((item: any) => {
      if (item) {
        mergeedColumn?.push(item);
      }
    });
  }
  const SyncChangeHeadersValue = () => {
    const changingHeaderArr = [...mergedValue];
    const newArray = changingHeaderArr?.map((itemOfData: any) => {
      const filteredSync = syncedNewValue?.filter((itemOFNewSync: any) => {
        console.log(
          ' Object.keys',
          itemOFNewSync.preVal,
          Object.keys(itemOfData),
        );

        return Object.keys(itemOfData).includes(itemOFNewSync.preVal);
      });
      console.log('4534543534', filteredSync);

      return {
        ...itemOfData,
        [filteredSync[0].newVal]: itemOfData[filteredSync[0].preVal],
      };
    });

    console.log('newArray', newArray);
  };

  return (
    <>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <Col>
          {mergeedColumn?.map((item: any) => (
            <Row style={{marginTop: '6px'}}>
              <OsInput disabled value={formatStatus(item)} />
            </Row>
          ))}
        </Col>

        <Col>
          {mergeedColumn?.map((item: any, indexOfCol: number) => (
            <Row style={{marginTop: '6px'}}>
              <CommonSelect
                onChange={(e) => {
                  syncTableToLineItems(item, e, indexOfCol);
                }}
                style={{width: '250px'}}
                options={quoteLineItemColumn}
              />
            </Row>
          ))}
        </Col>
      </Row>
      <Row
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <OsButton
          text=" Sync And Save"
          style={{
            width: '100%',
          }}
          buttontype="PRIMARY"
          clickHandler={SyncChangeHeadersValue}
        />
      </Row>
    </>
  );
};

export default SyncTableData;
