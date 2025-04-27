"use client";

interface SubmitProps {
  disabled: boolean;
  mode: "new" | "edit";
}

const SubmitButton = ({ disabled, mode }: SubmitProps) => {
  return (
    <button
      type="submit"
      className={`w-full py-2 rounded-md text-sm transition-colors ${
        disabled
          ? "bg-gray-300 text-white cursor-not-allowed"
          : "bg-[#0F8C3B] text-white hover:bg-[#0e7b33]"
      }`}
      disabled={disabled}
    >
      {mode === "new" ? "채용공고 등록" : "채용공고 수정"}
    </button>
  );
};

export default SubmitButton;
