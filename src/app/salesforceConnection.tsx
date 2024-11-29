// lib/salesforceConnection.ts
import jsforce, {Connection, OAuth2} from 'jsforce';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {SignedRequest} from '../../types/salesforce';
import {useAppDispatch} from '../../redux/hook';

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
    // dispatch(setIsCanvas(true));
    // dispatch(setCanvas(globalThis.JSON.parse(Sfdc.canvas.decode(part))));
    // dispatch(setNewSignedRequest(signedRequest));
    // dispatch(setDecryptedData(globalThis.JSON.parse(Sfdc.canvas.decode(part))));
    router.replace('/dealReg');
  }
}, [signedRequest]);

let conn: Connection | null = null; // Singleton instance of the connection

export const createConnection = async (): Promise<Connection> => {
  if (!conn) {
    if (!signedRequest || !signedRequest) {
      throw new Error('Missing signedRequest or instanceUrl in Redux store.');
    }

    const oauth2 = new OAuth2({
      redirectUri: 'https://localhost:3000/auth/salesforce',
    });

    conn = new Connection({
      oauth2,
      signedRequest,
      instanceUrl: signedRequest,
    });
  }
  return conn;
};

export const getConnection = async (): Promise<Connection> => {
  if (!conn) {
    await createConnection();
  }
  return conn!;
};
