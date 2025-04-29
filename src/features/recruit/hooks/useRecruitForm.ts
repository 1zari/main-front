import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { recruitFormSchema, RecruitFormSchema } from "../schemas/jobPostSchema";

export function useRecruitForm() {
  return useForm<RecruitFormSchema>({
    resolver: zodResolver(recruitFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      workPlace: "",
      payType: "",
      payAmount: "",
      employeeType: "",
      careerType: "",
      educationType: "",
      workDays: [],
      workDaysNegotiable: false,
      workTimeNegotiable: false,
      volume: "",
      deadline: undefined,
      summary: "",
      selectJobs: [],
      textArea: "",
      agreement: false,
      workStartTime: "",
      workEndTime: "",
    },
  });
}
