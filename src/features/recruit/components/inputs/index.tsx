import { Heading } from "@/components/ui/Heading";
import { FieldError } from "react-hook-form";
import { ERROR_TEXT_CLASS, FIELD_WRAPPER_CLASS, LABEL_CLASS } from "../../constants/classNames";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  error?: FieldError | FieldError[];
};

export function FormField({ label, children, error }: FormFieldProps) {
  return (
    <div className={FIELD_WRAPPER_CLASS}>
      <label className={LABEL_CLASS}>{label}</label>
      <div className="relative flex flex-col w-full">
        {error && <ErrorMessage error={Array.isArray(error) ? error[0] : error} />}
        {children}
      </div>
    </div>
  );
}

export function ErrorMessage({ error }: { error?: FieldError }) {
  return error ? <p className={ERROR_TEXT_CLASS}>{error.message}</p> : null;
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="text-primary font-bold mt-3">
      <Heading sizeOffset={3}>{title}</Heading>
    </div>
  );
}
