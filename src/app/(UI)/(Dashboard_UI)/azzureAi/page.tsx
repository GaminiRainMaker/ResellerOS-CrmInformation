/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import '@handsontable/pikaday/css/pikaday.css';
import '@handsontable/pikaday/css/pikaday.css';
const HotTable = dynamic(() => import('@handsontable/react'), {
    ssr: false,
});

// import {HotTable} from '@handsontable/react';
import { HyperFormula } from 'hyperformula';

import { useEffect, useState } from 'react';
import './styles.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { addClassesToRows, alignHeaders } from '../fileEditor/hooksCallbacks';
import GlobalLoader from '@/app/components/common/os-global-loader';
import 'handsontable/dist/handsontable.min.css';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { formatStatus } from '@/app/utils/CONSTANTS';
import OsModal from '@/app/components/common/os-modal';
import SyncTableData from '../fileEditor/syncTableforpdfEditor';
import OsButton from '@/app/components/common/os-button';
import { message, notification, Space } from 'antd';
import Typography from '@/app/components/common/typography';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import { Col, Row } from '@/app/components/common/antd/Grid';
import {
    getfileByQuoteIdWithManual,
    getQuoteFileById,
} from '../../../../../redux/actions/quoteFile';
import {
    getPDFFileData,
    getSalesForceFields,
    getSalesForceFileData,
} from '../../../../../redux/actions/auth';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import { convertFileToBase64, getResultedValue } from '@/app/utils/base';
import { registerAllModules } from 'handsontable/registry';
import dynamic from 'next/dynamic';
import { getAllFormulas } from '../../../../../redux/actions/formulas';
import {
    queryLineItemSyncing,
    queryLineItemSyncingForSalesForce,
} from '../../../../../redux/actions/LineItemSyncing';
import { OSDraggerStyle } from '@/app/components/common/os-upload/styled-components';
import { FolderArrowDownIcon } from '@heroicons/react/24/outline';
import { uploadExcelFileToAws, uploadToAws } from '../../../../../redux/actions/upload';

registerAllModules();

const EditorFile = () => {
    const dispatch = useAppDispatch();
    const [token] = useThemeToken();
    const searchParams = useSearchParams()!;

    const [showModalForAI, setShowModalForAI] = useState<boolean>(false);
    const [UploadedFileData, setUploadedFileData] = useState<any>()
    const [UploadedFileDataColumn, setUploadedFileDataColumn] = useState<any>();

    useEffect(() => {
        const updateLineItemColumnArr: any = [];
        // let newObj = { data: "QuoteId", readOnly: true }
        const keysss =
            UploadedFileData?.length > 0 &&
            Object.keys(UploadedFileData?.[0]);
        if (keysss) {
            keysss?.map((item: any) => {
                updateLineItemColumnArr?.push(formatStatus(item));

            });
        }
        setUploadedFileDataColumn(updateLineItemColumnArr);
    }, [UploadedFileData]);

    const beforeUpload = async (file: File) => {
        const obj: any = { ...file };
        let pathUsedToUpload = file?.type?.split('.')?.includes('spreadsheetml')
            ? uploadExcelFileToAws
            : uploadToAws;

        convertFileToBase64(file)
            .then((base64String: string) => {
                obj.base64 = base64String;
                obj.name = file?.name;
                dispatch(pathUsedToUpload({ document: base64String })).then(
                    (payload: any) => {
                        const doc_url = payload?.payload?.data?.Location;
                        if (doc_url) {
                            dispatch(getPDFFileData({ invoiceUrl: doc_url }))?.then((payload: any) => {
                                setUploadedFileData(payload?.payload?.items)
                                setShowModalForAI(false);

                            })
                        }
                        obj.doc_url = doc_url;
                    },
                );
            })
            .catch((error) => {
                message.error('Error converting file to base64', error);
            });
    };


    return (
        <GlobalLoader loading={false}>
            <Row justify="space-between">
                <Col>
                    <OsButton
                        text="Upload Pdf"
                        buttontype="PRIMARY"
                        clickHandler={() => {
                            setShowModalForAI(true);
                        }}
                    />
                </Col>
            </Row>
            {UploadedFileData && UploadedFileData?.length > 0 &&
                <HotTable
                    data={UploadedFileData}
                    colWidths={[
                        300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
                        300, 300,
                    ]}
                    height="auto"
                    formulas={{
                        engine: HyperFormula,
                    }}
                    stretchH="all"
                    colHeaders={UploadedFileDataColumn}
                    width="auto"
                    minSpareRows={0}
                    autoWrapRow
                    autoWrapCol
                    licenseKey="non-commercial-and-evaluation"
                    dropdownMenu
                    hiddenColumns={{
                        indicators: true,
                    }}
                    contextMenu
                    multiColumnSorting
                    filters
                    rowHeaders
                    allowInsertRow
                    // allowInsertColumn={true}
                    afterGetColHeader={alignHeaders}
                    beforeRenderer={() => {
                        addClassesToRows('', '', '', '', '', '', UploadedFileData);
                    }}
                    afterRemoveRow={(change, source) => {

                    }}
                    afterChange={(change: any, source) => {

                    }}
                />

            }




            <OsModal
                // loading={loading}
                body={
                    <>
                        {' '}
                        <Space size={24} direction="vertical" style={{ width: '100%' }}>
                            <OSDraggerStyle
                                beforeUpload={beforeUpload}
                                showUploadList={false}
                                multiple
                            >
                                <FolderArrowDownIcon
                                    width={24}
                                    color={token?.colorInfoBorder}
                                />
                                <Typography
                                    name="Body 4/Medium"
                                    color={token?.colorPrimaryText}
                                    as="div"
                                >
                                    <Typography
                                        name="Body 4/Medium"
                                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                        color={token?.colorPrimary}
                                    >
                                        Click to Upload
                                    </Typography>{' '}
                                    or Drag and Drop
                                </Typography>
                                <Typography
                                    name="Body 4/Medium"
                                    color={token?.colorPrimaryText}
                                >
                                    XLS, PDF.
                                </Typography>
                            </OSDraggerStyle>
                            {/* <UploadCard
            uploadFileData={uploadFileData}
            setUploadFileData={setUploadFileData}
          /> */}
                        </Space>
                    </>
                }
                width={600}
                open={showModalForAI}
                onCancel={() => {
                    setShowModalForAI(false);
                }}
                footerPadding={30}
            />
        </GlobalLoader>
    );
};
export default EditorFile;
