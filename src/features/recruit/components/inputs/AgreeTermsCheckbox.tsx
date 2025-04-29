import { FormField } from "@/features/recruit/components/inputs";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

import PersonalTerms from "@/assets/terms/PersonalTerms";

export function AgreeTermsCheckbox({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <FormField label="약관동의" error={error}>
      <div className="w-full flex items-center justify-between">
        <label className="flex items-center space-x-2 gap-2">
          <input type="checkbox" {...register("agreeTerms")} className="w-6 h-6 accent-primary" />{" "}
          이용약관에 동의합니다.
        </label>
        <button type="button" onClick={handleToggle} className="text-primary hover:underline">
          {isOpen ? "내용닫기" : "내용보기"}
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 p-4 bg-gray-50 rounded border max-h-[300px] overflow-y-auto text-gray-700 whitespace-pre-line">
          <PersonalTerms />
        </div>
      )}
    </FormField>
  );
}
