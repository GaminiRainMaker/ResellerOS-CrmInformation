/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@handsontable/pikaday/css/pikaday.css';
import './styles.css';
import {HotTable} from '@handsontable/react';

import {formatStatus} from '@/app/utils/CONSTANTS';
import {useSearchParams} from 'next/navigation';
import {alignHeaders, addClassesToRows} from './hooksCallbacks';

import 'handsontable/dist/handsontable.min.css';
import {getQuoteById} from '../../../../../redux/actions/quote';
import {useAppDispatch} from '../../../../../redux/hook';

const EditorFile = () => {
  const hotRef = useRef(null);
  const searchParams = useSearchParams();
  const getQUoteId = searchParams.get('id');
  const [quoteItems, setQuoteItems] = useState<any>();
  const [headerValues, setHeaderValues] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getQuoteById(Number(getQUoteId))).then((d: any) => {
      if (d?.payload) {
        const dataa: any = JSON?.parse(d?.payload?.quote_json?.[0]);
        setQuoteItems(dataa);
        const allHeaderValue: any = [];
        const keys = Object.keys(dataa?.[0]);
        if (keys) {
          keys?.map((item: any) => {
            if (item) {
              allHeaderValue?.push(formatStatus(item));
            }
          });
        }
        setHeaderValues(allHeaderValue);
      }
    });
  }, []);

  const updateRowsValue = (
    rowIndex: number,
    keyValue: string,
    changedValue: any,
  ) => {
    const changedArr = quoteItems?.map(
      (itemOfQuote: any, indexOfQuote: number) => {
        if (indexOfQuote === rowIndex) {
          return {
            ...itemOfQuote,
            [keyValue]: changedValue,
          };
        }
        return itemOfQuote;
      },
    );
    setQuoteItems(changedArr);
  };
  const deleteRowsItems = (indexOfDeletion: number, NumberOf: number) => {
    const newArrr = quoteItems?.length > 0 ? [...quoteItems] : [];

    newArrr?.slice(indexOfDeletion, NumberOf);

    setQuoteItems(newArrr);
  };
  return (
    <>
      {quoteItems && (
        <HotTable
          data={quoteItems}
          ref={hotRef}
          colWidths={[
            200, 200, 400, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
            200, 200, 200,
          ]}
          height="auto"
          colHeaders={headerValues}
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
          allowInsertRow={false}
          allowInsertColumn={false}
          afterGetColHeader={alignHeaders}
          beforeRenderer={() => {
            addClassesToRows('', '', '', '', '', '', quoteItems);
          }}
          afterRemoveRow={(change, source) => {
            deleteRowsItems(change, source);
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
      )}
    </>
  );
};
export default EditorFile;
