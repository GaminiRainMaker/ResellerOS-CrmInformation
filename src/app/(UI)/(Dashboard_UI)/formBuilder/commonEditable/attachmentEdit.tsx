/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-lonely-if */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import Typography from '@/app/components/common/typography';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {Form, message} from 'antd';
import React from 'react';
import {convertFileToBase64} from '@/app/utils/base';
import {EditableFiledsCommonInterface} from '../formBuilder.interface';
import {uploadToAws} from '../../../../../../redux/actions/upload';
import {useAppDispatch} from '../../../../../../redux/hook';
import {CollapseSpaceStyle} from '../../dealRegDetail/styled-component';
import OsInput from '@/app/components/common/os-input';

const AttachmentEditFileds: React.FC<EditableFiledsCommonInterface> = ({
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

  const dispatch = useAppDispatch();
  const beforeUpload = (file: File) => {
    convertFileToBase64(file)
      .then((base64String) => {
        if (base64String) {
          dispatch(uploadToAws({document: base64String})).then(
            (payload: any) => {
              const pdfUrl = payload?.payload?.data?.Location;

              const newTempArr = cartItems.map(
                (sectItem: any, sectioIndex: number) => {
                  if (sectioIndex === sectionIndex) {
                    return {
                      ...sectItem,
                      content: sectItem.content.map(
                        (contItem: any, contInde: number) => {
                          if (contInde === contentIndex) {
                            const tempPdf: any =
                              contItem?.pdfUrl?.length > 0
                                ? [...contItem?.pdfUrl]
                                : [];
                            tempPdf?.push(pdfUrl);
                            return {
                              ...contItem,
                              pdfUrl: tempPdf,
                            };
                          }
                          return contItem;
                        },
                      ),
                    };
                  }
                  return sectItem;
                },
              );

              setCartItems(newTempArr);
            },
          );
        }
      })
      .catch((error) => {
        message.error('Error converting file to base64', error);
      });
    return false;
  };

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

  const optionsType = [
    {
      name: 'Required Field',
      key: 1,
      value: CommonIndexOfUse?.required,
      changeValue: 'required',
    },
    {
      name: 'User Fill',
      key: 2,
      value: CommonIndexOfUse?.user_fill,
      changeValue: 'user_fill',
    },
    {
      name: 'Label',
      key: 3,
      value: CommonIndexOfUse?.requiredLabel,
      changeValue: 'requiredLabel',
    },
    {
      name: 'Hint Text',
      key: 4,
      value: CommonIndexOfUse?.hintext,
      changeValue: 'hintext',
    },
  ];

  const QuickSetupItemsForAttachement = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Quick Setup
        </Typography>
      ),
      children: (
        <>
          {' '}
          <Col sm={24}>
            {' '}
            <Typography name="Body 4/Medium">Change Name</Typography>
            <OsInput
              style={{width: '100%', marginBottom: '20px'}}
              placeholder="name"
              defaultValue={CommonIndexOfUse?.customFieldName}
              value={CommonIndexOfUse?.customFieldName}
              onChange={(e: any) => {
                changeFieldValues(e?.target?.value, 'customFieldName');
              }}
            />
          </Col>{' '}
          <Form layout="vertical" form={form}>
            <OSDraggerStyle
              beforeUpload={beforeUpload}
              showUploadList={false}
              multiple
            >
              <FolderArrowDownIcon width={24} color={token?.colorInfoBorder} />
              <Typography
                name="Body 4/Medium"
                color={token?.colorPrimaryText}
                as="div"
              >
                <Typography
                  name="Body 4/Medium"
                  style={{textDecoration: 'underline', cursor: 'pointer'}}
                  color={token?.colorPrimary}
                >
                  Click to Upload
                </Typography>{' '}
                or Drag and Drop
              </Typography>
              <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
                XLS, PDF.
              </Typography>
            </OSDraggerStyle>
          </Form>
        </>
      ),
    },
  ];

  const OptionsItemsForTable = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Options
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          {optionsType?.map((itemOption: any, index: number) => (
            <>
              {' '}
              {(index === 0 || index === 1) && (
                <Row style={{width: '100%'}}>
                  <Col
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: '25px',
                    }}
                  >
                    <Typography name="Body 4/Medium">
                      {itemOption?.name}
                    </Typography>
                    <Switch
                      onChange={(e: any) => {
                        changeFieldValues(e, itemOption?.changeValue);
                      }}
                      defaultChecked={itemOption?.value}
                      checked={itemOption?.value}
                    />
                  </Col>
                </Row>
              )}
            </>
          ))}
        </Form>
      ),
    },
  ];

  return (
    <>
      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin items={QuickSetupItemsForAttachement} />
        </CollapseSpaceStyle>
      </Row>

      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin items={OptionsItemsForTable} />
        </CollapseSpaceStyle>
      </Row>
    </>
  );
};

export default AttachmentEditFileds;
