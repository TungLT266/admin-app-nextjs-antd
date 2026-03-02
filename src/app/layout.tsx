import type { Metadata } from "next";
import localFont from "next/font/local";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NotificationContextProvider } from "@/shared/context/NotificationContextProvider";
import { I18nContextProvider } from "@/shared/context/I18nContextProvider";
import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE, I18N_STORAGE_KEY } from "@/i18n/constants";
import type { LanguageCode } from "@/i18n/constants";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin App",
  description: "Admin Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const lang =
    (cookieStore.get(I18N_STORAGE_KEY)?.value as LanguageCode) ||
    DEFAULT_LANGUAGE;

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <I18nContextProvider initialLanguage={lang}>
            <NotificationContextProvider>{children}</NotificationContextProvider>
          </I18nContextProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
