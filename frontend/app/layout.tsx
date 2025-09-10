import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}