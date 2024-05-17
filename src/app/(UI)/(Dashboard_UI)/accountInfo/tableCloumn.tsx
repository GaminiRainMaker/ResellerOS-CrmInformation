import Typography from '@/app/components/common/typography';
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
