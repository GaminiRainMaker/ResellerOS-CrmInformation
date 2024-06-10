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
import {Space, message, notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getQuoteFileByQuoteIdAll} from '../../../../../../redux/actions/quoteFile';
import {useAppDispatch} from '../../../../../../redux/hook';
import {
  getAllAttachmentDocument,
  insertAttachmentDocument,
} from '../../../../../../redux/actions/attachmentDocument';
import Typography from '@/app/components/common/typography';
import OsModal from '@/app/components/common/os-modal';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {convertFileToBase64} from '@/app/utils/base';
import {
  uploadExcelFileToAws,
  uploadToAws,
} from '../../../../../../redux/actions/upload';
import CommonSelect from '@/app/components/common/os-select';
import {AttachmentOptions} from '@/app/utils/CONSTANTS';
import OsButton from '@/app/components/common/os-button';

const AttachmentDocument: FC<any> = ({
  typeForAttachmentFilter,
  addNewCustomerQuote,
  setAddNewCustomerQuote,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const [api, contextHolder] = notification.useNotification();

  const [attachmentData, setAttachmentData] = useState<any>();
  const [filterData, setFilterData] = useState<any>();
  const [attachUrl, setAttachUrl] = useState<any>();
  const [typeOfAttach, setTypeOfAttach] = useState<any>();
  const [loadingShow, setLoadingShow] = useState<boolean>(false);

  const getAllAttachMents = async () => {
    setLoadingShow(true);
    dispatch(getQuoteFileByQuoteIdAll(getQuoteID))?.then((payload: any) => {
      let newArr: any = [];

      payload?.payload?.map((items: any) => {
        let newObj = {
          name: items?.file_name,
          url: items?.pdf_url,
          type: 'Vendor Quote',
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
              setLoadingShow(false);
            } else {
              setAttachmentData(newArr);
              setLoadingShow(false);
            }
          },
        );
      });
    });
    setLoadingShow(false);
    setAddNewCustomerQuote(false);
  };

  useEffect(() => {
    getAllAttachMents();
  }, []);

  const locale = {
    emptyText: (
      <EmptyContainer
        title={
          typeForAttachmentFilter === 'Vendor Quote'
            ? 'There are no Document Vendor Quote to view'
            : 'There are no Document Customer Quote to view'
        }
      />
    ),
  };
  useEffect(() => {
    if (typeForAttachmentFilter === 'all') {
      setFilterData(attachmentData);
    } else {
      let uploadedFilter = attachmentData?.filter(
        (items: any) => items?.type === typeForAttachmentFilter,
      );
      setFilterData(uploadedFilter);
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
      render: (record: any, text: any) => {
        return (
          <Typography
            name="Body 4/Medium"
            onClick={() => {
              window?.open(text?.url);
            }}
          >
            {record}
          </Typography>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 187,
    },
  ];

  const beforeUpload = (file: File) => {
    let pathUsedToUpload = file?.type?.split('.')?.includes('spreadsheetml')
      ? uploadExcelFileToAws
      : uploadToAws;

    convertFileToBase64(file)
      .then((base64String) => {
        if (base64String) {
          dispatch(pathUsedToUpload({document: base64String})).then(
            (payload: any) => {
              const pdfUrl = payload?.payload?.data?.Location;
              setAttachUrl(pdfUrl);
            },
          );
        }
      })
      .catch((error: any) => {
        message.error('Error converting file to base64', error);
      });
    return false;
  };

  const addNewAttachment = async () => {
    let newObjForAttach: any = {
      doc_url: attachUrl,
      quote_id: getQuoteID,
      type: typeOfAttach,
    };
    await dispatch(insertAttachmentDocument(newObjForAttach));
    getAllAttachMents();
  };

  return (
    <>
      {contextHolder}
      <OsTableWithOutDrag
        columns={InputDetailQuoteLineItemcolumns}
        dataSource={filterData || []}
        scroll
        loading={loadingShow}
        locale={locale}
      />

      <OsModal
        width={1100}
        open={addNewCustomerQuote}
        onCancel={() => {
          setAddNewCustomerQuote(false);
          setAttachUrl('');
          setTypeOfAttach('');
        }}
        bodyPadding={40}
        title="All Customer Quote"
        body={
          <Space style={{width: '100%'}}>
            {attachUrl ? (
              <>
                {' '}
                <CommonSelect
                  key={1}
                  style={{width: '319px'}}
                  placeholder="Select Grouping here"
                  options={AttachmentOptions}
                  onChange={(e) => {
                    setTypeOfAttach(e);
                  }}
                  allowClear
                />
                <OsButton
                  buttontype="PRIMARY"
                  disabled={!typeOfAttach}
                  clickHandler={addNewAttachment}
                  text="Save"
                />
              </>
            ) : (
              <OSDraggerStyle
                style={{width: '100vh'}}
                beforeUpload={beforeUpload}
                showUploadList={false}
                multiple
              >
                <FolderArrowDownIcon
                  width={24}
                  color={token?.colorInfoBorder}
                />
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                  as="div"
                >
                  <Typography
                    name="Body 4/Medium"
                    style={{textDecoration: 'underline', cursor: 'pointer'}}
                    color={token?.colorPrimary}
                  >
                    Click to Upload
                  </Typography>{' '}
                  or Drag and Drop
                </Typography>
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                >
                  XLS, PDF.
                </Typography>
              </OSDraggerStyle>
            )}
          </Space>
        }
      />
    </>
  );
};

export default AttachmentDocument;
