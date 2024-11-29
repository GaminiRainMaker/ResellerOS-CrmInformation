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
  console.log('Connnn123', conn);
  const accounts = await conn
    .sobject('Contact')
    .find({}, ['Id', 'Name', 'FirstName']); // "fields" argument is omitted
  return accounts;
}

export async function getAccount123(
  signedRequest: string,
  instanceUrl: string,
  orgId: string,
) {
  const oauth2 = {
    redirectUri: 'https://localhost:3000/auth/salesforce',
  };
  const conn = await new jsforce.Connection({
    oauth2,
    signedRequest,
    instanceUrl,
  });
  const account = await conn.sobject('Partner_Program__c').retrieve(orgId);
  return account;
}

export async function getOpportunity(
  signedRequest: string,
  instanceUrl: string,
) {
  const oauth2 = {
    redirectUri: 'https://localhost:3000/auth/salesforce',
  };
  const conn = await new jsforce.Connection({
    oauth2,
    signedRequest,
    instanceUrl,
  });
  const opportunities = await conn
    .sobject('Opportunity') // Replace with the name of the object you want to query
    .find({}, ['Id', 'Name', 'StageName', 'CloseDate']); // Specify fields you need

  return opportunities;
}
