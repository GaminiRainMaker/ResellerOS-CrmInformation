'use client';

// import type {SignedRequest} from '@/types/salesforce';
// import {getAccount} from './action';
import OsButton from '@/app/components/common/os-button';
import {useEffect, useState} from 'react';
import {getAccount} from './action';
import {SignedRequest} from '../../../../../types/salesforce';
import {useRouter} from 'next/navigation';
import {useAppDispatch} from '../../../../../redux/hook';
import {setIsCanvas} from '../../../../../redux/slices/canvas';

export default function Salesforce() {
  const router = useRouter();
  const [signedRequest, setSignedRequest] = useState<string | null>(null);
  const [decrypted, setDecrypted] = useState<SignedRequest | null>(null);
  const [accountDetails, setAccountDetails] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    globalThis.Sfdc.canvas.client.refreshSignedRequest((data) => {
      console.log({data});
      const sr = data.payload.response;
      setSignedRequest(sr);
    });
  }, []);

  useEffect(() => {
    if (signedRequest) {
      const part = signedRequest.split('.')[1];
      setDecrypted(globalThis.JSON.parse(Sfdc.canvas.decode(part)));
      router.replace('/dealReg');
      dispatch(setIsCanvas(true));
    }
  }, [signedRequest]);

  const handleGetAccount = async () => {
    console.log('get account:', signedRequest);
    if (signedRequest) {
      const accounts = await getAccount(
        signedRequest,
        decrypted?.client.instanceUrl as string,
      );
      setAccountDetails(JSON.stringify(accounts, null, 2));
    }
  };
  return (
    <div>
      Salesforce
      <OsButton
        buttontype="PRIMARY"
        clickHandler={handleGetAccount}
        text="Authorize now"
      />
      <pre>{accountDetails}</pre>
    </div>
  );
}
