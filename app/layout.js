import "./globals.css";

export const metadata = {
  title: "Full Stack Engineer (Intern) Assessment",
  description: "Find it, explain it, fix it.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
