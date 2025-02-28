import jsforce, { Connection, OAuth2 } from 'jsforce';

interface ConnectionParams {
  signedRequest: string;
  instanceUrl: string;
}

let conn: Connection | null = null;

export const createConnection = async ({ signedRequest, instanceUrl }: ConnectionParams): Promise<Connection> => {
  if (!conn) {
    const oauth2 = new OAuth2({
      redirectUri: 'https://localhost:3000/auth/salesforce',
    });

    conn = new jsforce.Connection({
      oauth2,
      signedRequest,
      instanceUrl,
    });
  }
  return conn;
};

export const getConnection = async ({ signedRequest, instanceUrl }: ConnectionParams): Promise<Connection> => {
  if (!conn) {
    await createConnection({ signedRequest, instanceUrl });
  }
  return conn!;
};
