import {Form} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';
import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setConcernQuoteLineItemData} from '../../../../../redux/slices/quotelineitem';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {RaiseConcernInterface} from './os-raise-concern.interface';

const RaiseConcern: FC<RaiseConcernInterface> = ({
  form,
  onClick,
  title,
  description,
  image,
  showTextArea = true,
  fileNameOption,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {quoteLineItemByQuoteID} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  // const fileNameMap: any = {};
  // const uniqueFileNames: any = [];

  // quoteLineItemByQuoteID?.forEach((dataAddressItem: any) => {
  //   if (!dataAddressItem.concern && !fileNameMap[dataAddressItem.file_name]) {
  //     fileNameMap[dataAddressItem.file_name] = {
  //       value: dataAddressItem.file_name,
  //       label: (
  //         <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
  //           {dataAddressItem.file_name}
  //         </Typography>
  //       ),
  //     };
  //     uniqueFileNames.push(dataAddressItem.file_name);
  //   }
  // });
  // const fileNameOption = uniqueFileNames.map(
  //   (fileName: string) => fileNameMap[fileName],
  // );

  const getSelectFileData = (value: string) => {
    const filteredData = quoteLineItemByQuoteID.filter((item: any) =>
      value.includes(item.file_name),
    );
    dispatch(setConcernQuoteLineItemData(filteredData));
  };

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
      {showTextArea && (
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
                message: 'Please Select the File Name',
              },
            ]}
            name="file_name"
            label={
              <Typography name="Body 4/Regular" color={token?.colorPrimaryText}>
                File Name
              </Typography>
            }
          >
            <CommonSelect
              style={{width: '100%'}}
              placeholder="Select File"
              mode="multiple"
              options={fileNameOption}
              onChange={(e) => {
                getSelectFileData(e);
              }}
            />
          </Form.Item>
        </Form>
      )}

      {showTextArea && (
        <Form
          onFinish={onClick}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="concern_text"
            label={
              <Typography name="Body 4/Regular" color={token?.colorPrimaryText}>
                Concern
              </Typography>
            }
          >
            <TextArea
              placeholder="Write your Concern here!"
              autoSize={{minRows: 3, maxRows: 5}}
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default RaiseConcern;
