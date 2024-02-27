
import {Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import React from 'react';
import {EditableFiledsCommonInterface} from '../formBuilder.interface';
import {CollapseSpaceStyle} from '../../dealRegDetail/DealRegDetailForm/styled-components';

const EditFiledDetailsForTextContent: React.FC<
  EditableFiledsCommonInterface
> = ({
  sectionIndex,
  cartItems,
  contentIndex,
  setCartItems,
  form,
  selectedColumnIndex,
}) => {
  const [token] = useThemeToken();

  const CommonIndexOfUse =
    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0];

  const changeFieldValues = (newValue: any, labelTypeVal: string) => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                [labelTypeVal]: newValue,
              };
            }
            return contItem;
          }),
        };
      }
      return sectItem;
    });

    setCartItems(newTempArr);
  };

  const QuickSetupItemsForTTextContent = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Quick Setup
        </Typography>
      ),
      children: (
        <Form layout="vertical" form={form}>
          <Form.Item
            label={<Typography name="Body 4/Medium">Text</Typography>}
            name="no_of_columns"
          >
            <OsInput
              style={{width: '100%'}}
              placeholder="Label"
              defaultValue={CommonIndexOfUse?.sectionTitle}
              value={CommonIndexOfUse?.sectionTitle}
              onChange={(e: any) => {
                changeFieldValues(e?.target?.value, 'sectionTitle');
              }}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  const OptionsItemsForTextContent = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Options
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          <Typography name="Body 4/Medium">Alignement</Typography>
          <CommonSelect
            onChange={(e: any) => {
              changeFieldValues(e, 'Alignemnt');
            }}
            defaultValue={CommonIndexOfUse?.Alignemnt}
            style={{width: '100%', marginBottom: '20px'}}
            options={[
              {label: 'Left', value: 'left'},
              {label: 'Right', value: 'right'},
              {label: 'Center', value: 'center'},
            ]}
          />

          <Form.Item
            label={<Typography name="Body 4/Medium">Font Size</Typography>}
            name="no_of_columns"
          >
            <CommonSelect
              onChange={(e: any) => {
                changeFieldValues(e, 'FontSize');
              }}
              defaultValue={CommonIndexOfUse?.FontSize}
              style={{width: '100%', marginBottom: '20px'}}
              options={[
                {label: 'Heading 1', value: 'h1'},
                {label: 'Heading 2', value: 'h2'},
                {label: 'Heading 3', value: 'h3'},
                {label: 'Heading 4', value: 'h4'},
              ]}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <>
      <>
        <Row>
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin items={QuickSetupItemsForTTextContent} />
          </CollapseSpaceStyle>
        </Row>

        <Row>
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin items={OptionsItemsForTextContent} />
          </CollapseSpaceStyle>
        </Row>
      </>
    </>
  );
};

export default EditFiledDetailsForTextContent;
