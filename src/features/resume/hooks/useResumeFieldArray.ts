import { useFieldArray, Control } from "react-hook-form";
import { useCallback } from "react";
import { ResumeFormData } from "@/features/resume/validation/resumeSchema";
import { ExperienceFormData, CertificationFormData } from "@/features/resume/types";

export function useExperienceFieldArray(control: Control<ResumeFormData>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const handleAdd = useCallback(() => {
    const newExperience: ExperienceFormData = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    };
    append(newExperience);
  }, [append]);

  return {
    fields,
    handleAdd,
    remove,
    isEmpty: fields.length === 0,
  };
}

export function useCertificationFieldArray(control: Control<ResumeFormData>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const handleAdd = useCallback(() => {
    const newCertification: CertificationFormData = {
      name: "",
      issuer: "",
      date: "",
    };
    append(newCertification);
  }, [append]);

  return {
    fields,
    handleAdd,
    remove,
    isEmpty: fields.length === 0,
  };
}
