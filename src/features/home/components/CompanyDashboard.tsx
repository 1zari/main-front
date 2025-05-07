import { FadeInUp } from "@/components/motion/FadeInUp";
import { Heading } from "@/components/ui/Heading";
import DashboardCard from "@/features/home/components/DashboardCard";

export default function CompanyDashboard({ className }: { className?: string }) {
  const jobCount = "2";
  const applicantCount = "10";

  return (
    <div className={className}>
      <FadeInUp delay={0.2}>
        <Heading sizeOffset={3} className="text-2xl font-semibold p-2 pt-10">
          채용공고 현황
        </Heading>
      </FadeInUp>
      <FadeInUp delay={0.3}>
        <div className="flex w-full justify-center gap-4 px-4 pt-4 pb-10">
          <DashboardCard title="채용 진행중 공고" value={jobCount} unit="건" />
          <DashboardCard title="새로운 지원자" value={applicantCount} unit="명" />
        </div>
      </FadeInUp>
    </div>
  );
}
