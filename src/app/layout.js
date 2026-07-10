import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Edufolio | Best Online Degree Institution & Career Center Kochi, Kerala",
  description: "Edufolio is India's leading online education advisor and degree center based in Kochi, Kerala. Get UGC-DEB approved MBA, MCA, BBA, BCA, and B.Com degrees from India's top accredited online universities. Compare programs, find affordable fees, and receive free expert counseling.",
  keywords: "best online degree center, best online degree institution, online education center Kochi, UGC approved online degree, online MBA Kochi Kerala, online MCA, Edufolio Kochi, online learning portal Kerala",
  metadataBase: new URL("https://edufolio.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Edufolio | Best Online Degree Institution & Career Center Kochi",
    description: "Find your perfect UGC-approved online degree with Edufolio. Based in Kochi, Kerala, guiding students nationwide to top university programs.",
    url: "https://edufolio.org",
    siteName: "Edufolio",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          {children}
        </Providers>
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/400x300?text=Image';
              e.target.style.objectFit = 'contain';
            }
          }, true);
        `}} />
      </body>
    </html>
  );
}
