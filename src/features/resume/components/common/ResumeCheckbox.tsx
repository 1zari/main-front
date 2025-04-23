// common/ResumeCheckbox.tsx

import { UseFormRegister } from "react-hook-form";

interface ResumeCheckboxProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  [x: string]: any;
}

const ResumeCheckbox = ({ label, name, register, ...rest }: ResumeCheckboxProps) => (
  <label className="inline-flex items-center mt-2">
    <input type="checkbox" {...register(name)} {...rest} className="mr-2" />
    {label}
  </label>
);

export default ResumeCheckbox;


