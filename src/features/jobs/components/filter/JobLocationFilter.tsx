"use client";

import { City, District, filterApi, Town } from "@/api/filter";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import useFiltersStore, { AllTown } from "./stores/useFiltersStore";

/**
 * 도,시 (경기도, 서울특별시 등) 컴포넌트
 */
function CityComponent({
  cities,
  selectedCities,
  onCityClick,
}: {
  cities: City[];
  selectedCities: City[];
  onCityClick: (city: City) => void;
}) {
  return (
    <div className="w-60 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
      {cities.map((city) => (
        <div
          key={city.id}
          className={`p-2 cursor-pointer ${
            selectedCities.some((c) => c.id === city.id) ? "text-green-700 font-bold" : ""
          }`}
          onClick={() => onCityClick(city)}
        >
          {city.name} &rsaquo;
        </div>
      ))}
    </div>
  );
}

/**
 * DistrictComponent는 특정 지역의 동을 표시하는 컴포넌트입니다.
 * 추가적인 기능이 필요할 경우 구현할 수 있습니다.
 */
function DistrictComponent({
  districts,
  selectedDistricts,
  onDistrictClick,
  currentCity,
}: {
  districts: District[];
  selectedDistricts: District[];
  onDistrictClick: (district: District) => void;
  currentCity?: City;
}) {
  return (
    <div className="w-60 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
      {/* 2025.6.9 수정/안) 현재 선택된 지역의 전체 옵션과 구 목록 표시 */}
      {currentCity ? (
        <>
          <div
            className="p-2 cursor-pointer text-primary font-semibold border-b"
            onClick={() =>
              onDistrictClick({
                id: currentCity.id,
                name: `${currentCity.name} 전체`,
                towns: [],
              } as District)
            }
          >
            {currentCity.name} 전체 &rsaquo;
          </div>
          {districts.map((d) => (
            <div
              key={d.id}
              className={`p-2 cursor-pointer pl-4 ${
                selectedDistricts.some((sd) => sd.id === d.id) ? "text-green-700 font-bold" : ""
              }`}
              onClick={() => onDistrictClick(d)}
            >
              {d.name} &rsaquo;
            </div>
          ))}
        </>
      ) : (
        <div className="p-4 text-gray-500">지역을 먼저 선택해주세요.</div>
      )}
    </div>
  );
}

function TownComponent({
  towns,
  checkedTowns,
  onHandleTownClick,
}: {
  towns: Town[];
  checkedTowns: Town[];
  onHandleTownClick: (town: Town) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3 p-4 w-full max-h-80 h-full overflow-y-auto">
      {towns.map((dong) => (
        <label key={dong.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedTowns.some((town) => town.id === dong.id)}
            onChange={() => onHandleTownClick(dong)}
          />
          {dong.name}
        </label>
      ))}
    </div>
  );
}

function CloseButton({ open, setOpen }: { open: boolean; setOpen: (show: boolean) => void }) {
  return (
    <div className="border flex justify-center rounded-md rounded-t-none py-2">
      <button className="flex items-center " onClick={() => setOpen(!open)}>
        닫기
        <span className="px-2">
          <FaCaretUp />
        </span>
      </button>
    </div>
  );
}

interface JobLocationFilterProps {
  open: boolean;
  setOpen: (show: boolean) => void;
}

