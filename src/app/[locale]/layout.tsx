import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const geistSans = { variable: "" };
const geistMono = { variable: "" };

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Estores Alicante',
      default: locale === 'es' ? 'Estores en Alicante | A medida con Instalación' : 'Blinds in Alicante | Custom with Installation',
    },
    description: locale === 'es' 
      ? 'Instalación profesional de estores a medida, cortinas y enrollables en toda la provincia de Alicante. Presupuesto sin compromiso.'
      : 'Professional installation of made to measure blinds, curtains and roller blinds in the Alicante province. Free quote.',
    openGraph: {
      title: locale === 'es' ? 'Estores en Alicante | A medida con Instalación' : 'Blinds in Alicante | Custom with Installation',
      description: locale === 'es' 
        ? 'Instalación profesional de estores a medida, cortinas y enrollables en toda la provincia de Alicante. Presupuesto sin compromiso.'
        : 'Professional installation of made to measure blinds, curtains and roller blinds in the Alicante province. Free quote.',
      url: `${baseUrl}/${locale}`,
      siteName: 'Estores Alicante',
      images: [
        {
          url: '/images/hero-instalacion-estores-alicante.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'es' ? 'Estores en Alicante' : 'Blinds in Alicante',
        },
      ],
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'es' ? 'Estores en Alicante | A medida con Instalación' : 'Blinds in Alicante | Custom with Installation',
      description: locale === 'es' 
        ? 'Instalación profesional de estores a medida, cortinas y enrollables en toda la provincia de Alicante. Presupuesto sin compromiso.'
        : 'Professional installation of made to measure blinds, curtains and roller blinds in the Alicante province. Free quote.',
      images: ['/images/hero-instalacion-estores-alicante.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'es': `${baseUrl}/es`,
        'en': `${baseUrl}/en`,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
        { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
      ],
    },
    verification: {
      google: 'nsYj2rrnQ5sqV3uWSIv2vgBALtLFdoD18EOtb_DSRnQ',
    },
  };
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <LocalBusinessSchema locale={locale} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <WhatsAppButton locale={locale} />
          <CookieBanner />
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-XYZ1234567" />
        <GoogleTagManager gtmId="GTM-KQRGTQ3F" />
      </body>
    </html>
  );
}
