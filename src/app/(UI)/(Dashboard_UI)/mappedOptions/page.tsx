'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useRouter} from 'next/navigation';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import OsButton from '@/app/components/common/os-button';
import {useEffect, useState} from 'react';
import OsModal from '@/app/components/common/os-modal';
import AddMappedOptions from './addMappedOptions';
import {
  deleteMappedOptionss,
  getALlMappedOptions,
  updateMappedOptions,
} from '../../../../../redux/actions/mappedOptions';
import CommonSelect from '@/app/components/common/os-select';
import {formatStatus} from '@/app/utils/CONSTANTS';
import OsDrawer from '@/app/components/common/os-drawer';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';

const MappedOptions = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();

  const [form] = Form.useForm();
  const router = useRouter();
  const {data: LineItemSyncingData, loading} = useAppSelector(
    (state) => state.LineItemSyncing,
  );
  const [mappedOptionModal, setAddNewOptionModal] = useState<boolean>(false);
  const [recordDataForEdit, setRecordDataForEdit] = useState<any>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [optionsData, setOptionsData] = useState<any>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [nameOfOption, setNameOfOption] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);

  const ContractProductColumns = [
    {
      title: 'Option Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <CustomTextCapitalization text={text} />,
    },
    {
      title: 'Option Value',
      dataIndex: 'option_value',
      key: 'option_value',
      render: (text: string, record: any, index: number) => {
        let OptionsData: any = [];
        let dataOp = JSON?.parse(record?.values_option);
        dataOp?.map((items: any) => {
          OptionsData?.push({label: formatStatus(items), value: items});
        });
        return (
          <CommonSelect
            placeholder="All Available Options"
            options={OptionsData}
            style={{width: '100%'}}
          />
        );
      },
    },

    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, record: any, index: number) => {
        let OptionsData: any = [];
        let dataOp = JSON?.parse(record?.values_option);
        dataOp?.map((items: any) => {
          OptionsData?.push({label: formatStatus(items), value: items});
        });
        return (
          <Space size={18}>
            <PencilSquareIcon
              height={24}
              width={24}
              onClick={() => {
                setRecordDataForEdit(record);
                setOptionsData(dataOp);
                setNameOfOption(record?.name);
                setOpenDrawer(true);
              }}
              color={token.colorInfoBorder}
              style={{cursor: 'pointer'}}
            />
            <TrashIcon
              height={24}
              width={24}
              color={token.colorError}
              style={{cursor: 'pointer'}}
              onClick={() => {
                setDeleteId(record?.id);
                setShowModalDelete(true);
              }}
            />
          </Space>
        );
      },
    },
  ];
  const [optionMappedData, setOptionMappedData] = useState<any>();
  const getllMappedOption = async () => {
    await dispatch(getALlMappedOptions({}))?.then((payload: any) => {
      setOptionMappedData(payload?.payload);
    });
  };
  useEffect(() => {
    getllMappedOption();
  }, []);

  const updateChaanges = async () => {
    if (!nameOfOption) {
      setShowError(true);
      return;
    }

    let newObj = {
      name: nameOfOption,
      values_option: JSON?.stringify(optionsData),
      id: recordDataForEdit?.id,
    };
    await dispatch(updateMappedOptions(newObj));
    getllMappedOption();
    setOpenDrawer(false);
    setNameOfOption('');
    setRecordDataForEdit('');
    setOptionsData([]);
  };

  const deleteMappedOption = async () => {
    await dispatch(deleteMappedOptionss({id: deleteId}));
    getllMappedOption();
    setDeleteId('');
    setShowModalDelete(false);
  };
  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Quote Mappings
            </Typography>
          </Col>
          <Col>
            <div
              style={{
                display: 'flex',
                width: '40%',
                gap: '8px',
              }}
            >
              <Space>
                <OsButton
                  buttontype="PRIMARY"
                  text="Add New Mapped Option"
                  clickHandler={() => {
                    setAddNewOptionModal(true);
                  }}
                />{' '}
              </Space>
            </div>
          </Col>
        </Row>

        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTable
            locale={'locale'}
            columns={ContractProductColumns}
            dataSource={optionMappedData || []}
            scroll
            loading={loading}
            //   rowSelection={rowSelection}
          />
        </Row>
      </Space>
      <OsModal
        loading={loading}
        body={
          <AddMappedOptions
            recordDataForEdit={recordDataForEdit}
            setAddNewOptionModal={setAddNewOptionModal}
            drawer={false}
            getllMappedOption={getllMappedOption}
            setOptionsData={setOptionsData}
            optionsData={optionsData}
            setNameOfOption={setNameOfOption}
            nameOfOption={nameOfOption}
            setShowError={setShowError}
            showError={showError}
          />
        }
        // bodyPadding={40}
        width={1011}
        open={mappedOptionModal}
        onCancel={() => {
          setAddNewOptionModal(false);
          setRecordDataForEdit('');
        }}
        styleFooter
      />

      <OsDrawer
        title={
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            Edit Mapped Option
          </Typography>
        }
        placement="right"
        onClose={() => {
          setOpenDrawer(false);
        }}
        open={openDrawer}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            {' '}
            <OsButton
              loading={loading}
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="Update Changes"
              clickHandler={() => {
                updateChaanges();
              }}
            />
          </Row>
        }
      >
        <AddMappedOptions
          recordDataForEdit={recordDataForEdit}
          setAddNewOptionModal={setAddNewOptionModal}
          drawer={true}
          getllMappedOption={getllMappedOption}
          setOptionsData={setOptionsData}
          optionsData={optionsData}
          setNameOfOption={setNameOfOption}
          nameOfOption={nameOfOption}
          setShowError={setShowError}
          showError={showError}
        />
      </OsDrawer>
      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteId}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteMappedOption}
        description="Are you sure you want to delete this mapped option?"
        heading="Delete Mapped Option"
      />
    </>
  );
};

export default MappedOptions;
