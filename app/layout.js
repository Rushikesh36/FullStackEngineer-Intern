import "./globals.css";

export const metadata = {
  title: "Software Co-op Technical Assessment",
  description: "Find it, explain it, fix it.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
