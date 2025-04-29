import { FormField } from "@/features/recruit/components/inputs";
import { JobCategoryCheckboxGroup } from "@/features/recruit/components/inputs/JobCategoryCheckboxGroup";
import { INPUT_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { useState } from "react";
import { FieldError, Merge, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FaCaretDown } from "react-icons/fa";

export function OccupationInput({
  register,
  error,
  setValue,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: Merge<FieldError, FieldError[]>;
  setValue: UseFormSetValue<JobPostFormValues>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [checkedJobs, setCheckedJobs] = useState<string[]>([]);

  return (
    <FormField label="직종" error={error as FieldError}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${INPUT_CLASS} text-left flex space-between items-center gap-3 `}
        onBlur={(e) => {
          setValue("occupation", checkedJobs, { shouldValidate: true });
        }}
      >
        직종 선택하기
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <FaCaretDown />
        </span>
      </button>

      {isOpen && (
        <JobCategoryCheckboxGroup
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          checkedJobs={checkedJobs}
          setCheckedJobs={(jobs) => {
            setValue("occupation", jobs, { shouldValidate: true });
            setCheckedJobs(jobs);
          }}
        />
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedFilters.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
          >
            <span>{filter}</span>
            <button
              type="button"
              onClick={() => {
                setSelectedFilters((prev) => prev.filter((item) => item !== filter));
                setCheckedJobs((prev) => prev.filter((item) => item !== filter));
              }}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {/* <input type="hidden" {...register("occupation", { value: checkedJobs })} /> */}
    </FormField>
  );
}
