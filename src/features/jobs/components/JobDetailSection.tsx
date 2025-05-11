"use client";
import SectionDivider from "@/components/ui/SectionDivider";
import React, { useEffect } from "react";

interface JobDetailSectionProps {
  title: string;
  items: {
    label?: string;
    value: string | React.ReactNode;
  }[];
}

export default function JobDetailSection({ title, items }: JobDetailSectionProps) {
  useEffect(() => {
    if (title === "근무지") {
      if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // default 서울 시청
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      }
    }
  }, [title]);

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
            <div className="w-full h-48" id="kakao-map" />
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
      )}
      <SectionDivider />
    </div>
  );
}
