import type { Metadata } from 'next';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ReportProvider } from './context/ReportContext';

export const metadata: Metadata = {
  title: 'Care4Street',
  description: 'Report infrastructure issues in Bangalore',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReportProvider>
          {children}
        </ReportProvider>
      </body>
    </html>
  );
}
