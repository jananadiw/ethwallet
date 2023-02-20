import '@/styles/globals.scss';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <html lang="en">
            <head />
            {/* header */}
            <body>{children}</body>
            {/* footer */}
        </html>
    );
}
