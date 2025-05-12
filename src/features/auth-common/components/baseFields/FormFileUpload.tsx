"use client";
import { useState } from "react";
import { useFormContext, Controller, FieldValues, Path } from "react-hook-form";
import { CircleX } from "lucide-react";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  disabled?: boolean;
};

export default function FormFileUpload<T extends FieldValues>({ name, label, disabled }: Props<T>) {
  const {
    control,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext<T>();

  const [fileName, setFileName] = useState("");

  const handleRemoveFile = (onChange: (value: File[] | null) => void) => {
    setFileName("");
    clearErrors(name);
    onChange(null);
    const input = document.getElementById(name) as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleFileValidation = (file: File, onChange: (value: File[]) => void): void => {
    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    const hasValidExtension = /\.[^/.]+$/.test(file.name);

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
      setFileName(file.name);
      onChange([file]);
      clearErrors(name);
      trigger(name);
    }
  };

  const error = errors?.[name] as { message?: string } | undefined;

  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg whitespace-normal break-keep">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{ required: "파일은 필수 항목입니다." }}
        render={({ field: { onChange } }) => (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
              <label
                htmlFor={name}
                className="w-full sm:w-auto h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition flex items-center justify-center cursor-pointer text-center whitespace-nowrap"
                onClick={(e) => {
                  if (fileName) {
                    e.preventDefault();
                    setError(name, {
                      type: "manual",
                      message: "파일은 1개만 등록 가능합니다. 기존 파일을 삭제해주세요.",
                    });
                  }
                }}
              >
                파일 선택
              </label>

              <input
                id={name}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const [file] = e.target.files ?? [];
                  if (!file) return;

                  if (fileName) {
                    setError(name, {
                      type: "manual",
                      message: "파일은 1개만 등록 가능합니다. 기존 파일을 삭제해주세요.",
                    });
                    e.target.value = "";
                    return;
                  }

                  handleFileValidation(file, onChange);
                }}
                disabled={disabled}
              />

              <div className="relative flex-1">
                <input
                  type="text"
                  readOnly
                  value={fileName || "파일을 첨부해주세요"}
                  className="w-full h-[60px] border border-gray-300 rounded px-4 pr-12 bg-gray-50 text-gray-400 placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
                />
                {fileName && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(onChange)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-red-400 hover:text-red-600"
                  >
                    <CircleX size={24} strokeWidth={1.8} />
                  </button>
                )}
              </div>
            </div>
            {error?.message && <p className="text-red-500 mt-1 ml-2">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
}
