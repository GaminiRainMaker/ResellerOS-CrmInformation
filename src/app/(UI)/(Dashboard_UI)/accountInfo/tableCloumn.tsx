import {Space} from '@/app/components/common/antd/Space';
import Typography from '@/app/components/common/typography';
import {
  PencilSquareIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {GlobalToken} from 'antd';
import {SetStateAction} from 'react';
import DecryptedPassword from './partnerPassword/DecryptedPassword';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {decrypt} from '@/app/utils/base';

export function getMyTeamColumns(token: GlobalToken) {
  const columns = [
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
          Username
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
  setShowModal: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  setPartnerPasswordId: {(value: any): void; (arg0: any[]): void},
  setDeleteIds: {(value: any): void; (arg0: any[]): void},
  setShowModalDelete: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  partnerPasswordForm: any,
) {
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
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
          {formatStatus(record?.Partner?.partner) ?? '--'}
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
      render: (text: string, record: any) => {
        return <DecryptedPassword password={record?.password} />;
      },
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
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={async () => {
              const [iv, encryptedData] = record?.password?.split(':');
              const decrypted = await decrypt(
                encryptedData,
                SECRET_KEY as string,
                iv,
              );

              let newObj = {
                created_by: record?.created_by,
                partner_program_id: record?.partner_program_id,
                email: record?.email,
                partner_id: record?.partner_id,
                username: record?.username,
                password: decrypted,
                shared_password: record?.shared_password,
                id: record?.id,
              };
              partnerPasswordForm.setFieldsValue(newObj);
              setPartnerPasswordId(record?.id);
              setShowModal(true);
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
          {formatStatus(record?.PartnerPassword?.Partner?.partner) ?? '--'}
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
      render: (text: string, record: any) => {
        return (
          <DecryptedPassword password={record?.PartnerPassword?.password} />
        );
      },
    },
    // {
    //   title: (
    //     <Typography
    //       name="Body 4/Medium"
    //       className="dragHandler"
    //       color={token?.colorPrimaryText}
    //     >
    //       Action
    //     </Typography>
    //   ),
    //   dataIndex: 'action',
    //   key: 'action',
    //   width: 187,
    //   render: (text: string, record: any) => (
    //     <Space size={18}>
    //       <PencilSquareIcon
    //         height={24}
    //         width={24}
    //         color={token.colorInfoBorder}
    //         style={{cursor: 'pointer'}}
    //         onClick={() => {
    //           setPartnerPasswordId(record?.id);
    //           setShowShareCredentialModal(true);
    //         }}
    //       />
    //       <TrashIcon
    //         height={24}
    //         width={24}
    //         color={token.colorError}
    //         style={{cursor: 'pointer'}}
    //         onClick={() => {
    //           setDeleteIds([record?.id]);
    //           setShowModalDelete(true);
    //         }}
    //       />
    //     </Space>
    //   ),
    // },
  ];

  return columns;
}
