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
import OsButton from '@/app/components/common/os-button';
import {updateSalesForceDealregById} from '../../../../../redux/actions/salesForce';

const ResponseDetailForm: FC<any> = ({activeKey, formData}) => {
  const [form] = Form.useForm();
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
      expiration_date: formData?.expiration_date
        ? moment(formData?.expiration_date)
        : null,
      submitted_date: formData?.submitted_date
        ? moment(formData?.submitted_date)
        : null,
      status: formData?.status,
    });
  }, [formData]);

  const onFinish = async (values: any) => {
    const newObj = {
      ...values,
      id: activeKey,
    };
    const salesForceObj = {
      id: activeKey,
      rosdealregai__Status__c: values?.status,
      ...(values?.expiration_date && {
        rosdealregai__Expiration_Date__c: new Date(
          values.expiration_date,
        ).toLocaleDateString('en-CA'),
      }),
      ...(values?.submitted_date && {
        rosdealregai__Submitted_Date__c: new Date(
          values.submitted_date,
        ).toLocaleDateString('en-CA'),
      }),
      rosdealregai__Partner_Deal_ID__c: values?.partner_deal_id,
      rosdealregai__Partner_Approval_ID__c: values?.partner_approval_id,
      baseURL: salesForceinstanceUrl,
      token: salesForceToken,
    };
    console.log({salesForceObj}, {newObj});
    if (!isCanvas) {
      await dispatch(updateDealRegById(newObj));
    } else {
      dispatch(updateSalesForceDealregById(salesForceObj));
    }
  };

  const handleBlur = () => {
    if (!isCanvas) {
      form.validateFields().then((values) => {
        onFinish(values);
      });
    }
  };

  const handleSelect = () => {
    if (!isCanvas) {
      form.validateFields().then((values) => {
        onFinish(values);
      });
    }
  };

  return (
    <>
      {isCanvas && (
        <Row justify={'end'}>
          <OsButton
            buttontype="SECONDARY"
            text="Save Response Details"
            clickHandler={() =>
              form.validateFields().then((values) => {
                onFinish(values);
              })
            }
          />
        </Row>
      )}
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
              label={
                <Typography name="Body 4/Medium">Date Submitted</Typography>
              }
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
                <Typography name="Body 4/Medium">
                  Partner Approval ID
                </Typography>
              }
              name="partner_approval_id"
            >
              <OsInput placeholder="Enter Text" onBlur={handleBlur} />
            </SelectFormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ResponseDetailForm;
