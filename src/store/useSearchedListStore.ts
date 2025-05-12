import type { JobPostsListResponseDto } from "@/types/api/job";
import { create } from "zustand";

type SearchJobResult = JobPostsListResponseDto["data"][number];

interface SearchedListStore {
  searchedList: SearchJobResult[] | null;
  setSearchedList: (list: SearchJobResult[]) => void;
}

const useSearchedListStore = create<SearchedListStore>((set) => ({
  searchedList: null,
  setSearchedList: (list) => set({ searchedList: list }),
}));

export default useSearchedListStore;
