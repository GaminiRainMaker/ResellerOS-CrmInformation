'use client';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
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
import {getProfitabilityByQuoteId} from '../../../../../../redux/actions/profitability';
import {
  deleteQuoteFileById,
  getQuoteFileByQuoteId,
  getQuoteFileByQuoteIdAll,
  getQuoteFileCount,
} from '../../../../../../redux/actions/quoteFile';
import {deleteLineItemsByQuoteFileId} from '../../../../../../redux/actions/quotelineitem';
import {
  uploadExcelFileToAws,
  uploadToAws,
} from '../../../../../../redux/actions/upload';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';

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
  const [attachUrl, setAttachUrl] = useState<{
    name: string;
    url: string;
  }>({
    name: '',
    url: '',
  });
  const [typeOfAttach, setTypeOfAttach] = useState<any>();
  const [combinedData, setCombinedData] = useState<any>();
  const [filteredData, setFilteredData] = useState([]);
  const [callApis, setCallApis] = useState<boolean>(false);
  const [loadingShow, setLoadingShow] = useState<boolean>(false);
  const [bufferLoading, setBufferLoading] = useState<boolean>(false);
  const [deletedData, setDeletedData] = useState<any>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [checkedValue, setCheckedValue] = useState<boolean>(false);

  useEffect(() => {
    if (getQuoteID) {
      dispatch(getQuoteFileByQuoteIdAll(getQuoteID));
      dispatch(getAllAttachmentDocument(getQuoteID));
    }
  }, [getQuoteID, callApis]);

  const mergeAndModifyData = () => {
    setLoadingShow(true);
    const newData: any = [];
    try {
      if (attachmentDocumentData) {
        attachmentDocumentData?.forEach((item: any) => {
          newData?.push({
            id: item?.id,
            name: item?.name,
            url: item?.doc_url,
            type: item?.type,
          });
        });
      }

      if (quoteFileData && quoteFileData?.length > 0) {
        quoteFileData?.forEach((item: any) => {
          newData?.push({
            id: item?.id,
            name: item?.file_name,
            url: item?.pdf_url,
            type: 'Vendor Quote',
          });
        });
      }
      setCombinedData(newData);
      setTimeout(() => {
        setLoadingShow(false);
      }, 500);
    } catch (err) {
      console.log('Err', err);
      setLoadingShow(false);
    }
  };

  useEffect(() => {
    mergeAndModifyData();
    setCallApis(false);
  }, [JSON.stringify(quoteFileData), JSON.stringify(attachmentDocumentData)]);

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
      render: (text: any, record: any) => (
        <Typography
          name="Body 4/Medium"
          style={{color: token?.colorInfo}}
          hoverOnText
          onClick={() => {
            window?.open(record?.url);
          }}
        >
          {text ?? '--'}
        </Typography>
      ),
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

  const beforeUpload = async (file: File) => {
    let pathUsedToUpload = file?.type?.split('.')?.includes('spreadsheetml')
      ? uploadExcelFileToAws
      : uploadToAws;
    try {
      setBufferLoading(true);
      const base64String = await convertFileToBase64(file);
      if (base64String) {
        const payload = await dispatch(
          pathUsedToUpload({document: base64String}),
        );
        const pdfUrl = payload?.payload?.data?.Location;
        setAttachUrl({
          name: file?.name ?? 'Quote',
          url: pdfUrl,
        });
        message.success('File uploaded successfully');
      }
    } catch (error: any) {
      message.error('Error converting file to base64', error);
    } finally {
      setBufferLoading(false);
    }
    return false;
  };

  const addNewAttachment = async () => {
    let newObjForAttach: any = {
      name: attachUrl?.name,
      doc_url: attachUrl?.url,
      quote_id: getQuoteID,
      type: typeOfAttach,
    };
    if (newObjForAttach) {
      await dispatch(insertAttachmentDocument(newObjForAttach)).then((d) => {
        if (d?.payload) {
          setAddNewCustomerQuote(false);
          setCallApis(true);
          setAttachUrl({name: '', url: ''});
          setTypeOfAttach('');
        }
      });
    }
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
    } else {
      setFilteredData([]);
    }
  }, [combinedData, typeForAttachmentFilter]);

  const deleteSelectedIds = async () => {
    if (deletedData?.type === 'Vendor Quote') {
      await dispatch(deleteQuoteFileById({id: deletedData?.id}));
      await dispatch(getQuoteFileByQuoteIdAll(getQuoteID));
      if (checkedValue) {
        await dispatch(
          deleteLineItemsByQuoteFileId({id: deletedData?.id}),
        ).then((d) => {
          if (d?.payload) {
            dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
            dispatch(getQuoteFileCount(Number(getQuoteID)));
            dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
          }
        });
      }
      setCallApis(true);
      setShowDeleteModal(false);
    } else {
      await dispatch(deleteAttachDocumentById({id: deletedData?.id}));
      await dispatch(getAllAttachmentDocument(getQuoteID));
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
        loading={loading}
        width={600}
        open={addNewCustomerQuote}
        onCancel={() => {
          setAddNewCustomerQuote(false);
          setAttachUrl({name: '', url: ''});
          setTypeOfAttach('');
        }}
        bodyPadding={20}
        title="Add Customer Attachments"
        primaryButtonText={typeOfAttach && 'Save'}
        onOk={addNewAttachment}
        body={
          <div style={{width: '100%'}}>
            {attachUrl?.url ? (
              <>
                <CommonSelect
                  key={1}
                  style={{width: '100%'}}
                  placeholder="Select Grouping here"
                  options={AttachmentOptions}
                  onChange={(e) => {
                    setTypeOfAttach(e);
                  }}
                  allowClear
                />
              </>
            ) : (
              <GlobalLoader loading={bufferLoading}>
                <OSDraggerStyle
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
              </GlobalLoader>
            )}
          </div>
        }
      />

      <DeleteModal
        setShowModalDelete={setShowDeleteModal}
        setDeleteIds={setDeletedData}
        showModalDelete={showDeleteModal}
        deleteSelectedIds={deleteSelectedIds}
        description="Are you sure you want to delete this attachment?"
        heading="Delete Attachment"
        setCheckedValue={
          deletedData?.type === 'Vendor Quote' && setCheckedValue
        }
      />
    </>
  );
};

export default AttachmentDocument;
