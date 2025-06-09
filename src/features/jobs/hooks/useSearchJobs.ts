import useFiltersStore from "@/features/jobs/components/filter/stores/useFiltersStore";
import useSearchedListStore from "@/store/useSearchedListStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
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
  cat?: string[];
  jobCats?: string[];
  work_experience?: string[];
  [key: string]: string | number | string[] | undefined; // 가능한 필드 타입으로 제한
};

export function useSearchJobs() {
  const {
    cities,
    districts,
    towns,
    selectedDays,
    employmentType,
    educations,
    cat,
    jobCats,
    workExperiences,
    dayNegotiable,
    postingType,
  } = useFiltersStore();
  const [result, setResult] = useState<SearchJobResult[] | null>(null);

  const { setSearchedList } = useSearchedListStore();
  const router = useRouter();
  const pathname = usePathname();
  const mutation = useMutation({
    mutationFn: async ({ searchKeyword }: { searchKeyword: string }) => {
      const locationParams: { [key: string]: string[] } = {};

      if (towns.length > 0) {
        locationParams.town_no = towns.map((town) => town.id);
      } else {
        if (districts.length > 0) {
          locationParams.district_no = districts.map((district) => district.id);
        }
        const citiesWithoutDistricts = cities.filter(
          (city) => !districts.some((d) => city.districts.some((cd) => cd.id === d.id)),
        );
        if (citiesWithoutDistricts.length > 0) {
          locationParams.city_no = citiesWithoutDistricts.map((city) => city.id);
        }
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search/`, {
        params: {
          ...locationParams,
          work_day: selectedDays,
          posting_type: postingType,
          employment_type: employmentType,
          education: educations,
          job_keyword_main: cat?.name,
          job_keyword_sub: jobCats?.map((cat) => cat?.name).filter(Boolean),
          search: searchKeyword,
          work_experience: workExperiences,
          ...(dayNegotiable ? { day_discussion: true } : {}),
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setResult(data.data);
      setSearchedList(data);
      if (pathname !== "/jobs/searched") {
        router.push("/jobs/searched");
      }
    },
  });

  return {
    result,
    isLoading: mutation.isPending,
    error: mutation.error,
    search: (keyword: string) => mutation.mutate({ searchKeyword: keyword }),
  };
}
