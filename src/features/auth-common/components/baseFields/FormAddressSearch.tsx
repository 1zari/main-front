"use client";
import { useEffect, useRef, useState } from "react";
import { Controller, FieldPath, PathValue, useFormContext } from "react-hook-form";

interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
  userSelectedType: "R" | "J";
  bname: string;
  buildingName: string;
  apartment: "Y" | "N";
}

declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: DaumPostcodeData) => void;
        onresize?: (size: { height: number }) => void;
        width?: string;
        height?: string;
      }) => {
        embed: (element: HTMLElement) => void;
      };
    };
  }
}

type Props<T extends Record<string, unknown>> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  detailName?: FieldPath<T>;
};

export default function FormAddressSearch<T extends Record<string, unknown>>({
  name,
  detailName,
  label = "주소",
  placeholder = "도로명 주소 검색",
}: Props<T>) {
  const { control, setValue, clearErrors, formState } = useFormContext<T>();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.daum?.Postcode) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isOpen || !ready || !wrapRef.current || !window.daum?.Postcode) return;

    const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        let fullAddress = data.roadAddress;
        let extra = "";

        if (data.userSelectedType === "R") {
          if (data.bname && /[동|로|가]$/g.test(data.bname)) {
            extra += data.bname;
          }
          if (data.buildingName && data.apartment === "Y") {
            extra += extra ? ", " + data.buildingName : data.buildingName;
          }
          if (extra) fullAddress += ` (${extra})`;
        }

        setValue(name, fullAddress as PathValue<T, FieldPath<T>>);
        clearErrors(name);
        if (detailName) {
          setValue(detailName, "" as PathValue<T, FieldPath<T>>);
          clearErrors(detailName);
        }
        setIsOpen(false);
        document.body.scrollTop = currentScroll;
      },
      onresize: (size) => {
        if (wrapRef.current) {
          wrapRef.current.style.height = `${size.height}px`;
        }
      },
      width: "100%",
      height: "100%",
    }).embed(wrapRef.current);
  }, [isOpen, ready, name, detailName, setValue, clearErrors]);

  const handleSearch = () => {
    if (!ready) {
      alert("주소 검색 스크립트가 아직 로딩되지 않았습니다.");
      return;
    }
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const addressError = formState.errors[name];
  const detailError = detailName ? formState.errors[detailName] : undefined;

  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg whitespace-normal break-keep">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row sm:items-start gap-3 w-full">
        <div className="relative w-full sm:w-auto flex-1">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={field.value as string}
                readOnly
                className="w-full h-[60px] border border-gray-300 px-4 pr-[70px] rounded bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary cursor-pointer"
                placeholder={placeholder}
              />
            )}
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="w-full sm:w-auto h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap"
        >
          주소 찾기
        </button>
      </div>

      {detailName && (
        <div className="mt-3">
          <Controller
            name={detailName}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={field.value as string}
                placeholder="상세주소 입력"
                className="w-full h-[60px] border border-gray-300 px-4 rounded bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors(detailName);
                }}
              />
            )}
          />
        </div>
      )}

      {(addressError || detailError) && (
        <p className="text-red-500 mt-1 ml-2">
          {String(addressError?.message || detailError?.message)}
        </p>
      )}

      {isOpen && (
        <div
          ref={wrapRef}
          className="border w-full h-[300px] relative mt-3 bg-white"
          style={{ zIndex: 10 }}
        >
          <img
            src="//t1.daumcdn.net/postcode/resource/images/close.png"
            onClick={handleClose}
            alt="접기 버튼"
            className="absolute right-0 top-[-10px] cursor-pointer z-10"
          />
        </div>
      )}
    </div>
  );
}
