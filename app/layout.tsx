import type { ReactNode } from "react";
import "./globals.css";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "NoteHub",
  description: "Notes app",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />

            <main>
              {children}
              {modal}
            </main>

            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}