import "./globals.css";

import { noto_sans_tc, noto_serif_tc, noto_sans_mono } from "@/lib/fonts";
import clsx from "clsx";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW">
      <body
        className={clsx(
          noto_sans_tc.className,
          noto_sans_tc.variable,
          noto_serif_tc.variable,
          noto_sans_mono.variable,
          "antialiased",
        )}
      >
        {children}
      </body>
    </html>
  );
}
