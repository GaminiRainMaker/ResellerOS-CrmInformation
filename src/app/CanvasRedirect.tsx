'use client';

import {ReactNode, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAppDispatch} from '../../redux/hook';
import {
  setDecryptedData,
  setIsCanvas,
  setNewSignedRequest,
} from '../../redux/slices/canvas';
import {SignedRequest} from '../../types/salesforce';

interface Props {
  children: ReactNode;
}

const CanvasRedirectWrapper = ({children}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();


  useEffect(() => {
    const isCanvas = window.location !== window.parent.location;
    if (isCanvas) {
      globalThis.Sfdc.canvas.client.refreshSignedRequest((data) => {
        console.log({data});
        if (data?.payload?.auxiliary?.appApprovalType === 'ADMIN_APPROVED') {
          console.log('ADMIN_APPROVED');
          const sr = data.payload.response;
          const part = sr.split('.')[1];
          dispatch(setNewSignedRequest(sr));
          dispatch(
            setDecryptedData(globalThis.JSON.parse(Sfdc.canvas.decode(part))),
          );
          dispatch(setIsCanvas(true));
          router.replace('/dealReg');
        }
      });

      console.log('Inside Salesforce Canvas');
    } else {
      console.log('Outside Canvas');
      router.replace('/login');
    }
  }, [router, dispatch]);

  // Optionally, return null if the redirection process doesn't need to show children.
  return <>{children}</>;
};

export default CanvasRedirectWrapper;
