import type { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
    title: 'Vincent Limardi',
    description: 'Personal portfolio of Vincent Limardi',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
