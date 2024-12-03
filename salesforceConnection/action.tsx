'use server';

import jsforce from 'jsforce';

export async function getPartnerRecord(
  signedRequest: string,
  instanceUrl: string,
  partnerRegId: string,
) {
  const oauth2 = {
    redirectUri: 'https://localhost:3000/auth/salesforce',
    // redirectUri: 'https://app-dev.reselleros.com/auth/salesforce',
  };
  const conn = await new jsforce.Connection({
    oauth2,
    signedRequest,
    instanceUrl,
  });

  // Query the record
  const PartnerReg = await conn
    .sobject('rosdealregai__Partner_Registration__c')
    .retrieve(partnerRegId);

  return PartnerReg;
}
