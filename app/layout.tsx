import type { Metadata } from "next";
import { getAppUrl } from "@/lib/app-url";
import { Providers } from "./providers";
import "./globals.css";

const fontClassName = "h-full";

export const metadata: Metadata = {
  title: {
    default: "TemplateHub CM — Modèles de sites web modernes",
    template: "%s | TemplateHub CM",
  },
  description:
    "Marketplace de templates web modernes pour le Cameroun et l'Afrique. Paiement sécurisé via Paystack.",
  metadataBase: new URL(getAppUrl()),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={fontClassName}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
