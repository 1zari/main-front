import JobsNav from "../../features/jobs/components/JobsNav";

export const metadata = {
  title: "시니어내일",
  description: "시니어를 위한 채용 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </head>
      <body>
        <div>
          <JobsNav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
