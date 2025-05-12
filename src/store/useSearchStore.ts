import axios from "axios";
import { create } from "zustand";

interface SearchState {
  keyword: string;
  setKeyword: (value: string) => void;
  search: (url: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  keyword: "",
  setKeyword: (value) => set({ keyword: value }),
  search: async (url: string) => {
    const keyword = get().keyword;
    try {
      const response = await axios.get(url, {
        params: { search: keyword },
      });
      console.log("검색 결과:", response.data);
    } catch (error) {
      console.error("검색 실패:", error);
    }
  },
}));

export const getKeyword = () => useSearchStore.getState().keyword;
