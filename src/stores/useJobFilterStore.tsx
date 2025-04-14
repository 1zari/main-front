import { create } from "zustand";

type FilterTabStore = {
  showLocation: boolean;
  showJobs: boolean;
  showOtherConditions: boolean;
  setShowLocation: (value: boolean) => void;
  setShowJobs: (value: boolean) => void;
  setShowOtherConditions: (value: boolean) => void;
};

export const useFilterTabStore = create<FilterTabStore>((set) => ({
  showLocation: false,
  showJobs: false,
  showOtherConditions: false,
  setShowLocation: (value) =>
    set(() => ({
      showLocation: value,
      showJobs: false,
      showOtherConditions: false,
    })),
  setShowJobs: (value) =>
    set(() => ({
      showJobs: value,
      showLocation: false,
      showOtherConditions: false,
    })),
  setShowOtherConditions: (value) =>
    set(() => ({
      showOtherConditions: value,
      showLocation: false,
      showJobs: false,
    })),
}));

type FilterSelectedStore = {
  selectedFilters: string[];
  addSelectedFilter: (filter: string) => void;
  removeSelectedFilter: (filter: string) => void;
  clearSelectedFilters: () => void;
  locationChecked: string[];
  setLocationChecked: (value: string[]) => void;
  checkedJobs: string[];
  setCheckedJobs: (value: string[]) => void;
  selectedDays: string[];
  setSelectedDays: (value: string[]) => void;
  dayNegotiable: boolean;
  setDayNegotiable: (value: boolean) => void;
  toggleDay: (day: string) => void; // Added toggleDay function signature
  toggleDistrict: (district: string, selectedRegion: string, checkedDistricts: string[], setCheckedDistricts: (value: string[]) => void) => void; // Added toggleDistrict function signature
};

export const useSelectedFilterStore = create<FilterSelectedStore>((set) => ({
  selectedFilters: [],
  addSelectedFilter: (filter) =>
    set((state) => ({
      selectedFilters: [...state.selectedFilters, filter],
    })),
  removeSelectedFilter: (filter) => {
    set((state) => ({
      selectedFilters: state.selectedFilters.filter((f) => f !== filter),
    }));
    // 지역 필터 제거 처리
    if (filter.includes(":")) {
      const [region] = filter.split(":");
      const rest = useSelectedFilterStore.getState().selectedFilters.filter(f => !f.startsWith(`${region}:`));
      const updatedLocationChecked = useSelectedFilterStore.getState().locationChecked.filter(d => !filter.includes(d));
      useSelectedFilterStore.setState({
        locationChecked: updatedLocationChecked,
        selectedFilters: rest,
      });
    }
  },
  clearSelectedFilters: () => set({ selectedFilters: [] }),
  locationChecked: [],
  setLocationChecked: (value) => set({ locationChecked: value }),
  checkedJobs: [],
  setCheckedJobs: (value) => set({ checkedJobs: value }),
  selectedDays: [],
  setSelectedDays: (value) => set({ selectedDays: value }),
  dayNegotiable: false,
  setDayNegotiable: (value) => set({ dayNegotiable: value }),
  toggleDay: (day: string) => {
    const currentDays = useSelectedFilterStore.getState().selectedDays;
    const isSelected = currentDays.includes(day);
    const updated = isSelected
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];
    set({ selectedDays: updated });

    const label = `근무요일: ${updated.join(",")}`;
    const filters = useSelectedFilterStore.getState().selectedFilters.filter(f => !f.startsWith("근무요일:"));
    useSelectedFilterStore.setState({
      selectedFilters: updated.length > 0 ? [...filters, label] : filters,
    });
  },
  toggleDistrict: (district: string, selectedRegion: string, checkedDistricts: string[], setCheckedDistricts: (value: string[]) => void) => {
    const updated = checkedDistricts.includes(district)
      ? checkedDistricts.filter(d => d !== district)
      : [...checkedDistricts, district];
    setCheckedDistricts(updated);

    const regionDistricts = updated.filter(d => REGIONS[selectedRegion].includes(d));
    const label = `${selectedRegion}: ${regionDistricts.join(", ")}`;
    const filters = useSelectedFilterStore.getState().selectedFilters.filter(f => !f.startsWith(`${selectedRegion}:`));
    useSelectedFilterStore.setState({
      selectedFilters: regionDistricts.length > 0 ? [...filters, label] : filters,
    });
  },
}));

export const resetFilters = () => {
  useSelectedFilterStore.setState({
    selectedFilters: [],
    locationChecked: [],
    checkedJobs: [],
    selectedDays: [],
    dayNegotiable: false,
  });
};
