/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import GlobalLoader from '@/app/components/common/os-global-loader';
import Typography from '@/app/components/common/typography';
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import {Carousel} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';
import {FC, useEffect, useState} from 'react';
import PdfImg from '../../../../../public/assets/static/pdf.svg';
import {getQuoteById} from '../../../../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {ConcernDetailInterface} from './editedQuote.interface';
import {CardStyle, IconWrapper} from './styled-components';

const ConcernDetail: FC<ConcernDetailInterface> = ({
  showConcernDetailModal,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {quoteById, loading} = useAppSelector((state) => state.quote);
  const [concernData, setConcernData] = useState<any>();

  useEffect(() => {
    dispatch(getQuoteById(showConcernDetailModal?.quoteId));
  }, [showConcernDetailModal?.quoteId]);
  useEffect(() => {
    const concernPDFArray: any = [];
    quoteById?.QuoteFiles?.forEach((item: any) => {
      if (item?.issue_type) {
        const existingConcernIndex: any = concernPDFArray.findIndex(
          (concernObj: any) => concernObj?.issue_type === item?.issue_type,
        );
        if (existingConcernIndex !== -1) {
          // If Issue Type exists, add unique PDF URLs
          const uniqueUrls = new Set(
            concernPDFArray[existingConcernIndex]?.data?.map(
              (urlObj: any) => urlObj?.pdf_url,
            ),
          );
          if (!uniqueUrls?.has(item?.pdf_url)) {
            concernPDFArray[existingConcernIndex]?.data?.push({
              pdf_url: item?.pdf_url,
              nanonets_id: item?.nanonets_id,
              file_name: item?.file_name,
              manual: false,
              model_id: item?.QuoteConfiguration?.model_id,
            });
          }
        } else {
          // If concern does not exist, create a new concern object
          const data = [
            {
              pdf_url: item?.pdf_url,
              nanonets_id: item?.nanonets_id,
              file_name: item?.file_name,
              manual: false,
              model_id: item?.QuoteConfiguration?.model_id,
            },
          ];
          concernPDFArray?.push({
            issue_type: item?.issue_type ? item?.issue_type : 'Manual File',
            data,
          });
        }
      }
      if (!item?.issue_type && item?.manual_file) {
        const data = [
          {
            pdf_url: item?.pdf_url,
            manual: true,
            file_name: item?.file_name,
          },
        ];
        concernPDFArray?.push({
          issue_type: item?.issue_type,
          data,
        });
      }
    });

    setConcernData(concernPDFArray);
  }, [quoteById]);

  return (
    <div>
      <br />
      <GlobalLoader loading={loading}>
        <Carousel arrows>
          {concernData?.map((item: any) => (
            <div key={item.issue_type}>
              <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
                Issue Type
              </Typography>
              <TextArea
                placeholder="Write your Concern here!"
                value={item.issue_type ? item.issue_type : 'Manual File'}
                disabled
              />
              <br />
              <br />
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  justifyContent: 'center',
                }}
              >
                {item?.data?.map((dataItem: any) => (
                  <CardStyle>
                    <Row
                      justify="space-between"
                      style={{
                        position: 'absolute',
                        top: '1%',
                        width: '100%',
                        padding: '5px',
                      }}
                    >
                      <IconWrapper>
                        <ArrowDownTrayIcon
                          color={token?.colorInfo}
                          cursor="pointer"
                          width={22}
                          onClick={() => {
                            window.open(dataItem?.pdf_url);
                          }}
                        />
                      </IconWrapper>
                      {!dataItem?.manual && (
                        <IconWrapper>
                          <ArrowTopRightOnSquareIcon
                            color={token?.colorInfo}
                            cursor="pointer"
                            width={22}
                            onClick={() => {
                              window.open(
                                `https://app.nanonets.com/#/ocr/test/${dataItem?.model_id}/${dataItem?.nanonets_id}`,
                              );
                            }}
                          />
                        </IconWrapper>
                      )}
                    </Row>
                    <Space
                      direction="vertical"
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      {/* {item?.file?.type.split('/')[1] === 'pdf' ? ( */}
                      <Image
                        src={PdfImg}
                        alt="PdfImg"
                        style={{
                          textAlign: 'center',
                          width: '100%',
                        }}
                      />
                      {/* ) : (
                      <Image src={XlsImg} alt="XlsImg" />
                    )} */}
                      <Typography
                        name="Body 4/Medium"
                        color={token?.colorPrimaryText}
                      >
                        {dataItem?.file_name}
                      </Typography>

                      <Typography name="Body 4/Medium" color={token?.colorText}>
                        30 Kb
                      </Typography>
                    </Space>
                  </CardStyle>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </GlobalLoader>
    </div>
  );
};

export default ConcernDetail;
