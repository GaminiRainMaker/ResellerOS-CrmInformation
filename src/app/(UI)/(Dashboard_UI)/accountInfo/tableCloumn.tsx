import {Space} from '@/app/components/common/antd/Space';
import Typography from '@/app/components/common/typography';
import {ShareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {GlobalToken} from 'antd';
import {SetStateAction} from 'react';

export function getMyTeamColumns(token: GlobalToken) {
  const columns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Name
        </Typography>
      ),
      dataIndex: 'user_name',
      key: 'user_name',
      width: 130,
      render: (text: string) => (
        <Typography hoverOnText name="Body 4/Regular">
          {text ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Job Title
        </Typography>
      ),
      dataIndex: 'job_title',
      key: 'job_title',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Email
        </Typography>
      ),
      dataIndex: 'email',
      key: 'email',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Phone No.
        </Typography>
      ),
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
  ];

  return columns;
}

export function getMyTeamAdminColumns(token: GlobalToken) {
  const columns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Name
        </Typography>
      ),
      dataIndex: 'user_name',
      key: 'user_name',
      width: 130,
      render: (text: string) => (
        <Typography hoverOnText name="Body 4/Regular">
          {text ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Job Title
        </Typography>
      ),
      dataIndex: 'job_title',
      key: 'job_title',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Email
        </Typography>
      ),
      dataIndex: 'email',
      key: 'email',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Phone No.
        </Typography>
      ),
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
  ];

  return columns;
}

export function getMyPartnerColumns(
  token: GlobalToken,
  setShowShareCredentialModal: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  setPartnerPasswordId: {(value: any): void; (arg0: any[]): void},
  setDeleteIds: {(value: any): void; (arg0: any[]): void},
  setShowModalDelete: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
) {
  const columns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      width: 130,
      render: (text: string, record: any) => (
        <Typography hoverOnText name="Body 4/Regular">
          {record?.Partner?.partner ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Username
        </Typography>
      ),
      dataIndex: 'username',
      key: 'username',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Email
        </Typography>
      ),
      dataIndex: 'email',
      key: 'email',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Password
        </Typography>
      ),
      dataIndex: 'password',
      key: 'password',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Action
        </Typography>
      ),
      dataIndex: 'action',
      key: 'action',
      width: 187,
      render: (text: string, record: any) => (
        <Space size={18}>
          <ShareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setPartnerPasswordId(record?.id);
              setShowShareCredentialModal(true);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeleteIds([record?.id]);
              setShowModalDelete(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return columns;
}
export function getSharedPasswordColumns(token: GlobalToken) {
  const columns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      width: 130,
      render: (text: string, record: any) => (
        <Typography hoverOnText name="Body 4/Regular">
          {record?.PartnerPassword?.Partner?.partner ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Username
        </Typography>
      ),
      dataIndex: 'user_name',
      key: 'user_name',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {' '}
          {record?.PartnerPassword?.username ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Email
        </Typography>
      ),
      dataIndex: 'email',
      key: 'email',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {' '}
          {record?.PartnerPassword?.email ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Password
        </Typography>
      ),
      dataIndex: 'password',
      key: 'password',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.PartnerPassword?.password ?? '--'}
        </Typography>
      ),
    },
  ];

  return columns;
}
