
import { Toaster } from 'sonner';
import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { getMessages } from 'next-intl/server';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextTopLoader from 'nextjs-toploader';


import { auth } from '@/auth';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: [
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  display: 'swap'
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Pakkit!',
  description: 'Create your lists by your own liking.',
  appleWebApp: {
    title: "pakkit.",
    statusBarStyle: 'black-translucent',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>

      <html lang="en">
        <body className={
          `${nunito.className} 
          bg-stone-200/90 dark:bg-stone-800`
        }>
          <NextTopLoader />
          {/* <NextIntlClientProvider messages={messages}> */}
            {/* bg-gradient-to-br from-stone-100 to-stone-300 dark:bg-stone-900 */}
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          {/* </NextIntlClientProvider> */}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </SessionProvider>
  )
}
