import { IssueTypeOption, affectedColumns } from '@/app/utils/CONSTANTS';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Space } from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import CommonSelect from '../os-select';
import Typography from '../typography';
import { RaiseConcernInterface } from './os-raise-concern.interface';

const RaiseConcern: FC<RaiseConcernInterface> = ({
  form,
  onClick,
  title,
  description,
  image,
}) => {
  const [token] = useThemeToken();
  // const dispatch = useAppDispatch();
  // const {quoteLineItemByQuoteID} = useAppSelector(
  //   (state) => state.quoteLineItem,
  // );

  // const getSelectFileData = (value: string) => {
  //   const filteredData = quoteLineItemByQuoteID.filter((item: any) =>
  //   value.includes(item.file_name),
  //   );
  //   dispatch(setConcernQuoteLineItemData(filteredData));
  // };
  const [isShowOtherIssue, setIsShowOtherIssue] = useState<boolean>(false);

  return (
    <div>
      <Space
        direction="vertical"
        size={12}
        style={{width: '100%', textAlign: 'center'}}
      >
        <Image src={image} alt={image} />
        <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
          {title}
        </Typography>
        <Typography name="Body 3/Regular" color={token?.colorPrimaryText}>
          {description}
        </Typography>
      </Space>
      <br />
      <br />
      <Form
        onFinish={onClick}
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please Select the Issue Type',
            },
          ]}
          name="issue_type"
          label={
            <Typography name="Body 4/Regular" color={token?.colorPrimaryText}>
              Issue Type
            </Typography>
          }
        >
          <CommonSelect
            style={{
              width: '100%',
            }}
            placeholder="Select Type"
            options={IssueTypeOption}
            onChange={(e) => {
              if (e === 'Other Issue') {
                setIsShowOtherIssue(true);
              } else {
                setIsShowOtherIssue(false);
              }
            }}
          />
        </Form.Item>
        {isShowOtherIssue && (
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please write the issue',
              },
            ]}
            name="other_issue"
            label={
              <Typography name="Body 4/Regular" color={token?.colorPrimaryText}>
                Other Issue
              </Typography>
            }
          >
            <TextArea
              placeholder="Write your issue here!"
              autoSize={{minRows: 2, maxRows: 4}}
            />
          </Form.Item>
        )}
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please Select the Affected Columns',
            },
          ]}
          name="affected_columns"
          label={
            <Typography name="Body 4/Regular" color={token?.colorPrimaryText}>
              Affected Columns
            </Typography>
          }
        >
          <CommonSelect
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Select Columns"
            mode="multiple"
            options={affectedColumns}
            // onChange={(e) => {
            //   // getSelectFileData(e);
            // }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default RaiseConcern;
