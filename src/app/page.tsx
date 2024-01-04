/* eslint-disable consistent-return */

'use client';

import React, {useEffect, useRef, useState} from 'react';
import PSPDFKit from 'pspdfkit';
import {CloudDownloadOutlined} from '@ant-design/icons';
import Typography from './components/common/typography';
import useThemeToken from './components/common/hooks/useThemeToken';
import {Upload, UploadProps} from './components/common/antd/Upload';
import {Button} from './components/common/antd/Button';

export default function Home() {
  const [token] = useThemeToken();
  const [instance, setInstance] = useState<any>(null);
  const [searchPatternData, setSearchPatternData] = useState<any>('');
  const containerRef = useRef<any>(null);
  const [base64Data, setBase64Data] = useState<string>('');

  const searchPhoneRegex = '\\(\\d{3}\\) \\d{3}-\\d{4}';
  const searchEmailRegex = '([a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9.]+)';
  const searchItems = [searchPhoneRegex, searchEmailRegex];

  const base64ToArrayBuffer = (base64: any) => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    console.log(bytes.buffer);
    return bytes.buffer;
  };

  const convertFileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });

  useEffect(() => {
    const container = containerRef.current;
    (async function () {
      if (PSPDFKit) {
        PSPDFKit.unload(container);
      }
      const newInstance = await PSPDFKit.load({
        container,
        document: 'test.pdf',
        toolbarItems: [
          {type: 'redact-rectangle'},
          {type: 'redact-text-highlighter'},
        ],
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
      setInstance(newInstance);

      searchItems.map(async (searchPattern) => {
        // This method will automatically create new redaction annotations
        const matches = await newInstance.createRedactionsBySearch(
          searchPattern,
          {
            searchType: PSPDFKit.SearchType.REGEX,
            // searchInAnnotations: searchInAnn,
          },
        );

        if (!matches || !matches.size) {
          return window.alert('No matches were found');
        }
      });

      if (newInstance) {
        // the "previewRedactionMode" flag will toggle between mark and redacted
        newInstance.setViewState((vs) => vs.set('previewRedactionMode', true));
      }
    })();

    return () => {
      if (PSPDFKit) {
        PSPDFKit.unload(container);
      }
    };
  }, [base64Data]);

  // const clearAnnotations = async () => {
  //   for (let i = 0; i < instance.totalPageCount; i++) {
  //     const anns = await instance.getAnnotations(i);
  //     const redactionAnns = anns
  //       .filter(
  //         (ann) => ann instanceof PSPDFKit.Annotations.RedactionAnnotation,
  //       )
  //       .map((ann) => ann.id);

  //     instance.delete(redactionAnns);
  //   }
  // };

  const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      // if (info.file.status === 'done') {
      //   success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  };

  const beforeUpload = (file: File) => {
    convertFileToBase64(file)
      .then((base64String) => {
        const urlsBuffer = base64ToArrayBuffer(base64String);
        setBase64Data(base64String);
        console.log('base64String', urlsBuffer);
        // sendDataToNanonets(base64String, file);
      })
      .catch((error) => {
        // message.error('Error converting file to base64', error);
      });
    return false;
  };

  return (
    <main>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '2rem 0rem',
          width: '100%',
        }}
      >
        <Typography
          as="div"
          name="Display 1/Regular"
          color={token?.colorPrimary}
        >
          Welcome to ResellerOS
        </Typography>
      </div>
      <div>
        <section className="section">
          <Upload {...props} beforeUpload={beforeUpload}>
            <Button icon={<CloudDownloadOutlined width={24} />}>
              Click to Upload
            </Button>
          </Upload>
          <input
            id="search-pattern"
            type="text"
            className="search-input"
            onChange={(e) => setSearchPatternData(e.target.value)}
          />

          <button
            onClick={async () => {
              const matches = await instance.createRedactionsBySearch(
                searchPatternData,
                {
                  searchPattern: PSPDFKit.SearchType.TEXT,
                  // searchInAnnotations: searchInAnn,
                },
              );
              if (!matches || !matches.size) {
                return window.alert('No matches were found');
              }
            }}
          >
            Search Data
          </button>

          <br />
          {/* <button onClick={clearAnnotations}>Clear</button> */}
        </section>
        <div ref={containerRef} style={{height: '100vh'}} />
      </div>
    </main>
  );
}
