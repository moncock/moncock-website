import Navigation from '@components/navigation';
import { RecoilRoot } from '@store/index';
import ThemeProvider from '@theme/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Moncock',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th">
            <body>
                <RecoilRoot>
                    <ThemeProvider>
                        <Navigation />
                        {children}
                    </ThemeProvider>
                </RecoilRoot>
            </body>
        </html>
    );
}
