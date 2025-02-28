import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { decrypt } from '@/app/utils/base';
import Typography from '@/app/components/common/typography';

const DecryptedPassword: React.FC<{ password: any }> = ({ password }) => {
  const [decrypted, setDecrypted] = useState<string>('**********');
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

  useEffect(() => {
    const decryptPassword = async () => {
      try {
        const [iv, encryptedData] = password?.split(':');
        const decrypted = await decrypt(encryptedData, SECRET_KEY as string, iv);
        setDecrypted(decrypted);
      } catch (error) {
        console.error('Decryption error:', error);
        setDecrypted('Error');
      }
    };

    decryptPassword();
  }, [JSON.stringify(password)]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(decrypted);
      notification.open({
        message: 'Password Copied',
        type: 'success',
        placement: 'top',
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Typography name="Body 4/Regular">
      {Array(10).fill('*').join('')}
      <CopyOutlined
        style={{ marginLeft: '10px', cursor: 'pointer' }}
        onClick={handleCopy}
      />
    </Typography>
  );
};

export default DecryptedPassword;
