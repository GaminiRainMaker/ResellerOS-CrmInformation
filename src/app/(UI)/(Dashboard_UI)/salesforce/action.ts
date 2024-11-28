'use server';

import jsforce from 'jsforce';

export async function getAccount(signedRequest: string, instanceUrl: string) {
  const oauth2 = {
    redirectUri: 'https://localhost:3000/auth/salesforce',
  };
  const conn = await new jsforce.Connection({
    oauth2,
    signedRequest,
    instanceUrl,
  });
  const accounts = await conn
    .sobject('Contact')
    .find({}, ['Id', 'Name', 'FirstName']); // "fields" argument is omitted
  return accounts;
}
