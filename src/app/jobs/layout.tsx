import JobsNavWrapper from "@/features/jobs/components/JobsNavWrapper";

export const metadata = {
  title: "시니어내일",
  description: "시니어를 위한 채용 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <JobsNavWrapper />
      <main>{children}</main>
    </div>
  );
}
