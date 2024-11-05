import './globals.css';
import localFont from 'next/font/local';
import ClientLayout from '../components/ClientLayout';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata = {
  title: 'Clofit',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='apple-touch-icon' href='/icon-196x196.png' />
        <link rel='icon' href='/favicon.ico' />
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
      </head>
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
      </body> */}
      <body className={pretendard.className}>
        {' '}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
