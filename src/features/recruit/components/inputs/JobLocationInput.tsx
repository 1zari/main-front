"use client";

import { FormField } from "@/features/recruit/components/inputs";
import { INPUT_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { useEffect, useRef } from "react";
import { FieldError, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

declare global {
  interface Window {
    daum: any;
  }
}

export function JobLocationInput({
  register,
  setValue,
  watch,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  setValue: UseFormSetValue<JobPostFormValues>;
  watch: UseFormWatch<JobPostFormValues>;
  error?: {
    location?: FieldError;
    locationDetail?: FieldError;
  };
}) {
  const detailAddressRef = useRef<HTMLInputElement>(null); // 상세주소 인풋 ref 추가

  const location = watch("location");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSearchAddress = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      const elementLayer = document.createElement("div");
      elementLayer.id = "postcodeLayer";
      elementLayer.style.position = "fixed";
      elementLayer.style.top = "0";
      elementLayer.style.left = "0";
      elementLayer.style.width = "100%";
      elementLayer.style.height = "100%";
      elementLayer.style.zIndex = "1000";
      elementLayer.style.backgroundColor = "#fff";
      document.body.appendChild(elementLayer);

      new window.daum.Postcode({
        oncomplete: function (data: any) {
          setValue("location", data.address);
          document.body.removeChild(elementLayer);
          detailAddressRef.current?.focus();
        },
        width: "100%",
        height: "100%",
      }).embed(elementLayer);
    } else {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          setValue("location", data.address);
          detailAddressRef.current?.focus();
        },
        width: "100%",
        height: "100%",
      }).open();
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <FormField label="근무지" error={error?.location}>
        <div className="flex gap-2">
          <input
            {...register("location")}
            placeholder="주소를 검색하세요"
            readOnly
            className={`${INPUT_CLASS} flex-1`}
          />
          <button
            type="button"
            onClick={handleSearchAddress}
            className="px-4 py-2 whitespace-nowrap text-sm bg-primary text-white rounded"
          >
            주소 검색
          </button>
        </div>
      </FormField>
      {location && (
        <FormField label="상세 주소" error={error?.locationDetail}>
          <input
            {...register("locationDetail")}
            ref={detailAddressRef}
            placeholder="상세 주소를 입력하세요"
            className={INPUT_CLASS}
          />
        </FormField>
      )}
    </div>
  );
}
