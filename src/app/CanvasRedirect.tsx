'use client';

import {ReactNode, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAppDispatch} from '../../redux/hook';
import {
  setDecryptedData,
  setIsCanvas,
  setNewSignedRequest,
  setSalesforceNavigationKey,
} from '../../redux/slices/canvas';

interface Props {
  children: ReactNode;
}
function getNavigationKey(locationUrl: string) {
  const regex = /\/lightning\/r\/(\w+)\//;
  const match = locationUrl.match(regex);
  return match ? match[1] : null; // Returns the key or null if not found
}

const CanvasRedirectWrapper = ({children}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isCanvas: boolean = false;
    if (window.location !== window.parent.location) {
      isCanvas = true;
    }

    if (isCanvas) {
      globalThis.Sfdc.canvas.client.refreshSignedRequest((data) => {
        if (data?.payload?.auxiliary?.appApprovalType === 'ADMIN_APPROVED') {
          const sr = data.payload.response;
          const part = sr.split('.')[1];

          const decryptData = globalThis.JSON.parse(Sfdc.canvas.decode(part));
          console.log({sr}, {decryptData});
          const navigationKey = getNavigationKey(
            decryptData?.context?.environment?.locationUrl,
          );
          dispatch(setSalesforceNavigationKey(navigationKey));
          dispatch(setNewSignedRequest(sr));
          dispatch(
            setDecryptedData(globalThis.JSON.parse(Sfdc.canvas.decode(part))),
          );
          let NavigationUrls =
            decryptData?.context?.environment?.parameters?.locationUrl;
          console.log(
            '45435435334',
            decryptData?.context?.environment?.parameters,
            NavigationUrls,
          );
          // NavigationUrls == "EditDataAsIs"
          dispatch(setIsCanvas(true));
          if (navigationKey === 'Opportunity') {
            router.replace('/dealReg');
          } else if (
            navigationKey === 'rosdealregai__Partner_Registration__c'
          ) {
            router.replace('/dealRegDetail');
          } else if (
            NavigationUrls === 'Account' ||
            NavigationUrls === 'Manual'
          ) {
            router.replace('/manualFileEditor');
          } else if (
            NavigationUrls == 'EditDataAsIs' ||
            NavigationUrls == 'exportfiletotable'
          ) {
            router.replace('/fileEditor');
          }
        }
      });

      console.log('Inside Salesforce Canvas1234');
    }
  }, [router, dispatch]);

  // Optionally, return null if the redirection process doesn't need to show children.
  return <>{children}</>;
};

export default CanvasRedirectWrapper;
