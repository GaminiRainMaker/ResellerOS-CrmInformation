import {Col, Row} from '@/app/components/common/antd/Grid';
import {Button} from 'antd';
import React from 'react';

const files = [
  {
    name: 'Carahsoft - 100 lines',
    url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Carahsoft%20Dell%20Sample%20pdf%20for%20Demo.pdf?sp=r&st=2025-02-13T07:46:02Z&se=2050-02-13T15:46:02Z&spr=https&sv=2022-11-02&sr=b&sig=nXYrFBVnsji7AVv8JTozYXhYuE82kGJ%2F7rwyCaOCByY%3D',
  },
  {
    name: 'Arista',
    url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Arista%20Sample%20Quote%20for%20Demo.pdf?sp=r&st=2025-02-13T07:47:12Z&se=2050-02-13T15:47:12Z&spr=https&sv=2022-11-02&sr=b&sig=9cANEVPOmTYNVZeObq7I%2FaKSWyGuPVfZPh1eRPMkK%2BI%3D',
  },
  {
    name: 'Immix',
    url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Immix%20Sample%20Quote%20for%20Demo.pdf?sp=r&st=2025-02-13T07:47:43Z&se=2050-02-13T15:47:43Z&spr=https&sv=2022-11-02&sr=b&sig=qbhxzYWEv98FknyOKlybFOE%2FWZW9mIG%2FA%2FaGDByFByQ%3D',
  },
  {
    name: 'Carahsoft Excel Spreadsheet',
    url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Carahsoft%20Dell%20Sample%20Excel%20for%20Demo.xlsx?sp=r&st=2025-02-13T07:48:15Z&se=2050-02-13T15:48:15Z&spr=https&sv=2022-11-02&sr=b&sig=dl7%2Ba%2F9uiNjovUpPZL4Am%2FpvN%2Fu3k42R8tgS3LwOXUs%3D',
  },
];

const TrialFiles = () => {
  return (
    <>
      <br />
      <Row justify={'space-between'} gutter={[16, 16]}>
        {files.map((file, index) => (
          <Col key={index} span={12} offset={-1}>
            <Button
              type="primary"
              onClick={() => window.open(file.url, '_blank')}
            >
              {file.name}
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TrialFiles;
