import type { JobPostsListResponseDto } from "@/types/api/job";
import { create } from "zustand";

interface SearchedListStore {
  searchedList: JobPostsListResponseDto | null;
  setSearchedList: (data: JobPostsListResponseDto) => void;
}

const useSearchedListStore = create<SearchedListStore>((set) => ({
  searchedList: null,
  setSearchedList: (data) => set({ searchedList: data }),
}));

export default useSearchedListStore;
