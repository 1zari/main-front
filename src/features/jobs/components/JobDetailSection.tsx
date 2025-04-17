import SectionDivider from "@/components/ui/SectionDivider";
import React from "react";

interface JobDetailSectionProps {
  title: string;
  items: {
    label?: string;
    value: string | React.ReactNode;
  }[];
}

export default function JobDetailSection({ title, items }: JobDetailSectionProps) {
  return (
    <div className="flex flex-col gap-4 mb-2">
      <h2 className="text-xl text-primary font-semibold mb-2">{title}</h2>
      {title === "상세요강" ? (
        <div className="flex flex-col gap-2">
          <p className="whitespace-pre-line text-gray-700">{items[0].value}</p>
        </div>
      ) : title === "근무지" ? (
        <>
          <div className="flex flex-col gap-2">
            <p className=" text-gray-700">{items[0].value}</p>
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
              지도 영역
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-10">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.label && <p className="text-gray-500">{item.label}</p>}
              <p className="font-bold">
                {item.label === "전화" && typeof item.value === "string" ? (
                  <a href={`tel:${item.value}`} className="underline">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </p>
            </React.Fragment>
          ))}
        </div>
      )}{" "}
      <SectionDivider />
    </div>
  );
}
