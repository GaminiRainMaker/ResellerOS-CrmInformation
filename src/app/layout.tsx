/* eslint-disable no-nested-ternary */

'use client';

import ConfigProvider from 'antd/es/config-provider';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import {useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useState} from 'react';
import Providers from './Provider';
import theme from './style/theme';
import CanvasRedirectWrapper from './CanvasRedirect';
import Script from 'next/script';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta-sans',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  const searchParams = useSearchParams();
  const [locationdata, setLOcationData] = useState<string | null>(null);

  useEffect(() => {
    const locationToRedirect = searchParams.get('location');
    if (locationToRedirect) {
      setLOcationData(locationToRedirect);
    } else {
      setLOcationData('lifeboat');
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfigProvider theme={theme}>
        <html lang="en">
          <body className={`${jakartaSans.variable}`}>
            <Providers>
              <CanvasRedirectWrapper>{children}</CanvasRedirectWrapper>
              {/* {locationdata && ( */}
              <Script
                onLoad={() => console.log('Salesforce script loaded.')}
                src={
                  locationdata === 'lifeboat'
                    ? '/canvas-all-quote-ai.js'
                    : locationdata === 'OrderAI'
                      ? '/canvas-all-orderai'
                      : '/canvas-all.js'
                }
                strategy="beforeInteractive"
              />
              {/* )} */}
            </Providers>
          </body>
        </html>
      </ConfigProvider>
    </Suspense>
  );
}
