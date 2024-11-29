'use client';

// import type {SignedRequest} from '@/types/salesforce';
// import {getAccount} from './action';
import OsButton from '@/app/components/common/os-button';
import {useEffect, useState} from 'react';
import {getAccount} from './action';
import {SignedRequest} from '../../../../../types/salesforce';
import {useRouter} from 'next/navigation';
import {useAppDispatch} from '../../../../../redux/hook';
import {
  setIsCanvas,
  setCanvas,
  setNewSignedRequest,
  setDecryptedData,
} from '../../../../../redux/slices/canvas';

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
      const part = sr.split('.')[1];
      dispatch(setNewSignedRequest(sr));
      setSignedRequest(sr);
      setDecrypted(globalThis.JSON.parse(Sfdc.canvas.decode(part)));
      dispatch(
        setDecryptedData(globalThis.JSON.parse(Sfdc.canvas.decode(part))),
      );
      console.log(
        'srsrsrsr',
        sr,
        globalThis.JSON.parse(Sfdc.canvas.decode(part)),
      );
      if (data.payload.response) {
        dispatch(setIsCanvas(true));
        router.replace('/dealReg');
      }
    });
  }, []);

  // useEffect(() => {
  //   if (signedRequest) {
  //     const part = signedRequest.split('.')[1];
  //     setDecrypted(globalThis.JSON.parse(Sfdc.canvas.decode(part)));
  //     dispatch(setIsCanvas(true));
  //     dispatch(setCanvas(globalThis.JSON.parse(Sfdc.canvas.decode(part))));
  //     dispatch(setNewSignedRequest(signedRequest));
  //     dispatch(
  //       setDecryptedData(globalThis.JSON.parse(Sfdc.canvas.decode(part))),
  //     );
  //     router.replace('/dealReg');
  //   }
  // }, [signedRequest]);

  const handleGetAccount = async () => {
    console.log('get account:', signedRequest, decrypted);
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
