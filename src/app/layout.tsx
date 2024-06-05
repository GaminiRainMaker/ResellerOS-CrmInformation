import ConfigProvider from 'antd/es/config-provider';
import type {Metadata} from 'next';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import Providers from './Provider';
import theme from './style/theme';
// import {PDFViewer} from '@react-pdf/renderer'; // Import PDFViewer from react-pdf
// import pdfjs from '@react-pdf/renderer'; // Import pdfjs from react-pdf

// // Set the worker path for react-pdf
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta-sans',
});

export const metadata: Metadata = {
  title: 'ResellerOS',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <PDFViewer>
    <ConfigProvider theme={theme}>
      <html lang="en">
        <body className={`${jakartaSans.variable}`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ConfigProvider>
    // </PDFViewer>
  );
}
