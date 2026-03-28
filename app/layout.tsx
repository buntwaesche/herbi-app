import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HerBI 2027 – 18. Herforder Berufsinformationstag",
    template: "%s | HerBI 2027",
  },
  description:
    "Am 05.02.2027 findet der 18. Herforder Berufsinformationstag statt. Über 50 ReferentInnen geben Einblicke in akademische Berufsfelder – aus der Praxis, für die Praxis!",
  keywords: ["HerBI", "Berufsinformationstag", "Herford", "Studium", "Berufsfelder", "Rotary", "2027"],
  openGraph: {
    title: "HerBI 2027 – 18. Herforder Berufsinformationstag",
    description: "Über 50 Berufsfelder in Live-Talks: Von Architektur bis Zahnmedizin. Am 05.02.2027 am Königin-Mathilde-Gymnasium Herford.",
    url: "https://herbi-app.vercel.app",
    siteName: "HerBI",
    locale: "de_DE",
    type: "website",
  },
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
