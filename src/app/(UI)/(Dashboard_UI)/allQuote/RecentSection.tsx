import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {Divider, Form} from 'antd';
import {FC, useState} from 'react';
import AddQuote from '@/app/components/common/addQuote';
import {useAppSelector} from '../../../../../redux/hook';
import UploadFile from '../generateQuote/UploadFile';

const RecentSection: FC<any> = ({
  addQuoteLineItem,
  Quotecolumns,
  setShowToggleTable,
  showToggleTable,
  rowSelection,
}) => {
  const {filteredByDate: filteredData, loading} = useAppSelector(
    (state) => state.quote,
  );
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [uploadForm] = Form.useForm();
  const [token] = useThemeToken();
  const onToggleChange = (checked: boolean) => {
    setShowToggleTable(checked);
  };
  return (
    <Space direction="vertical" size={24} style={{width: '100%'}}>
      <Space
        direction="vertical"
        size={24}
        style={{
          padding: '24px',
          background: token?.colorBgContainer,
          borderRadius: '12px',
          width: '100%',
        }}
      >
        <Row>
          <Col span={7}>
            <Space direction="vertical" size={2}>
              <Typography name="Body 2/Medium" color={token?.colorPrimaryText}>
                Upload file to generate quote
              </Typography>
              <Typography name="Body 4/Regular" color={token?.colorPrimaryText}>
                Lorem ipsum dolor sit amet consectetur. Feugiat ullamcorper
                congue vestibulum enim purus vitae.{' '}
              </Typography>
            </Space>
          </Col>
          <Col span={12}>
            <UploadFile
              setUploadFileData={setUploadFileData}
              uploadFileData={uploadFileData}
              addQuoteLineItem={addQuoteLineItem}
              form={uploadForm}
            />
          </Col>
          <Divider />
        </Row>
        {/* <Space size={30} direction="horizontal" align="center">
          <Typography name="Body 4/Medium">Select Existing Quote?</Typography>
          <Switch size="default" onChange={onToggleChange} />
        </Space>
        {showToggleTable && (
          <OsTable
            loading={loading}
            rowSelection={rowSelection}
            tableSelectionType="radio"
            columns={Quotecolumns}
            dataSource={filteredData}
            scroll
          />
        )} */}
      </Space>
      <Row
        justify="end"
        style={{
          padding: '24px',
          background: token?.colorBgContainer,
          borderRadius: '12px',
          width: '100%',
        }}
      >
        <Col>
          <AddQuote
            buttonText="Generate"
            loading={loading}
            setUploadFileData={setUploadFileData}
            uploadFileData={uploadFileData}
            uploadForm={uploadForm}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default RecentSection;
