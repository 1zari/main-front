import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeFormData } from "../validation/resumeSchema";
import { useCallback, useRef } from "react";

export default function useExperienceField() {
  const { control } = useFormContext<ResumeFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const lastAddedItemRef = useRef<HTMLDivElement>(null);

  const handleAdd = useCallback(() => {
    append({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    });

    setTimeout(() => {
      const newItemIndex = fields.length;
      const newItemElement = document.querySelector(
        `[aria-label="${newItemIndex + 1}번째 경력 정보"]`,
      ) as HTMLElement;
      if (newItemElement) {
        newItemElement.focus();
        const statusElement = document.getElementById("experiences-status");
        if (statusElement) {
          statusElement.textContent = `새로운 경력 항목이 추가되었습니다. 현재 ${newItemIndex + 1}개의 경력이 등록되어 있습니다.`;
        }
      }
    }, 100);
  }, [append, fields.length]);

  const handleRemove = useCallback(
    (index: number) => {
      remove(index);

      setTimeout(() => {
        const remainingCount = fields.length - 1;
        if (remainingCount === 0) {
          addButtonRef.current?.focus();
        } else {
          const focusIndex = Math.min(index, remainingCount - 1);
          const targetElement = document.querySelector(
            `[aria-label="${focusIndex + 1}번째 경력 정보"]`,
          ) as HTMLElement;
          if (targetElement) {
            targetElement.focus();
          } else {
            addButtonRef.current?.focus();
          }
        }

        const statusElement = document.getElementById("experiences-status");
        if (statusElement) {
          statusElement.textContent =
            remainingCount === 0
              ? "경력 항목이 삭제되었습니다. 경력 사항이 없습니다."
              : `경력 항목이 삭제되었습니다. 현재 ${remainingCount}개의 경력이 등록되어 있습니다.`;
        }
      }, 100);
    },
    [remove, fields.length],
  );

  const isEmpty = fields.length === 0;

  return {
    fields,
    handleAdd,
    handleRemove,
    isEmpty,
    addButtonRef,
    lastAddedItemRef,
  };
}
