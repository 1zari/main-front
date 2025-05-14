"use client";

import { FormField } from "@/features/recruit/components/inputs";
import { INPUT_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { useEffect } from "react";
import { FieldError, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
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
        oncomplete: async function (data: DaumPostcodeData) {
          const address = data.address;
          setValue("location", address);

          try {
            const res = await fetch(
              `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
              {
                headers: {
                  Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
                },
              },
            );
            const result = await res.json();
            const coords = result.documents?.[0];
            if (coords) {
              setValue("locationxy.0", parseFloat(coords.y));
              setValue("locationxy.1", parseFloat(coords.x));
            }
          } catch (e) {
            console.error("좌표 변환 실패:", e);
          }

          document.body.removeChild(elementLayer);
        },
        width: "100%",
        height: "100%",
      }).embed(elementLayer);
    } else {
      new window.daum.Postcode({
        oncomplete: async function (data: DaumPostcodeData) {
          const address = data.address;
          setValue("location", address);

          try {
            const res = await fetch(
              `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
              {
                headers: {
                  Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
                },
              },
            );
            const result = await res.json();
            const coords = result.documents?.[0];
            if (coords) {
              setValue("latitude", parseFloat(coords.y));
              setValue("longitude", parseFloat(coords.x));
            }
          } catch (e) {
            console.error("좌표 변환 실패:", e);
          }
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
            onClick={handleSearchAddress}
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
            placeholder="상세 주소를 입력하세요"
            className={INPUT_CLASS}
          />
        </FormField>
      )}
    </div>
  );
}
