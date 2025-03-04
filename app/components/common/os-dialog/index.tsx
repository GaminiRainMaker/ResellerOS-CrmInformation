import Image from 'next/image';
import {FC} from 'react';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {Form} from 'antd';
import {SelectFormItem} from '../os-oem-select/oem-select-styled';
import CommonSelect from '../os-select';
import {QuoteMappingRejectOption} from '@/utils/CONSTANTS';

const OSDialog: FC<any> = ({
  title,
  description,
  image,
  thirdLineText,
  form,
  onFinish,
  statusText,
}) => {
  const [token] = useThemeToken();

  return (
    <div>
      <Space
        direction="vertical"
        size={12}
        style={{width: '100%', textAlign: 'center'}}
      >
        {image && <Image src={image} alt={image} />}

        {statusText ? (
          <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
            {title}{' '}
            <Typography
              name="Heading 3/Medium"
              color={
                statusText === '“Approved”'
                  ? token?.colorSuccess
                  : token?.colorError
              }
            >
              {statusText}
            </Typography>
          </Typography>
        ) : (
          <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
            {title}
          </Typography>
        )}

        <Typography name="Body 3/Regular" color={token?.colorPrimaryText}>
          {description}
        </Typography>
        {thirdLineText && (
          <Typography name="Body 3/Bold" color={token?.colorPrimaryText}>
            {thirdLineText}
          </Typography>
        )}
      </Space>

      {form && (
        <>
          <br /> <br />
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            requiredMark={false}
          >
            <SelectFormItem
              label={
                <Typography name="Body 4/Medium">
                  Reason for Rejection{' '}
                </Typography>
              }
              name="reason"
              rules={[
                {
                  required: true,
                  message: 'This is required field!',
                },
              ]}
            >
              <CommonSelect
                allowClear
                placeholder="Please Select Reason"
                style={{width: '100%'}}
                options={QuoteMappingRejectOption}
              />
            </SelectFormItem>
          </Form>
        </>
      )}
      {!form && (
        <>
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default OSDialog;
