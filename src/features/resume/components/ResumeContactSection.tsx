import { Heading } from "@/components/ui/Heading";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";

interface ResumeContactSectionProps {
  name: string;
  phone: string;
  email: string;
}

export default function ResumeContactSection({ name, phone, email }: ResumeContactSectionProps) {
  return (
    <>
      <div className="flex flex-col justify-start pb-2 gap-5  items-start">
        <Heading sizeOffset={4} className="font-bold min-w-30">
          {name}
        </Heading>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-wrap gap-3 items-center">
            <FaPhone className="m-2 text-gray-400" />
            <div>{phone}</div>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <AiOutlineMail className="m-2 text-gray-400" />
            <div>{email}</div>
          </div>
        </div>
      </div>
    </>
  );
}
