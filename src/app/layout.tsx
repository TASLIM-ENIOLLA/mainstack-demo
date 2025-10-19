import "@/css/globals.css";

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Mainstack Demo App",
  description: "Designed and developed by Taslim Eniolla",
};