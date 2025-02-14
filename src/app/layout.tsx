/* eslint-disable no-nested-ternary */
// Add this at the top of the file

'use client';

import ConfigProvider from 'antd/es/config-provider';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import NextScript from 'next/script';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import Providers from './Provider';
import theme from './style/theme';
import CanvasRedirectWrapper from './CanvasRedirect';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta-sans',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [locationdata, setLOcationData] = useState<any>('lifeboat');
  const searchParams = useSearchParams();
  const locationToRedirect = searchParams.get('location');
  useEffect(() => {
    if (
      locationToRedirect &&
      locationToRedirect !== null &&
      locationToRedirect !== undefined
    ) {
      setLOcationData(locationToRedirect);
    }
  }, [locationToRedirect]);
  return (
    <ConfigProvider theme={theme}>
      <html lang="en">
        <body className={`${jakartaSans.variable}`}>
          <Providers>
            <CanvasRedirectWrapper>{children}</CanvasRedirectWrapper>
            {locationdata === 'lifeboat' ? (
              <NextScript
                src="/canvas-all-quote-ai.js"
                strategy="beforeInteractive"
              />
            ) : locationdata === 'OrderAI' ? (
              <NextScript
                src="/canvas-all-orderai"
                strategy="beforeInteractive"
              />
            ) : (
              <NextScript src="/canvas-all.js" strategy="beforeInteractive" />
            )}
          </Providers>
        </body>
      </html>
    </ConfigProvider>
  );
}
