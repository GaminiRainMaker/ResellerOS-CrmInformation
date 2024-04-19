/* eslint-disable array-callback-return */
import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import Typography from '@/app/components/common/typography';
import {FC, useEffect, useState} from 'react';
// eslint-disable-next-line import/no-named-as-default
import {queryAttributeField} from '../../../../../../redux/actions/attributeField';
import {getAllCustomer} from '../../../../../../redux/actions/customer';
import {getAllOpportunity} from '../../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import CommonFields from './CommonField';
import UniqueFields from './UniqueField';
import ConverSationProcess from '../../admin/quote-AI/configuration/configuration-tabs/ConversationProcess';

const DealRegDetailForm: FC<any> = ({
  data,
  form,
  activeKey,
  setFormDataValues,
  formDataValues,
  cartItems,
  setCartItems,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const [commonFiledData, setCommonFiledData] = useState<any>();

  const [sectionIndexActive, setSectionIndexAactive] = useState<any>();

  const CommonFieldsItems = [
    {
      key: '1',
      label: (
        <Typography name="Heading 3/Medium" color={token?.colorLinkHover}>
          Common Fields
        </Typography>
      ),
      children: (
        <CommonFields
          data={commonFiledData}
          selectedUserId={data?.selectedUserId}
          form={form}
          formDataValues={formDataValues}
          setFormDataValues={setFormDataValues}
          activeKey={activeKey}
        />
      ),
    },
  ];

  const UniqueFieldsItems = [
    {
      key: '2',
      label: (
        <Typography name="Heading 3/Medium" color={token?.colorLinkHover}>
          Unique Fields{' '}
        </Typography>
      ),
      children: (
        <UniqueFields
          setCartItems={setCartItems}
          cartItems={cartItems}
          setSectionIndexAactive={setSectionIndexAactive}
          sectionIndexActive={sectionIndexActive}
          data={data?.PartnerProgram}
          activeKey={activeKey}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllOpportunity());
    dispatch(queryAttributeField({}))?.then((payload) => {
      const commonFiledDataValue: any = payload?.payload;
      if (payload?.payload) {
        const finalArrForCommon: any = [];

        if (commonFiledDataValue) {
          commonFiledDataValue?.map((items: any) => {
            const innerValuesObj: any = {
              optionsValues: [items],
              attributesHeaderName: items?.AttributeSection?.name,
              attributesHeaderId: items?.AttributeSection?.id,
            };
            if (finalArrForCommon?.length > 0) {
              const finIndexOfArr = finalArrForCommon?.findIndex(
                (itemsIndex: any) =>
                  itemsIndex?.attributesHeaderId ===
                  items?.AttributeSection?.id,
              );
              if (finIndexOfArr !== -1) {
                finalArrForCommon?.[finIndexOfArr || 0]?.optionsValues?.push(
                  items,
                );
              } else {
                finalArrForCommon?.push(innerValuesObj);
              }
            } else {
              finalArrForCommon?.push(innerValuesObj);
            }
          });
        }
        setCommonFiledData(finalArrForCommon);
      }
    });
    dispatch(getAllCustomer({}));
  }, []);
  console.log(commonFiledData, 'commonFiledDatacommonFiledData', data);

  return (
    <Row>
      <Space style={{width: '100%'}} size={24} direction="vertical">
        <OsCollapseAdmin items={CommonFieldsItems} />
      </Space>
      <>
        {data?.PartnerProgram?.form_data && (
          <Space
            size={24}
            direction="vertical"
            style={{
              width: '100%',
              marginTop: '30px',
            }}
          >
            <OsCollapseAdmin items={UniqueFieldsItems} />
          </Space>
        )}
      </>
    </Row>
  );
};

export default DealRegDetailForm;
