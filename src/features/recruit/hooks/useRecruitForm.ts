import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recruitFormSchema, RecruitFormSchema } from "../schemas/recruitSchema";

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
