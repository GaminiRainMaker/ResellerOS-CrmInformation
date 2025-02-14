import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form, Space} from 'antd';
import axios from 'axios';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {insertAttachmentDocument} from '../../../../../redux/actions/attachmentDocument';
import {getAllFormStack} from '../../../../../redux/actions/formStackSync';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {
  uploadExcelFileToAws,
  uploadToAws,
} from '../../../../../redux/actions/upload';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {parentpqli, salesForceWithArrrr} from '@/app/utils/saleforce';
import {
  getFormattedValuesForBundlesOnly,
  getFormattedValuesForLineItems,
  getFormattedValuesForWithAndWithoutBundles,
  getFormattedValuesForWithAndWithoutBundlesForExcelFile,
} from '@/app/utils/base';
const DownloadFile: FC<any> = ({form, objectForSyncingValues}) => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const getQuoteID = searchParams.get('id');
  const [pdfUrl, setPdfUrl] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<any>();
  const {loading: GeneralSettingLoading, data: GeneralSettingData} =
    useAppSelector((state) => state.gereralSetting);
  const {loading: formStackSyncLoading, data: formStackSyncData} =
    useAppSelector((state) => state.formStackSync);

  useEffect(() => {
    dispatch(getAllFormStack(''));
    dispatch(getAllGeneralSetting(''));
  }, []);
  const [objectAfterFOrMappedFunc, setObjectAfterFOrMappedFunc] =
    useState<any>();
  const [formStackOptions, setFormStackOptions] = useState<any>();

  useEffect(() => {
    let newArrOfOption: any = [];
    formStackSyncData &&
      formStackSyncData?.length > 0 &&
      formStackSyncData?.map((FormstackDataItem: any) => {
        if (
          objectForSyncingValues?.bundleData?.length > 0 &&
          FormstackDataItem?.type_of_file === 'With and without bundle' &&
          objectForSyncingValues?.QuoteLineItems?.length > 0
        ) {
          let newObj = {
            value: FormstackDataItem.doc_id,
            key: FormstackDataItem.doc_key,
            data: FormstackDataItem.syncJson,
            label: (
              <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
                {FormstackDataItem.doc_name}
              </Typography>
            ),
          };
          newArrOfOption?.push(newObj);
        }
        if (
          objectForSyncingValues?.bundleData?.length > 0 &&
          FormstackDataItem?.type_of_file === 'Bundle Only' &&
          objectForSyncingValues?.QuoteLineItems?.length === 0
        ) {
          let newObj = {
            value: FormstackDataItem.doc_id,
            key: FormstackDataItem.doc_key,
            data: FormstackDataItem.syncJson,
            label: (
              <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
                {FormstackDataItem.doc_name}
              </Typography>
            ),
          };
          newArrOfOption?.push(newObj);
        }
        if (
          (!objectForSyncingValues?.bundleData ||
            objectForSyncingValues?.bundleData?.length === 0) &&
          FormstackDataItem?.type_of_file === 'Line Items Only' &&
          objectForSyncingValues?.QuoteLineItems?.length > 0
        ) {
          let newObj = {
            value: FormstackDataItem.doc_id,
            key: FormstackDataItem.doc_key,
            data: FormstackDataItem.syncJson,
            label: (
              <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
                {FormstackDataItem.doc_name}
              </Typography>
            ),
          };
          newArrOfOption?.push(newObj);
        }
      });

    setFormStackOptions(newArrOfOption);
  }, [
    objectForSyncingValues,
    JSON?.stringify(objectForSyncingValues),
    formStackSyncData,
  ]);
  const FormstackDataOptions =
    formStackSyncData &&
    formStackSyncData?.length > 0 &&
    formStackSyncData?.map((FormstackDataItem: any) => ({
      value: FormstackDataItem.doc_id,
      key: FormstackDataItem.doc_key,
      data: FormstackDataItem.syncJson,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {FormstackDataItem.doc_name}
        </Typography>
      ),
    }));

  useEffect(() => {
    let newObjForAddValues: any = {};
    if (objectForSyncingValues) {
      let billingAdress = objectForSyncingValues?.addressForAll?.find(
        (items: any) => items?.id === objectForSyncingValues?.billing_id,
      );
      let shippingAdress = objectForSyncingValues?.addressForAll?.find(
        (items: any) => items?.id === objectForSyncingValues?.shipping_id,
      );
      let billingContactId =
        objectForSyncingValues?.billing_phone?.split('_')?.[1];
      let shippingContactId =
        objectForSyncingValues?.shipping_phone?.split('_')?.[1];

      let billingContact = objectForSyncingValues?.allContactDetails?.find(
        (items: any) => items?.id == billingContactId,
      );
      let shippingContact = objectForSyncingValues?.allContactDetails?.find(
        (items: any) => items?.id == shippingContactId,
      );

      newObjForAddValues.quote_unique_in =
        objectForSyncingValues?.quote_unique_in;
      newObjForAddValues.quote_expiration =
        objectForSyncingValues?.expiration_date;
      newObjForAddValues.billing_to__name =
        objectForSyncingValues?.Customer?.name;
      newObjForAddValues.contact_name = objectForSyncingValues?.Customer?.name;
      newObjForAddValues.billing_adrress = billingAdress?.shiping_address_line;
      newObjForAddValues.billing_city = billingAdress?.shiping_city;
      newObjForAddValues.billing_state = billingAdress?.shiping_state;
      newObjForAddValues.billing_zip = billingAdress?.shiping_pin_code;
      newObjForAddValues.billing_country = billingAdress?.shiping_country;
      newObjForAddValues.billing_phone = shippingContact?.billing_phone;
      newObjForAddValues.billing_email = shippingContact?.billing_email;

      newObjForAddValues.shipping_to_name =
        objectForSyncingValues?.Customer?.name;
      newObjForAddValues.contact_name = objectForSyncingValues?.Customer?.name;
      newObjForAddValues.shipping_adrress =
        shippingAdress?.shiping_address_line;
      newObjForAddValues.shipping_city = shippingAdress?.shiping_city;
      newObjForAddValues.shipping_state = shippingAdress?.shiping_state;
      newObjForAddValues.shipping_zip = shippingAdress?.shiping_pin_code;
      newObjForAddValues.shipping_country = shippingAdress?.shiping_country;
      newObjForAddValues.shipping_phone = billingContact?.billing_phone;
      newObjForAddValues.shipping_email = billingContact?.billing_email;

      newObjForAddValues.owner_name = objectForSyncingValues?.Customer?.name;
      newObjForAddValues.description = 'description';
      newObjForAddValues.term = 'new terms';

      newObjForAddValues.CustomerAddress = `${billingAdress?.shiping_address_line}-${billingAdress?.shiping_state}-${billingAdress?.shiping_pin_code}-${billingAdress?.shiping_country}`;
      newObjForAddValues.CustomerCity = billingAdress?.shiping_city;

      newObjForAddValues.DistributorAddress = `${shippingAdress?.shiping_address_line}-${shippingAdress?.shiping_state}-${shippingAdress?.shiping_pin_code}-${shippingAdress?.shiping_country}`;
      newObjForAddValues.DistributorCity = shippingAdress?.shiping_city;
    }
    setObjectAfterFOrMappedFunc(newObjForAddValues);
  }, [objectForSyncingValues]);

  const dowloadFunction = async (data: any, type: string) => {
    let findTheItem = formStackSyncData?.find(
      (item: any) => item?.doc_key === data?.key,
    );

    let resultValues: any = {};
    let lineItemsArray: any = [];
    if (
      findTheItem?.type_of_file === 'With and without bundle' &&
      findTheItem.type_of_upload === 'xlsx'
    ) {
      lineItemsArray = getFormattedValuesForWithAndWithoutBundlesForExcelFile(
        objectForSyncingValues,
      );
      resultValues.parentQLI = lineItemsArray?.lineItemss;
      resultValues.newArray = lineItemsArray?.bundleData;
      let totalExtendedPrice: any = 0;
      lineItemsArray?.lineItemss?.forEach((items: any) => {
        totalExtendedPrice += Number(items?.list_price);
      });
      resultValues.extended_price = totalExtendedPrice;
      resultValues.grand_total =
        totalExtendedPrice +
        Number(objectForSyncingValues?.quote_tax) +
        Number(objectForSyncingValues?.quote_shipping);
    } else if (findTheItem?.type_of_file === 'With and without bundle') {
      lineItemsArray = getFormattedValuesForWithAndWithoutBundles(
        objectForSyncingValues,
      );
    } else if (findTheItem?.type_of_file === 'Bundle Only') {
      lineItemsArray = getFormattedValuesForBundlesOnly(objectForSyncingValues);
    } else if (findTheItem?.type_of_file === 'Line Items Only') {
      lineItemsArray = getFormattedValuesForLineItems(objectForSyncingValues);
    }

    const dataItem = data?.data && JSON?.parse(data?.data);
    const formattedData: Record<string, string> = {};
    dataItem?.forEach((item: any) => {
      if (item.preVal !== 'created_by' && item.preVal !== 'quotelineitem') {
        formattedData[item.preVal] = item.newVal;
      }
    });

    let sottedFOr = lineItemsArray?.lineItemss
      ? lineItemsArray?.lineItemss
      : lineItemsArray;
    let sortedLineItems = sottedFOr?.sort((a: any, b: any) => {
      return a.Id - b.Id;
    });

    for (let key in formattedData) {
      if (objectForSyncingValues[formattedData[key]]) {
        resultValues[key] = objectForSyncingValues[formattedData[key]];
      }
    }

    if (findTheItem?.type_of_file === 'Line Items Only') {
      let totalExtendedPrice: any = 0;
      sortedLineItems?.forEach((items: any) => {
        totalExtendedPrice += Number(items?.list_price);
      });
      resultValues.extended_price = totalExtendedPrice;
      resultValues.grand_total =
        totalExtendedPrice +
        Number(objectForSyncingValues?.quote_tax) +
        Number(objectForSyncingValues?.quote_shipping);
    }

    let syncedValuesss = JSON?.parse(findTheItem?.syncJson);

    syncedValuesss.forEach((item: any) => {
      // Check if `newVal` exists in `newObj`
      if (objectAfterFOrMappedFunc[item.newVal]) {
        // Map `preVal` to the resultValues object with the corresponding value from `newObj`
        resultValues[item.preVal] = objectAfterFOrMappedFunc[item.newVal];
      }
    });

    delete resultValues.quotelineitem;
    resultValues.quotelineitem = sortedLineItems;

    Number(objectForSyncingValues?.quote_shipping);

    try {
      setLoading(true);
      let pathName =
        type === 'download'
          ? `https://www.webmerge.me/merge/${data?.value}/${data?.key}?downoad=1`
          : `https://www.webmerge.me/merge/${data?.value}/${data?.key}`;
      if (data && GeneralSettingData?.api_key) {
        const response = await axios.post(
          pathName,
          {
            ...resultValues,
            clientId: GeneralSettingData?.api_key,
            clientSecret: GeneralSettingData?.secret_key,
          },
          {
            responseType: 'blob',
          },
        );

        const blob = new Blob([response.data], {
          type: 'application/pdf',
        });
        if (type === 'preview' && findTheItem?.type_of_upload === 'pdf') {
          const url123 = URL.createObjectURL(blob);
          setPdfUrl(url123);
        } else {
          const blob = new Blob([response.data], {
            type: 'application/octet-stream',
          });

          const blobToBase64 = (blobs: any) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = (error) => {
                reject(error);
              };
              reader.readAsDataURL(blobs);
            });
          };
          console.log('blob?.type', blob?.type);
          let pathUsedToUpload =
            blob?.type === 'application/octet-stream'
              ? uploadExcelFileToAws
              : uploadToAws;
          const base64String = await blobToBase64(blob);
          dispatch(pathUsedToUpload({document: base64String})).then(
            (payload: any) => {
              const pdfUrl = payload?.payload?.data?.Location;
              if (pdfUrl) {
                let newObjForAttach: any = {
                  doc_url: pdfUrl,
                  quote_id: getQuoteID,
                  type: 'Customer Quote',
                };
                dispatch(insertAttachmentDocument(newObjForAttach));
              }
            },
          );
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `${objectForSyncingValues?.file_name ? objectForSyncingValues?.file_name : objectForSyncingValues?.createdAt}.${findTheItem?.type_of_upload ? findTheItem?.type_of_upload : 'xlsx'}`,
          );
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
          console.log('File downloaded successfully!');
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error downloading file:', error);
    }
  };

  console.log('34543534534', formStackOptions, objectForSyncingValues);

  return (
    <>
      <GlobalLoader
        loading={formStackSyncLoading || GeneralSettingLoading || loading}
      >
        {FormstackDataOptions ? (
          <Form layout="vertical" requiredMark={false} form={form}>
            <Row gutter={[16, 24]} justify="space-between">
              <Col span={24}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium">Document</Typography>}
                  name="document_id"
                  rules={[
                    {
                      required: true,
                      message: 'Document is required!',
                    },
                  ]}
                >
                  <CommonSelect
                    style={{width: '100%'}}
                    placeholder="Select Document"
                    allowClear
                    options={formStackOptions}
                    onChange={(e: any, data: any) => {
                      // dowloadFunction(data, 'preview');
                      setSelectedDoc(data);
                      setPdfUrl('');
                    }}
                  />
                </SelectFormItem>
              </Col>
            </Row>
            <br />
            {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" />}
            <br />

            {selectedDoc && (
              <Space
                align="end"
                style={{width: '100%', display: 'flex', justifyContent: 'end'}}
              >
                {' '}
                <Row justify={'end'}>
                  <OsButton
                    text="Preview"
                    buttontype="SECONDARY"
                    clickHandler={() => dowloadFunction(selectedDoc, 'preview')}
                  />
                </Row>
                <Row justify={'end'}>
                  <OsButton
                    text="Download"
                    buttontype="PRIMARY"
                    clickHandler={() => {
                      dowloadFunction(selectedDoc, 'download');
                      setPdfUrl('');
                    }}
                  />
                </Row>
              </Space>
            )}
          </Form>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography
              name="Body 3/Bold"
              color={token?.colorLink}
              style={{marginBottom: '6px'}}
            >
              Note:
            </Typography>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              <ul style={{listStyleType: 'disc', marginLeft: '20px'}}>
                <li>
                  You haven't provided the secret key and API yet, or the
                  provided keys are invalid. Please verify and update them.
                </li>
                <li>
                  You can{' '}
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorLink}
                    style={{textDecoration: 'underline'}}
                    hoverOnText
                    onClick={() => {
                      router.push('/admin?tab=formstack');
                    }}
                  >
                    click here
                  </Typography>{' '}
                  to update the keys.
                </li>
              </ul>
            </Typography>
          </div>
        )}
      </GlobalLoader>
    </>
  );
};

export default DownloadFile;
