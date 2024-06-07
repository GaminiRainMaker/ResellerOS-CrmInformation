/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {DownloadOutlined} from '@ant-design/icons';
import {notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getQuoteFileByQuoteIdAll} from '../../../../../../redux/actions/quoteFile';
import {useAppDispatch} from '../../../../../../redux/hook';
import {getAllAttachmentDocument} from '../../../../../../redux/actions/attachmentDocument';

const AttachmentDocument: FC<any> = ({typeForAttachmentFilter}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const [api, contextHolder] = notification.useNotification();

  const [attachmentData, setAttachmentData] = useState<any>();
  const [filterData, setFilterData] = useState<any>();

  useEffect(() => {
    dispatch(getQuoteFileByQuoteIdAll(getQuoteID))?.then((payload: any) => {
      let newArr: any = [];

      payload?.payload?.map((items: any) => {
        let newObj = {
          name: items?.file_name,
          url: items?.pdf_url,
          type: 'Uploaded',
        };
        newArr?.push(newObj);

        dispatch(getAllAttachmentDocument(getQuoteID))?.then(
          (payloads: any) => {
            if (payloads?.payload) {
              let AttArrr: any = [];
              payloads?.payload?.map((items: any) => {
                let newObsj = {
                  name: items?.Quote?.customer_name
                    ? items?.Quote?.customer_name
                    : 'Quote',
                  url: items?.doc_url,
                  type: items?.type,
                };
                AttArrr?.push(newObsj);
              });

              let resultent = newArr?.concat(AttArrr);
              setAttachmentData(resultent);
            } else {
              setAttachmentData(newArr);
            }
          },
        );
      });
    });
  }, []);

  const locale = {
    emptyText: (
      <EmptyContainer
        title={
          typeForAttachmentFilter === 'Downloaded'
            ? 'There are no Document downloaded to view'
            : 'There are no Document Uploaded to view'
        }
      />
    ),
  };
  useEffect(() => {
    if (typeForAttachmentFilter === 'all') {
      setFilterData(attachmentData);
    } else if (typeForAttachmentFilter === 'Uploaded') {
      let uploadedFilter = attachmentData?.filter(
        (items: any) => items?.type === typeForAttachmentFilter,
      );
      setFilterData(uploadedFilter);
    } else if (typeForAttachmentFilter === 'Downloaded') {
      let DownloadFilter = attachmentData?.filter(
        (items: any) => items?.type === typeForAttachmentFilter,
      );
      setFilterData(DownloadFilter);
    }
  }, [typeForAttachmentFilter]);
  useEffect(() => {
    setFilterData(attachmentData);
  }, [attachmentData]);
  const InputDetailQuoteLineItemcolumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',

      width: 130,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 187,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',

      width: 130,
    },
    {
      title: 'Download',
      dataIndex: '',
      key: '',
      width: 187,
      render: (record: any, index: number) => {
        return (
          <DownloadOutlined
            onClick={() => {
              window?.open(record?.url);
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <OsTableWithOutDrag
        columns={InputDetailQuoteLineItemcolumns}
        dataSource={filterData || []}
        scroll
        loading={false}
        locale={locale}
      />
    </>
  );
};

export default AttachmentDocument;
