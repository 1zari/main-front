import { useSelectedFilterStore } from "@/features/jobs/stores/job-filters/useSelectedFiltersStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export function useSearchJobs() {
  const selectedFilters = useSelectedFilterStore();
  const [result, setResult] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get("https://senior-naeil.life/api/search/", {
        q: {
          city: selectedFilters.locationChecked,
          district: [],
          town: [],
          work_day: selectedFilters.selectedDays,
          posting_types: selectedFilters.checkedJobs[0] || "",
          employment_type: selectedFilters.employmentType,
          education: selectedFilters.education,
          search: selectedFilters.searchKeyword,
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
    isLoading: mutation.isLoading,
    error: mutation.error,
    search: mutation.mutate, // 검색 실행 함수
  };
}
