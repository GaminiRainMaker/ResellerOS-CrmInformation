// Add this at the top of the file
'use client';

import ConfigProvider from 'antd/es/config-provider';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import Providers from './Provider';
import theme from './style/theme';
import NextScript from 'next/script';
import CanvasRedirectWrapper from './CanvasRedirect';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta-sans',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  // Using useSearchParams inside the component
  const [locationdata, setLOcationData] = useState<any>();
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
  console.log('Location', locationToRedirect, locationdata);

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
