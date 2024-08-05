'use client';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {TrashIcon} from '@heroicons/react/24/outline';
import {Form, Space, notification} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {
  deleteAttachDocumentById,
  getAllAttachmentDocument,
  insertAttachmentDocument,
} from '../../../../../../../redux/actions/attachmentDocument';
import {getProfitabilityByQuoteId} from '../../../../../../../redux/actions/profitability';
import {
  deleteQuoteFileById,
  getQuoteFileByQuoteId,
  getQuoteFileByQuoteIdAll,
  getQuoteFileCount,
} from '../../../../../../../redux/actions/quoteFile';
import {deleteLineItemsByQuoteFileId} from '../../../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hook';
import Attachments from './Attachments';

const AttachmentDocument: FC<any> = ({
  typeForAttachmentFilter,
  addNewCustomerQuote,
  setAddNewCustomerQuote,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const isDealReg = searchParams.get('isView');
  const [attachmentForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const {data: attachmentDocumentData, loading} = useAppSelector(
    (state) => state.attachmentDocument,
  );
  const {userInformation} = useAppSelector((state) => state.user);
  const {getQuoteFileByQuoteIdAllData: quoteFileData} = useAppSelector(
    (state) => state.quoteFile,
  );
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [combinedData, setCombinedData] = useState<any>();
  const [filteredData, setFilteredData] = useState([]);
  const [callApis, setCallApis] = useState<boolean>(false);
  const [loadingShow, setLoadingShow] = useState<boolean>(false);
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
              if (isDealReg) {
                notification.open({
                  message: "You can't delete attachment in view mode.",
                  type: 'info',
                });
              } else {
                setDeletedData({id: record?.id, type: record?.type});
                setShowDeleteModal(true);
              }
            }}
          />
        </Space>
      ),
    },
  ];

  const addNewAttachment = async () => {
    const updatedData = uploadFileData?.map((item: any) => {
      return {
        quote_id: getQuoteID,
        type: item?.type,
        doc_url: item?.doc_url,
        name: item?.name,
        organization: userInformation?.organization,
      };
    });
    if (updatedData) {
      await dispatch(insertAttachmentDocument(updatedData)).then((d) => {
        if (d?.payload) {
          dispatch(getAllAttachmentDocument(getQuoteID));
          setAddNewCustomerQuote(false);
          setCallApis(true);
          setUploadFileData([]);
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
      dispatch(getQuoteFileCount(Number(getQuoteID)));
      dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
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
      {filteredData && (
        <OsTableWithOutDrag
          columns={InputDetailQuoteLineItemcolumns}
          dataSource={filteredData}
          scroll
          loading={loadingShow}
          locale={locale}
          defaultPageSize={filteredData?.length}
        />
      )}

      <OsModal
        disabledButton={uploadFileData?.length === 0}
        loading={loading}
        width={700}
        open={addNewCustomerQuote}
        onCancel={() => {
          setAddNewCustomerQuote(false);
          setUploadFileData([]);
        }}
        bodyPadding={20}
        title="Add Customer Attachments"
        primaryButtonText={'Save'}
        onOk={attachmentForm.submit}
        body={
          <Attachments
            uploadFileData={uploadFileData}
            setUploadFileData={setUploadFileData}
            addNewAttachment={addNewAttachment}
            form={attachmentForm}
          />
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
