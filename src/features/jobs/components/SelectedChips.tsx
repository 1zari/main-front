"use client";

import { Category } from "@/api/filter";
import useFiltersStore from "@/features/jobs/components/filter/stores/useFiltersStore";
import { useSearchJobs } from "@/features/jobs/hooks/useSearchJobs";

import { IoMdRefresh } from "react-icons/io";

export default function SelectedChips() {
  const {
    // 2025.6.9 수정/안) 멀티 지역 선택 지원 - 배열로 변경
    cities,
    setCities,
    removeCity,
    districts,
    setDistricts,
    removeDistrict,
    towns,
    setTowns,
    setCat,
    jobCats,
    setJobCats,
    // 고용형태
    employmentType,
    setEmploymentType,
    // 경력
    workExperiences,
    setWorkExperiences,
    // 학력
    educations,
    setEducations,
    selectedDays,
    setSelectedDays,
    dayNegotiable,
    setDayNegotiable,
    setPostingType,
  } = useFiltersStore();

  // if (selectedFilters.length === 0) return null;

  const { search } = useSearchJobs();
  return (
    <>
      <div className="flex flex-wrap gap-2 my-4">
        {/* 2025.6.9 수정/안) 선택된 지역들 (구가 선택되지 않은 지역 전체) */}
        {cities.map((city) => {
          const hasDistrict = districts.some((d) => city.districts.some((cd) => cd.id === d.id));
          if (hasDistrict) return null; // 구가 선택된 지역은 여기서 표시하지 않음

          return (
            <div
              key={city.id}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">{city.name} 전체</span>
              <button
                onClick={() => removeCity(city.id)}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${city.name}`}
              >
                &times;
              </button>
            </div>
          );
        })}

        {/* 2025.6.9 수정/안) 선택된 구들 (동이 선택되지 않은 구) */}
        {districts.map((district) => {
          const hasCurrentTowns = towns.some((t) => district.towns.some((dt) => dt.id === t.id));
          if (hasCurrentTowns) return null; // 동이 선택된 구는 여기서 표시하지 않음

          // 해당 구가 속한 지역 찾기
          const parentCity = cities.find((c) => c.districts.some((cd) => cd.id === district.id));

          return (
            <div
              key={district.id}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">
                {parentCity?.name} {district.name}
              </span>
              <button
                onClick={() => removeDistrict(district.id)}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${district.name}`}
              >
                &times;
              </button>
            </div>
          );
        })}

        {/* 동까지 선택된 경우 */}
        {towns.length > 0 &&
          towns.map((town) => (
            <div
              key={town.id}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">
                {town.district.name} {town.name}
              </span>
              <button
                onClick={() => {
                  setTowns(towns.filter((t) => t.id !== town.id));
                }}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${town.name}`}
              >
                &times;
              </button>
            </div>
          ))}
        {/* // 직군 */}
        {jobCats &&
          jobCats.length > 0 &&
          jobCats.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">
                {cat.parent.name} {cat.name}
              </span>
              <button
                onClick={() => {
                  setJobCats(jobCats?.filter((c) => c.id !== cat.id) || []);
                }}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${cat.name}`}
              >
                &times;
              </button>
            </div>
          ))}
        {/* // 고용형태 */}
        {employmentType && (
          <div className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700">
            <span className="ml-1 text-sm">고용형태: {employmentType}</span>
            <button
              onClick={() => {
                setEmploymentType(undefined);
              }}
              className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
              aria-label={`Remove ${employmentType}`}
            >
              &times;
            </button>
          </div>
        )}
        {/*  경력 */}
        {workExperiences.length > 0 &&
          workExperiences.map((experience) => (
            <div
              key={experience}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">{experience}</span>
              <button
                onClick={() => {
                  setWorkExperiences(workExperiences.filter((e) => e !== experience));
                }}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${experience}`}
              >
                &times;
              </button>
            </div>
          ))}
        {/* // 학력 */}
        {educations.length > 0 &&
          educations.map((education) => (
            <div
              key={education}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">{education}</span>
              <button
                onClick={() => {
                  setEducations(educations.filter((e) => e !== education));
                }}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${education}`}
              >
                &times;
              </button>
            </div>
          ))}
        {/* // 근무요일 */}
        {selectedDays.length > 0 && (
          <div className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700">
            요일:{" "}
            {["월", "화", "수", "목", "금", "토", "일"]
              .filter((day) => selectedDays.includes(day))
              .join(", ")}
            <button
              onClick={() => {
                setSelectedDays([]);
              }}
              className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
              aria-label={`Remove ${selectedDays.join(", ")}`}
            >
              &times;
            </button>
          </div>
        )}
        {/* // 요일협의 */}
        {dayNegotiable && (
          <div className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700">
            <span className="ml-1 text-sm">요일협의</span>
            <button
              onClick={() => {
                setDayNegotiable(false);
              }}
              className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
              aria-label={`Remove 요일협의`}
            >
              &times;
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-4 mb-4">
        <button
          type="button"
          onClick={() => {
            setCities([]);
            setDistricts([]);
            setTowns([]);
            setCat(undefined as unknown as Category);
            setJobCats([]);
            setEmploymentType(undefined);
            setWorkExperiences([]);
            setEducations([]);
            setSelectedDays([]);
            setDayNegotiable(false);
            setPostingType(undefined);
          }}
          className="w-32 group flex justify-center items-center border gap-2  px-4 py-2 rounded-md text-sm text-gray-800 cursor-pointer"
        >
          <span className="group-hover:rotate-180 transform transition-transform duration-300">
            <IoMdRefresh />
          </span>
          초기화
        </button>
        <button
          onClick={() => search("")}
          className="w-44 md:w-32 grid-rows-5 bg-primary text-white  px-2 py-3 rounded-md flex justify-center items-center gap-2"
        >
          검색하기
        </button>
      </div>
    </>
  );
}
