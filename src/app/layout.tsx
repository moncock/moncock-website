import AppProvider from '@contexts/appProvider';
import '@theme/globals.css';
import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';

export const metadata: Metadata = {
    title: 'Moncock',
    description: 'Moncock Website'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    noStore();

    return (
        <html lang="th">
            <body>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
