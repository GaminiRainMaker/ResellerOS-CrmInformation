import {Space} from '@/app/components/common/antd/Space';
import Typography from '@/app/components/common/typography';
import {ShareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {GlobalToken} from 'antd';

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

export function getSharedPartnerColumns(
  token: GlobalToken,
  isShared: any,
  deleteData: any,
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
          Username
        </Typography>
      ),
      dataIndex: 'user_name',
      key: 'user_name',
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
              // isShared(record?.Quote?.id);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              // deleteData(record?.Quote?.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return columns;
}
export function getMyPasswordColumns(
  token: GlobalToken,
  isShared: any,
  deleteData: any,
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
          Username
        </Typography>
      ),
      dataIndex: 'user_name',
      key: 'user_name',
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
              // isShared(record?.Quote?.id);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              // deleteData(record?.Quote?.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return columns;
}

