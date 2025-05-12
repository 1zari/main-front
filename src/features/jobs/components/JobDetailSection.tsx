"use client";
import SectionDivider from "@/components/ui/SectionDivider";
import React from "react";

interface JobDetailSectionProps {
  title: string;
  items: {
    label?: string;
    value: string | React.ReactNode;
  }[];
  location?: { lat: number; lng: number };
}

import { useEffect } from "react";

export default function JobDetailSection({ title, items, location }: JobDetailSectionProps) {
  useEffect(() => {
    console.log("JobDetailSection location:", location);
    if (title !== "근무지" || typeof window === "undefined" || !location) return;

    if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(location.lat, location.lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        const marker = new window.kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);
      });
    }
  }, [title, location]);

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
            <div id="kakao-map" style={{ width: "100%", height: "300px" }} />
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
