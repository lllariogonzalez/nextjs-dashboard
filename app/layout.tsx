import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Carpool Dashboard | @Group2',
    default: 'Carpool Dashboard by Group2',
  },
  description: 'A carpool application dashboard, built with App Router.',
  metadataBase: new URL('https://carpool2-alpha.vercel.app/'),
  authors: [{name: 'Group2', url:'https://www.yale-nus.edu.sg/'}],
  keywords: ['Next.js 14', 'Carpool', 'Dashboard', 'nextjs.org/learn', 'Server Actions'],
  openGraph: {
    title: 'Carpool Dashboard',
    description: 'A carpool application dashboard, built with App Router.',
    url: 'https://carpool2-alpha.vercel.app/',
    type: 'website',
  },
  twitter: {
    site: '@carpool',
    description:'A carpool application dashboard, built with App Router.',
    title:'Carpool Dashboard by Group2',
    creator:'@Group2',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
