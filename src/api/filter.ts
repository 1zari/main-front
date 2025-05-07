import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";

export type SearchJobRequest = {
  city?: string[];
  district?: string[];
  town?: string[];
  work_day?: string[];
  posting_types?: string;
  employment_type?: string;
  education?: string;
  search?: string;
  job_keyword_main?: string[];
  job_keyword_sub?: string[];
};

export type RegionResponse = Record<string, Record<string, string[]>>;

type Town = {
  name: string;
};

type District = {
  name: string;
  towns: Town[];
};

type Region = {
  name: string;
  districts: District[];
};

export type SubCategory = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  children: SubCategory[];
};



export const filterApi = {
  getSearchJobList: () => {
    return fetcher.get<Category[]>(API_ENDPOINTS.JOB_FILTER.CATEGORY);
  },
  getLocationList: async () => {
    const raw = await fetcher.get<Region[]>(API_ENDPOINTS.JOB_FILTER.LOCATION);

    const parsedRegions: RegionResponse = {};
    raw.forEach((region) => {
      const regionName = region.name;
      parsedRegions[regionName] = {};

      region.districts.forEach((district) => {
        const districtName = district.name;
        parsedRegions[regionName][districtName] = district.towns.map((town) => town.name);
      });
    });

    return parsedRegions;
  },
};

