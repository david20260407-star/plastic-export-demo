import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { CompareProvider } from "@/components/compare-context";

export const metadata: Metadata = {
  title: "ChinaPlast Global - Premium Plastic Materials & Products",
  description:
    "Reliable Chinese manufacturer and exporter of plastic raw materials and finished products. Serving Europe, North America, and global markets.",
  keywords: [
    "plastic raw materials",
    "plastic finished products",
    "plastic additives",
    "HDPE",
    "PP",
    "PVC",
    "PET",
    "ABS",
    "modified plastics",
    "plastic exporter China",
  ],
  openGraph: {
    title: "ChinaPlast Global - Premium Plastic Materials & Products",
    description:
      "Reliable Chinese manufacturer and exporter of plastic raw materials and finished products.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";

  return (
    <html lang={lang}>
      <body className="antialiased">
        <CompareProvider>{children}</CompareProvider>
      </body>
    </html>
  );
}
