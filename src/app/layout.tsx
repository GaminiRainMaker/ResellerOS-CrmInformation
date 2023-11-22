import type {Metadata} from 'next';
import './globals.css';
import ConfigProvider from 'antd/es/config-provider';
import {Plus_Jakarta_Sans} from 'next/font/google';
import theme from './style/theme';
import Providers from './Provider';

const inter = Plus_Jakarta_Sans({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'ResellerOS',
  description: 'Generated by create next app',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ConfigProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ConfigProvider>
  );
}
