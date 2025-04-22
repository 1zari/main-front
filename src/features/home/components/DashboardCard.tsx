import { Heading } from "@/components/ui/Heading";

type DashboardCardProps = {
  title: string;
  value: string;
  unit: string;
};

function DashboardCard({ title, value, unit }: DashboardCardProps) {
  return (
    <div className="flex flex-col justify-between w-full max-w-48 h-28 p-4 rounded-xl shadow-sm bg-white">
      <span className="font-semibold text-gray-800">{title}</span>
      <Heading sizeOffset={3} className="self-end font-bold text-green-600">
        {value}
        {unit}
      </Heading>
    </div>
  );
}

export default DashboardCard;
