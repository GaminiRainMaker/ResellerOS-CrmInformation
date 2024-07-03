/* eslint-disable eqeqeq */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form, Radio, RadioChangeEvent} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getAllBundle, insertBundle} from '../../../../../redux/actions/bundle';
import {updateQuoteLineItemForBundleId} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {getProfitabilityByQuoteId} from '../../../../../redux/actions/profitability';

const BundleSection: FC<any> = ({
  selectTedRowIds,
  setShowBundleModal,
  form,
  bundleId,
  drawer,
  setShowBundleDrawer,
}) => {
  const searchParams = useSearchParams();
  const getQuoteId = searchParams.get('id');
  const dispatch = useAppDispatch();
  const {data: bundleData} = useAppSelector((state) => state.bundle);
  const [radioValue, setRadioValue] = useState(1);
  const [bundleOptions, setBundleOptions] = useState<any>([]);

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const onFinish = async () => {
    const BundleData = form.getFieldsValue();
    let data = {
      Ids: selectTedRowIds,
      bundle_id: BundleData?.bundle_id,
    };
    if (BundleData?.name) {
      const obj = {
        ...BundleData,
        quote_id: getQuoteId,
        id: bundleId,
      };

      await dispatch(insertBundle(obj)).then((e) => {
        if (e) {
          data = {
            ...data,
            bundle_id: e?.payload?.data?.id,
          };
        }
      });
    }
    await dispatch(updateQuoteLineItemForBundleId(data));

    await dispatch(getProfitabilityByQuoteId(Number(getQuoteId)));
    await dispatch(getAllBundle(getQuoteId));
    setRadioValue(1);
    setShowBundleModal(false);
    setShowBundleDrawer && setShowBundleDrawer(false);
  };

  useEffect(() => {
    dispatch(getAllBundle(getQuoteId));
  }, []);

  useEffect(() => {
    const bundleArray: any = [];
    if (bundleData) {
      bundleData?.map((item: any) =>
        bundleArray?.push({label: item?.name, value: item?.id}),
      );
    }
    setBundleOptions(bundleArray);
  }, [bundleData]);

  return (
    <Space
      direction="vertical"
      size={18}
      style={{width: '100%', padding: drawer ? '' : '20px'}}
    >
      {!drawer && (
        <Space direction="horizontal" size={18} style={{width: '100%'}}>
          <Radio.Group onChange={onChange} value={radioValue}>
            <Radio value={1}>
              {' '}
              <Typography name="Body 3/Regular">
                Add in existing Bundle
              </Typography>
            </Radio>
            <Radio value={2}>
              <Typography name="Body 3/Regular">Create new bundle</Typography>
            </Radio>
          </Radio.Group>
        </Space>
      )}
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
      >
        {!drawer && radioValue == 1 ? (
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Add to Bundle</Typography>}
            name="bundle_id"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
          >
            <CommonSelect
              allowClear
              style={{width: '100%'}}
              placeholder="Select Bundle"
              options={bundleOptions}
            />
          </SelectFormItem>
        ) : (
          <Row justify={'space-between'} gutter={[16, 16]}>
            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">Bundle Name</Typography>
                }
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <OsInput />
              </SelectFormItem>
            </Col>

            <Col span={12}>
              <Form.Item
                label={
                  <Typography name="Body 4/Medium">Bundle Quantity</Typography>
                }
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                  {
                    pattern: /^\d+$/,
                    message: 'Please enter valid value.',
                  },
                ]}
              >
                <OsInput />
              </Form.Item>
            </Col>
            <Col span={24}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">Description</Typography>
                }
                name="description"
              >
                <OsInput min={3} />
              </SelectFormItem>
            </Col>
          </Row>
        )}
      </Form>
    </Space>
  );
};

export default BundleSection;
