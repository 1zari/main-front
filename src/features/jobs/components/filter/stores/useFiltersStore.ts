import { Category, City, District, SubCategory, Town } from "@/api/filter";
import { create } from "zustand";

export interface JobCat extends SubCategory {
  parent: {
    id: string;
    name: string;
  };
}

export interface AllTown extends Town {
  district: {
    id: string;
    name: string;
  };
  city: {
    id: string;
    name: string;
  };
}

interface LocationFiltersState {
  // 2025.6.9 수정/안) 멀티 지역 선택 지원 - 배열로 변경
  cities: City[];
  setCities: (cities: City[]) => void;
  addCity: (city: City) => void;
  removeCity: (cityId: string) => void;
  // 2025.6.9 수정/안) 가장 최근 선택된 지역 추적 - 구 섹션에 해당 지역 구만 표시하기 위함
  lastSelectedCity?: City;
  setLastSelectedCity: (city?: City) => void;
  districts: District[];
  setDistricts: (districts: District[]) => void;
  addDistrict: (district: District) => void;
  removeDistrict: (districtId: string) => void;
  towns: AllTown[];
  setTowns: (towns: AllTown[]) => void;
}

interface JobCategoryFilterState {
  cat?: Category;
  setCat: (category: Category) => void;
  jobCats?: JobCat[];
  setJobCats: (jobCats: JobCat[]) => void;
}

export type EmploymentType = "정규직" | "계약직" | "무관";

export type WorkExperienceType = "경력" | "무관";
export type PostingType = "기업" | "공공";

export type EducationType = "고졸" | "대졸이상" | "무관";

export type DayType = "월" | "화" | "수" | "목" | "금" | "토" | "일";

interface ConditionFilterState {
  employmentType: EmploymentType | undefined;
  setEmploymentType: (employmentType: EmploymentType | undefined) => void;

  workExperiences: WorkExperienceType[];
  setWorkExperiences: (workExperiences: WorkExperienceType[]) => void;

  educations: EducationType[];
  setEducations: (educations: EducationType[]) => void;

  selectedDays: string[];
  setSelectedDays: (selectedDays: string[]) => void;

  dayNegotiable: boolean;
  setDayNegotiable: (dayNegotiable: boolean) => void;

  postingType?: PostingType;
  setPostingType: (postingType: PostingType | undefined) => void;
}

const useFiltersStore = create<
  LocationFiltersState & JobCategoryFilterState & ConditionFilterState
>((set) => {
  // Initialize the store with default values
  return {
    // Location Filter
    // 2025.6.9 수정/안) 멀티 지역 선택 지원 - 배열로 변경
    cities: [],
    setCities: (cities: City[]) => set({ cities }),
    addCity: (city: City) =>
      set((state) => ({
        cities: state.cities.some((c) => c.id === city.id) ? state.cities : [...state.cities, city],
      })),
    removeCity: (cityId: string) =>
      set((state) => ({
        cities: state.cities.filter((c) => c.id !== cityId),
      })),
    // 2025.6.9 수정/안) 가장 최근 선택된 지역 추적 - 구 섹션에 해당 지역 구만 표시하기 위함
    lastSelectedCity: undefined,
    setLastSelectedCity: (city?: City) => set({ lastSelectedCity: city }),
    districts: [],
    setDistricts: (districts: District[]) => set({ districts }),
    addDistrict: (district: District) =>
      set((state) => ({
        districts: state.districts.some((d) => d.id === district.id)
          ? state.districts
          : [...state.districts, district],
      })),
    removeDistrict: (districtId: string) =>
      set((state) => ({
        districts: state.districts.filter((d) => d.id !== districtId),
      })),
    towns: [],
    setTowns: (towns: AllTown[]) => set({ towns }),
    // 직종
    // 대분류, 중분류
    cat: undefined,
    setCat: (category: Category) => set({ cat: category }),
    jobCats: [],
    setJobCats: (jobCats: JobCat[]) => set({ jobCats }),
    //
    // Condition Filter
    // 고용형태
    employmentType: undefined,
    setEmploymentType: (employmentType: EmploymentType | undefined) => set({ employmentType }),

    // 경력
    workExperiences: [],
    setWorkExperiences: (workExperiences: WorkExperienceType[]) => set({ workExperiences }),

    // 학력
    educations: [],
    setEducations: (educations: EducationType[]) => set({ educations }),

    // 요일
    selectedDays: [],
    setSelectedDays: (selectedDays: string[]) => set({ selectedDays }),
    // 요일 협의
    dayNegotiable: false,
    setDayNegotiable: (dayNegotiable: boolean) => set({ dayNegotiable }),
    //공공일자리
    postingType: undefined,
    setPostingType: (postingType: PostingType | undefined) => set({ postingType }),
  };
});

export default useFiltersStore;
