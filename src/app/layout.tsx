import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "J4.Innovate - Leading AI-Powered Software Development Agency",
  description:
    "Your Ultimate Partner for World-Class Software Development, IT Consulting and Digital Transformation. Specializing in AI/ML, Web Development, Mobile Apps, and Cloud Services.",
  keywords: [
    "software development",
    "AI development",
    "web development",
    "mobile app development",
    "cloud services",
    "IT consulting",
    "digital transformation",
  ],
  authors: [{ name: "J4.Innovate" }],
  openGraph: {
    title: "J4.Innovate - Leading AI-Powered Software Development",
    description:
      "Your Ultimate Partner for World-Class Software Development and Digital Transformation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "J4.Innovate - Leading What's Next",
    description: "AI-Powered Software Development Agency",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">{children}</body>
    </html>
  );
}
