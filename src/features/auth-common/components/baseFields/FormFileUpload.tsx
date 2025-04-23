"use client";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { useState } from "react";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  disabled?: boolean;
  value?: string;
};

export default function FormFileUpload<T extends FieldValues>({ name, label, disabled }: Props<T>) {
  const { register, setError, clearErrors, formState } = useFormContext<T>();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files ?? [];

    if (!file) {
      setFileName("");
      setError(name, {
        type: "manual",
        message: "파일을 첨부해주세요.",
      });
      return;
    }

    setFileName(file.name);

    const hasValidExtension = /\.[^/.]+$/.test(file.name);
    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];

    if (!hasValidExtension) {
      setError(name, {
        type: "manual",
        message: "파일 이름에 확장자가 포함되어야 합니다.",
      });
    } else if (!validTypes.includes(file.type)) {
      setError(name, {
        type: "manual",
        message: "PNG, JPG, SVG 형식만 가능합니다.",
      });
    } else if (file.size > 1 * 1024 * 1024) {
      setError(name, {
        type: "manual",
        message: "파일 크기는 1MB 이하여야 합니다.",
      });
    } else {
      clearErrors(name);
    }
  };

  const error = formState.errors?.[name] as { message?: string } | undefined;

  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg whitespace-normal break-keep">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
        <label
          htmlFor={name}
          className="w-full sm:w-auto h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition flex items-center justify-center cursor-pointer text-center whitespace-nowrap"
        >
          파일 선택
        </label>

        <input
          id={name}
          type="file"
          className="hidden"
          ref={register(name).ref}
          onChange={(e) => {
            register(name).onChange(e);
            handleFileChange(e);
          }}
          disabled={disabled}
        />

        <input
          type="text"
          readOnly
          value={fileName || "파일을 첨부해주세요"}
          className="flex-1 h-[60px] border border-gray-300 rounded px-4 bg-gray-50 text-gray-400 placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
        />
      </div>

      {error && <p className="text-red-500 mt-1 ml-2">{String(error)}</p>}
    </div>
  );
}
