import "../globals.css";

import Header from "@/components/global/header";
import Footer from "@/components/global/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
