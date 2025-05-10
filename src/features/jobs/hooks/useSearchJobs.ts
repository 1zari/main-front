import useFiltersStore from "@/features/jobs/components/filter/stores/useFiltersStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";
import { useState } from "react";

type SearchJobResult = {
  job_posting_id: string;
  company_id: string;
  job_posting_title: string;
  address: string;
  city: string;
  district: string;
  town: string;
  work_day: string[];
  posting_type: string;
  employment_type: string;
  education: string;
  description?: string;
  [key: string]: string | number | string[] | undefined; // 가능한 필드 타입으로 제한
};

export function useSearchJobs() {
  const { city, district, towns, selectedDays, employmentType, educations } = useFiltersStore();
  const [result, setResult] = useState<SearchJobResult[] | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search/`, {
        params: {
          city: city?.id,
          district: district?.id,
          town: towns.map((town) => town.id),
          work_day: selectedDays,
          posting_types: false,
          employment_type: employmentType,
          education: educations,
          search: "",
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  return {
    result,
    isLoading: mutation.isPending,
    error: mutation.error,
    search: mutation.mutate, // 검색 실행 함수
  };
}
