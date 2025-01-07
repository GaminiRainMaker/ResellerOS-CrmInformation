import {Col, Row} from '@/app/components/common/antd/Grid';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {dealRegStatusOptions} from '@/app/utils/CONSTANTS';
import {Form} from 'antd';
import moment from 'moment';
import {FC, useEffect} from 'react';
import {updateDealRegById} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const ResponseDetailForm: FC<any> = ({activeKey, form, formData}) => {
  const dispatch = useAppDispatch();
  const {isCanvas, isDecryptedRecord} = useAppSelector((state) => state.canvas);

  // Initialize variables with default values
  let salesForceinstanceUrl: string | undefined;
  let salesForceToken: string | undefined;

  if (isCanvas && isDecryptedRecord) {
    const {client, context} = isDecryptedRecord as any;
    salesForceinstanceUrl = client?.instanceUrl;
    salesForceToken = client?.oauthToken;
  }

  useEffect(() => {
    form.setFieldsValue({
      partner_approval_id: formData?.partner_approval_id,
      partner_deal_id: formData?.partner_deal_id,
      expiration_date:  formData?.expiration_date
        ? moment(formData?.expiration_date)
        : null,
      submitted_date: formData?.submitted_date
        ? moment(formData?.submitted_date)
        : null,
      status: formData?.status,
    });
  }, [formData, form]);
  const onFinish = async (values: any) => {
    const newObj = {
      ...values,
      id: activeKey,
    };
    if (!isCanvas) {
      await dispatch(updateDealRegById(newObj));
    }
  };

  const handleBlur = () => {
    if (!isCanvas) {
      form.validateFields().then((values: any) => {
        onFinish(values);
      });
    }
  };

  const handleSelect = () => {
    if (!isCanvas) {
      form.validateFields().then((values: any) => {
        onFinish(values);
      });
    }
  };

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <Row style={{width: '100%'}} gutter={[16, 16]}>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Status</Typography>}
            name="status"
          >
            <CommonSelect
              style={{width: '100%'}}
              onSelect={handleSelect}
              options={dealRegStatusOptions}
            />
          </SelectFormItem>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 16]} justify="space-between">
        <Col span={12}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">Expiration Date</Typography>
            }
            name="expiration_date"
          >
            <CommonDatePicker onBlur={handleBlur} />
          </SelectFormItem>
        </Col>

        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Date Submitted</Typography>}
            name="submitted_date"
          >
            <CommonDatePicker onBlur={handleBlur} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">Partner Deal ID</Typography>
            }
            name="partner_deal_id"
          >
            <OsInput placeholder="Enter Text" onBlur={handleBlur} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">Partner Approval ID</Typography>
            }
            name="partner_approval_id"
          >
            <OsInput placeholder="Enter Text" onBlur={handleBlur} />
          </SelectFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default ResponseDetailForm;
