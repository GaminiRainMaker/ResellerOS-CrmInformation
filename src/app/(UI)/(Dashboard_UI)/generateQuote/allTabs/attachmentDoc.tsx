'use client';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import Typography from '@/app/components/common/typography';
import {AttachmentOptions} from '@/app/utils/CONSTANTS';
import {convertFileToBase64} from '@/app/utils/base';
import {FolderArrowDownIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Space, message, notification} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {
  deleteAttachDocumentById,
  getAllAttachmentDocument,
  insertAttachmentDocument,
} from '../../../../../../redux/actions/attachmentDocument';
import {getQuoteFileByQuoteIdAll} from '../../../../../../redux/actions/quoteFile';
import {
  uploadExcelFileToAws,
  uploadToAws,
} from '../../../../../../redux/actions/upload';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import {deleteQuoteFileById} from '../../../../../../redux/actions/quoteFile';

const AttachmentDocument: FC<any> = ({
  typeForAttachmentFilter,
  addNewCustomerQuote,
  setAddNewCustomerQuote,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const [api, contextHolder] = notification.useNotification();
  const {data: attachmentDocumentData, loading} = useAppSelector(
    (state) => state.attachmentDocument,
  );
  const {getQuoteFileByQuoteIdAllData: quoteFileData} = useAppSelector(
    (state) => state.quoteFile,
  );
  const [attachUrl, setAttachUrl] = useState<any>();
  const [typeOfAttach, setTypeOfAttach] = useState<any>();
  const [combinedData, setCombinedData] = useState<any>();
  const [filteredData, setFilteredData] = useState([]);
  const [callApis, setCallApis] = useState<boolean>(false);
  const [loadingShow, setLoadingShow] = useState<boolean>(false);
  const [deletedData, setDeletedData] = useState<any>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    if (getQuoteID) {
      dispatch(getQuoteFileByQuoteIdAll(getQuoteID));
      dispatch(getAllAttachmentDocument(getQuoteID));
    }
  }, [getQuoteID, callApis]);

  const mergeAndModifyData = () => {
    setLoadingShow(true);
    const newData: any = [];
    if (attachmentDocumentData) {
      attachmentDocumentData?.forEach((item: any) => {
        newData?.push({
          id: item?.id,
          name: item?.Quote?.customer_name
            ? item?.Quote?.customer_name
            : 'Quote',
          url: item?.doc_url,
          type: item?.type,
        });
      });
    }

    if (quoteFileData) {
      quoteFileData?.forEach((item: any) => {
        newData?.push({
          id: item?.id,
          name: item?.file_name,
          url: item?.pdf_url,
          type: 'Vendor Quote',
        });
      });
    }
    setTimeout(() => {
      setCombinedData(newData);
      setLoadingShow(false);
    }, 1000);
  };
  useEffect(() => {
    mergeAndModifyData();
    setCallApis(false);
  }, [attachmentDocumentData, quoteFileData]);

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
            style={{color: token?.colorInfo}}
            hoverOnText
            onClick={() => {
              window?.open(text?.url);
            }}
            color="rgb(35, 100, 170)"
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
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Action
        </Typography>
      ),
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeletedData({id: record?.id, type: record?.type});
              setShowDeleteModal(true);
            }}
          />
        </Space>
      ),
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

  const addNewAttachment = () => {
    let newObjForAttach: any = {
      doc_url: attachUrl,
      quote_id: getQuoteID,
      type: typeOfAttach,
    };
    if (newObjForAttach) {
      dispatch(insertAttachmentDocument(newObjForAttach)).then((d) => {
        if (d?.payload) {
          setAddNewCustomerQuote(false);
          setCallApis(true);
        }
      });
    }
    setAttachUrl('');
    setTypeOfAttach('');
  };

  useEffect(() => {
    if (combinedData && combinedData.length > 0) {
      switch (typeForAttachmentFilter) {
        case 'all':
          setFilteredData(combinedData);
          break;
        default:
          const filtered = combinedData?.filter(
            (item: any) => item?.type === typeForAttachmentFilter,
          );
          setFilteredData(filtered || []);
          break;
      }
    }
  }, [combinedData, typeForAttachmentFilter]);

  const deleteSelectedIds = () => {
    if (deletedData?.type === 'Vendor Quote') {
      dispatch(deleteQuoteFileById({id: deletedData?.id}));
      setCallApis(true);
      setShowDeleteModal(false);
    } else {
      dispatch(deleteAttachDocumentById({id: deletedData?.id}));
      setCallApis(true);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      {contextHolder}
      <OsTableWithOutDrag
        columns={InputDetailQuoteLineItemcolumns}
        dataSource={filteredData}
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
                  loading={loading}
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

      <DeleteModal
        setShowModalDelete={setShowDeleteModal}
        setDeleteIds={setDeletedData}
        showModalDelete={showDeleteModal}
        deleteSelectedIds={deleteSelectedIds}
        description="Are you sure you want to delete this attachment?"
        heading="Delete Attachment"
      />
    </>
  );
};

export default AttachmentDocument;
