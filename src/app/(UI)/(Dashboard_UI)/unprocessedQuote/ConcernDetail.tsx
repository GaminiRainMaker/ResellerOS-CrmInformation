/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {Carousel} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {FC, useEffect, useState} from 'react';
import {getQuoteById} from '../../../../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {ConcernDetailInterface} from './editedQuote.interface';

const ConcernDetail: FC<ConcernDetailInterface> = ({
  showConcernDetailModal,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {quoteById} = useAppSelector((state) => state.quote);
  const [concernData, setConcernData] = useState<any>();

  useEffect(() => {
    dispatch(getQuoteById(showConcernDetailModal?.quoteId));
  }, [showConcernDetailModal?.quoteId]);

  useEffect(() => {
    const concernPDFArray: any = [];
    quoteById?.QuoteLineItems?.forEach((item: any) => {
      if (item?.concern) {
        const existingConcernIndex = concernPDFArray.findIndex(
          (concernObj: any) => concernObj?.concern === item?.concern,
        );
        if (existingConcernIndex !== -1) {
          // If concern exists, add unique PDF URLs
          const uniqueUrls = new Set(
            concernPDFArray[existingConcernIndex]?.data?.map(
              (urlObj: any) => urlObj?.pdf_url,
            ),
          );
          if (!uniqueUrls.has(item?.pdf_url)) {
            concernPDFArray[existingConcernIndex]?.data?.push({
              pdf_url: item?.pdf_url,
              nanonets_id: item?.nanonets_id,
              file_name: item?.file_name,
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
              model_id: item?.QuoteConfiguration?.model_id,
            },
          ];
          concernPDFArray?.push({
            concern: item?.concern,
            data,
          });
        }
      }
    });

    setConcernData(concernPDFArray);
  }, [quoteById]);

  return (
    <div>
      <br />
      <Carousel autoplay arrows>
        {concernData?.map((item: any) => (
          <div key={item.concern}>
            <TextArea
              placeholder="Write your Concern here!"
              autoSize={{minRows: 3, maxRows: 5}}
              value={item.concern}
              disabled
            />
            <div
              style={{
                display: 'flex',
                gap: 10,
              }}
            >
              {item?.data?.map((dataItem: any) => (
                <div
                  key={dataItem?.pdf_url}
                  style={{
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    background: 'cyan',
                  }}
                >
                  <a
                    onClick={() => {
                      window.open(dataItem?.pdf_url);
                    }}
                  >
                    PDF
                  </a>
                  <a
                    onClick={() => {
                      window.open(
                        `https://app.nanonets.com/#/ocr/test/${dataItem?.model_id}/${dataItem?.nanonets_id}`,
                      );
                    }}
                  >
                    Nanonets
                  </a>
                  {dataItem?.file_name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ConcernDetail;
