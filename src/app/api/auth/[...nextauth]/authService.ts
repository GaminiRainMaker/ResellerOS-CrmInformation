import jwt_decode from 'jwt-decode';
import {JWT} from 'next-auth/jwt';
import {API} from '../../../../../services/CONSTANTS';
import {DecodedToken} from './types';

export async function authenticateUser(
  credentials:
    | Record<'username' | 'password' | 'remember_me', string>
    | undefined,
) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const rememberMe: boolean | undefined =
    typeof credentials?.remember_me === 'string'
      ? credentials?.remember_me === 'true'
      : credentials?.remember_me;

  const requestBody = JSON.stringify({
    username: credentials?.username,
    password: credentials?.password,
    remember_me: rememberMe,
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: requestBody,
    redirect: 'follow' as RequestRedirect,
  };

  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URI;
    const loginURL = API.AUTHENTICATION.LOG_IN;
    const response = await fetch(`${serverURL}/${loginURL}`, requestOptions);
    const result = await response.json();

    if (result.success && result.code === 201) {
      const decoded: DecodedToken = jwt_decode(result.data.access_token);

      // Check if the token has an expiry date and adjust it accordingly
      if (decoded.exp) {
        return {
          ...result,
          expires_on: Date.now() + decoded.exp * 1000,
        };
      }
    }
    // Return result as it is to access error code and message in the login page
    return result;
  } catch (error) {
    return null;
  }
}

export async function refreshAccessToken(token: JWT) {
  const headers = new Headers();
  headers.append(
    'Authorization',
    `Bearer ${(token as any).data.refresh_token}`,
  );

  const requestOptions = {
    method: 'POST',
    headers: headers,
    redirect: 'follow' as RequestRedirect,
  };

  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URI;
    const refreshURL = API.AUTHENTICATION.REFRESH;

    const response = await fetch(`${serverURL}/${refreshURL}`, requestOptions);
    const refreshedTokens = await response.json();

    if (!refreshedTokens.success) {
      throw refreshedTokens;
    }

    const decoded: DecodedToken = jwt_decode(refreshedTokens.data.access_token);

    const refactoredToken = {
      ...token,
      data: {
        ...(token as any).data,
        access_token: refreshedTokens.data.access_token,
        refresh_token:
          refreshedTokens.data.refresh_token ??
          (token as any).data.refresh_token,
      },
      expires_on: decoded.exp ? Date.now() + decoded.exp * 1000 : null,
    };

    return refactoredToken;
  } catch (error) {
    console.error('RefreshAccessTokenError', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
