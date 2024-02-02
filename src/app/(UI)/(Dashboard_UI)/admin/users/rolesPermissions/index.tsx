'use client';
import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {getUserByOrganization} from '../../../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hook';

const RolesAndPermission = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const {data, loading} = useAppSelector((state) => state.user);
  const [form] = Form.useForm();
  const {userInformation} = useAppSelector((state) => state.user);
  const [userRules, setUserRules] = useState<any>(data);

  const dropDownItemss = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Select All</Typography>,
    },
    {
      key: '2',
      label: <Typography name="Body 3/Regular">Edit Selected</Typography>,
    },
    {
      key: '3',
      label: (
        <Typography name="Body 3/Regular" color="#EB445A">
          Delete Selected
        </Typography>
      ),
    },
  ];

  //   const deleteSelectedIds = async () => {
  //     // const data = {id: deleteIds};
  //     // await dispatch(deleteProduct(data));
  //     // setTimeout(() => {
  //     //   dispatch(getUserByOrganization('forcebolt'));
  //     // }, 1000);
  //     // setDeleteIds([]);
  //     // setShowModalDelete(false);
  //   };

  const RolesAndPermissionsColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          User Name
        </Typography>
      ),
      dataIndex: 'user_name',
      key: 'user_name',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Admin Access
        </Typography>
      ),
      dataIndex: 'is_admin',
      key: 'is_admin',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          defaultChecked={text}
          onChange={(e) => {
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_admin: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote AI
        </Typography>
      ),
      dataIndex: 'is_quote',
      key: 'is_quote',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          defaultChecked={text}
          onChange={(e) => {
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_quote: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Deal Reg
        </Typography>
      ),
      dataIndex: 'is_dealReg',
      key: 'is_dealReg',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          defaultChecked={text}
          onChange={(e) => {
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_dealReg: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Orders AI
        </Typography>
      ),
      dataIndex: 'is_order',
      key: 'is_order',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          defaultChecked={text}
          onChange={(e) => {
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_order: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    setUserRules(data);
  }, [data]);

  useEffect(() => {
    dispatch(getUserByOrganization(userInformation?.organization));
  }, []);

  const onFinish = () => {
    const userNewData = form.getFieldsValue();
    // if (addUserType === 'insert') {
    //   dispatch(createUser(userNewData)).then(() => {
    //     dispatch(getUserByOrganization('forcebolt'));
    //     setShowAddUserModal(false);
    //   });
    // } else if (addUserType === 'update') {
    //   const obj: any = {
    //     id: userData?.id,
    //     ...userNewData,
    //   };
    //   dispatch(updateUserById(obj)).then(() => {
    //     dispatch(getUserByOrganization('forcebolt'));
    //     setOpen(false);
    //   });
    // }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, record: any) => {
      console.log('selectedRowKeys', selectedRowKeys, record);
      //   setExistingQuoteId(Number(selectedRowKeys));
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Roles and Permissions
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
              <OsButton
                text="CANCEL"
                buttontype="SECONDARY"
                // clickHandler={}
              />
              <OsButton
                text="SAVE"
                buttontype="PRIMARY"
                // clickHandler={}
              />
              <Space>
                <OsDropdown menu={{items: dropDownItemss}} />
              </Space>
            </div>
          </Col>
        </Row>

        <OsTable
          columns={RolesAndPermissionsColumns}
          dataSource={userRules}
          scroll
          loading={loading}
          rowSelection={rowSelection}
        />
      </Space>

      <OsModal
        body={<></>}
        width={696}
        open={showAddUserModal}
        onCancel={() => {
          setShowAddUserModal((p) => !p);
        }}
        onOk={onFinish}
        primaryButtonText="ADD"
        footerPadding={24}
      />
    </>
  );
};

export default RolesAndPermission;
