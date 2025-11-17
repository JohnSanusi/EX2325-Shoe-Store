import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartPanel from "@/components/CartPanel";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ex2325.vercel.app"
  ),
  title: {
    default: "EX2325 - Premium Men's Shoes | Shop Quality Footwear Online",
    template: "%s | EX2325",
  },
  description:
    "Discover premium men's shoes at EX2325. Shop our curated collection of high-quality footwear including sneakers, dress shoes, boots, and casual shoes. Free shipping on orders over $100. Fast delivery across Nigeria.",
  keywords: [
    "men's shoes",
    "premium footwear",
    "sneakers",
    "dress shoes",
    "casual shoes",
    "men's boots",
    "quality shoes Nigeria",
    "buy shoes online",
    "footwear store",
    "EX2325",
    "men's fashion",
    "shoe shop",
  ],
  authors: [{ name: "EX2325" }],
  creator: "EX2325",
  publisher: "EX2325",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EX2325",
    title: "EX2325 - Premium Men's Shoes | Shop Quality Footwear Online",
    description:
      "Discover premium men's shoes at EX2325. Shop our curated collection of high-quality footwear. Free shipping on orders over $100.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EX2325 - Premium Men's Shoes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EX2325 - Premium Men's Shoes | Shop Quality Footwear Online",
    description:
      "Discover premium men's shoes at EX2325. Shop our curated collection of high-quality footwear.",
    images: ["/og-image.jpg"],
    creator: "@ex2325",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },
  category: "fashion",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "EX2325",
  description: "Premium men's shoes and quality footwear store",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ex2325.vercel.app",
  logo: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://ex2325.vercel.app"
  }/logo.png`,
  image: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://ex2325.vercel.app"
  }/og-image.jpg`,
  telephone: "+234 906 908 8121",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Trade Fair Lagos",
    addressLocality: "Lagos",
    addressRegion: "Lagos",
    postalCode: "102102",
    addressCountry: "NG",
  },

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "9:00",
      closes: "18:00",
    },
  ],
  priceRange: "₦25,000-₦50,000",
  currenciesAccepted: "NGN",
  paymentAccepted: "Cash, Credit Card, Debit Card, Bank Transfer",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EX2325",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ex2325.vercel.app",
  logo: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://ex2325.vercel.app"
  }/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+234 906 908 8121",
    contactType: "Customer Service",
    areaServed: "NG",
    availableLanguage: ["English"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap"
        />
        <meta name="theme-color" content="#ea580c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EX2325" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <CartProvider>
          <Navbar />
          <main role="main" id="main-content">
            {children}
          </main>
          <Footer />
          <CartPanel />
        </CartProvider>

        {/* Google Analytics - Replace with your ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
