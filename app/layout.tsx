import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HerBI – Herforder Berufsinformationstag",
  description:
    "HerBI bringt Referentinnen und Referenten mit Schülerinnen und Schülern zusammen, die sich über akademische Berufsfelder informieren möchten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
