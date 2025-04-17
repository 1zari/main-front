import React from "react";

interface JobDetailSectionProps {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
}

export default function JobDetailSection({ title, items }: JobDetailSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl text-primary font-semibold mb-2">{title}</h2>
      <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-10">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <p>{item.label}</p>
            <p className="font-bold">{item.value}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
