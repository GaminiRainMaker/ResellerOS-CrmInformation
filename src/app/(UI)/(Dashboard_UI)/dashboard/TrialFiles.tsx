import OsTable from '@/app/components/common/os-table';
import {Table, Button, Modal} from 'antd';
import React, {useState} from 'react';

const files = [
  {
    key: '1',
    name: 'Carahsoft pdf',
    url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Carahsoft%20Dell%20Sample%20pdf%20for%20Demo.pdf?sp=r&st=2025-02-13T07:46:02Z&se=2050-02-13T15:46:02Z&spr=https&sv=2022-11-02&sr=b&sig=nXYrFBVnsji7AVv8JTozYXhYuE82kGJ%2F7rwyCaOCByY%3D',
  },
  {
    key: '2',
    name: 'Arista',
    url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Arista%20Sample%20Quote%20for%20Demo.pdf?sp=r&st=2025-02-13T07:47:12Z&se=2050-02-13T15:47:12Z&spr=https&sv=2022-11-02&sr=b&sig=9cANEVPOmTYNVZeObq7I%2FaKSWyGuPVfZPh1eRPMkK%2BI%3D',
  },
  {
    key: '3',
    name: 'Carahsoft Excel',
    url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Carahsoft%20Dell%20Sample%20Excel%20for%20Demo.xlsx?sp=r&st=2025-02-13T07:48:15Z&se=2050-02-13T15:48:15Z&spr=https&sv=2022-11-02&sr=b&sig=dl7%2Ba%2F9uiNjovUpPZL4Am%2FpvN%2Fu3k42R8tgS3LwOXUs%3D',
  },
  {
    key: '4',
    name: 'Immix',
    url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Immix%20Sample%20Quote%20for%20Demo.pdf?sp=r&st=2025-02-13T07:47:43Z&se=2050-02-13T15:47:43Z&spr=https&sv=2022-11-02&sr=b&sig=qbhxzYWEv98FknyOKlybFOE%2FWZW9mIG%2FA%2FaGDByFByQ%3D',
  },
];

const TrialFiles = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDownload = async () => {
    for (const key of selectedRowKeys) {
      const file = files.find((file) => file.key === key);
      console.log('first', file, key, selectedRowKeys);
      if (file) {
        const link = document.createElement('a');
        link.href = file.url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Add a small delay between downloads
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
      }
    }
  };

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setPreviewVisible(true);
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };



  const rowSelection = {
    onChange: (selectedRowKeys: any,) => {
      setSelectedRowIds(selectedRowKeys);
      onSelectChange(selectedRowKeys)
    },
  };

  const columns = [
    {
      title: 'File Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Preview',
      dataIndex: 'url',
      key: 'url',
      render: (text: string) => (
        <Button type="link" onClick={() => handlePreview(text)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={files}
        pagination={false}
        
      />
      <Button
        type="primary"
        onClick={handleDownload}
        disabled={selectedRowKeys.length === 0}
      >
        Download Selected Files
      </Button>
      <Modal
        title="File Preview"
        visible={previewVisible}
        onCancel={handleCancelPreview}
        footer={null}
        width="80%"
      >
        <iframe
          title="file-preview"
          src={previewUrl}
          width="100%"
          height="500px"
          style={{border: 'none'}}
        />
      </Modal>
    </>
  );
};

export default TrialFiles;