export default function JobLocationFilter({ open, setOpen }: JobLocationFilterProps) {
  const { data: cities = [], isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: () => filterApi.getLocationList(),
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });

  // 2025.6.9 수정/안) 멀티 지역 선택 지원 - 배열로 변경
  const {
    towns,
    setTowns,
    districts,
    addDistrict,
    removeDistrict,
    cities: selectedCities,
    addCity,
    removeCity,
    // 2025.6.9 수정/안) 가장 최근 선택된 지역 추적
    lastSelectedCity,
    setLastSelectedCity,
  } = useFiltersStore();

  const [checkedTowns, setCheckedTowns] = useState<AllTown[]>(towns as AllTown[]);

  const handleCityClick = (city: City) => {
    // 2025.6.9 수정/안) 지역 클릭 시 누적 선택 또는 제거
    const isSelected = selectedCities.some((c) => c.id === city.id);
    if (isSelected) {
      removeCity(city.id);
      // 해당 지역의 구/동도 제거
      const cityDistricts = districts.filter((d) => city.districts.some((cd) => cd.id === d.id));
      cityDistricts.forEach((d) => removeDistrict(d.id));
      // 2025.6.9 수정/안) 제거된 지역이 마지막 선택 지역이었다면 다른 지역으로 변경
      if (lastSelectedCity?.id === city.id) {
        const remainingCities = selectedCities.filter((c) => c.id !== city.id);
        setLastSelectedCity(
          remainingCities.length > 0 ? remainingCities[remainingCities.length - 1] : undefined,
        );
      }
    } else {
      addCity(city);
      // 2025.6.9 수정/안) 새로 선택된 지역을 최근 선택 지역으로 설정
      setLastSelectedCity(city);
    }
  };

  const handleDistrictClick = (district: District) => {
    // 2025.6.9 수정/안) 구 클릭 시 누적 선택 또는 제거
    const isSelected = districts.some((d) => d.id === district.id);
    if (isSelected) {
      removeDistrict(district.id);
    } else {
      addDistrict(district);
    }
    // 구 선택 시 동을 초기화
    setTowns([]);
    setCheckedTowns([]);
  };

  // 2025.6.9 수정/안) 가장 최근 선택된 지역의 구만 표시 (UX 개선)
  const displayDistricts = lastSelectedCity ? lastSelectedCity.districts : [];

  // 2025.6.9 수정/안) 선택된 구가 있는 경우만 동 목록 표시
  const selectedDistrictsForTowns = districts.filter((d) => d.towns && d.towns.length > 0);
  const availableTowns = selectedDistrictsForTowns.flatMap((d) => d.towns);

  React.useEffect(() => {
    // towns와 checkedTowns가 다를 때만 set
    if (
      towns.length !== checkedTowns.length ||
      towns.some((t, i) => t.id !== checkedTowns[i]?.id)
    ) {
      setCheckedTowns(towns);
    }
  }, [towns]);

  React.useEffect(() => {
    // checkedTowns와 towns가 다를 때만 set
    if (
      checkedTowns.length !== towns.length ||
      checkedTowns.some((t, i) => t.id !== towns[i]?.id)
    ) {
      setTowns(checkedTowns);
    }
  }, [checkedTowns]);

  if (isLoading) {
    return <div className="p-4">지역 정보를 불러오는 중...</div>;
  }

  return (
    <>
      <div className="flex border border-b-0 bg-white overflow-hidden">
        {/* 시군구 */}
        <CityComponent
          cities={cities}
          selectedCities={selectedCities}
          onCityClick={handleCityClick}
        />

        {/* 구 - 2025.6.9 수정/안) 최근 선택된 지역의 구만 표시 */}
        <DistrictComponent
          districts={displayDistricts}
          selectedDistricts={districts}
          onDistrictClick={handleDistrictClick}
          currentCity={lastSelectedCity}
        />

        {/* 동 */}
        {/* 2025.6.9 수정/안) 선택된 구가 있을 때만 동 목록 표시 */}
        {selectedDistrictsForTowns.length > 0 ? (
          <TownComponent
            towns={availableTowns}
            checkedTowns={checkedTowns}
            onHandleTownClick={(town) => {
              setCheckedTowns((prev) => {
                // 이미 체크되어있는지 확인
                const isChecked = prev.some((t) => t.id === town.id);
                if (isChecked) {
                  // 만약에 체크 되어있다면 체크 해제
                  return prev.filter((t) => t.id !== town.id);
                } else {
                  // 해당 동이 속한 구와 지역 정보 찾기
                  const parentDistrict = selectedDistrictsForTowns.find((d) =>
                    d.towns.some((t) => t.id === town.id),
                  );
                  const parentCity = selectedCities.find((c) =>
                    c.districts.some((d) => d.id === parentDistrict?.id),
                  );

                  return [
                    ...prev,
                    {
                      ...town,
                      district: {
                        id: parentDistrict?.id || "",
                        name: parentDistrict?.name || "",
                      },
                      city: {
                        id: parentCity?.id || "",
                        name: parentCity?.name || "",
                      },
                    },
                  ];
                }
              });
            }}
          />
        ) : (
          <div className="w-full p-4 flex items-center justify-center text-gray-500">
            {selectedCities.length === 0
              ? "지역을 선택해주세요."
              : lastSelectedCity
                ? "구/군을 선택하면 세부 지역을 선택할 수 있습니다."
                : "지역을 선택해주세요."}
          </div>
        )}
      </div>
      <CloseButton open={open} setOpen={setOpen} />
    </>
  );
}
