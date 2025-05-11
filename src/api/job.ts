import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { fetcher } from "@/lib/fetcher";
import type {
  AddBookmarkRequestDto,
  DeleteJobPostResponseDto,
  JobPostDetailResponseDto,
  JobPostRequestDto,
  JobPostResponseDto,
  JobPostsListResponseDto,
  UpdateJobPostRequestDto,
  UpdateJobPostResponseDto,
} from "@/types/api/job";

// 채용공고 리스트 조회
export const jobPostApi = {
  getJobPostList: (page: number) => {
    const query = `?page=${page}`;
    return fetcher.get<JobPostsListResponseDto>(`${API_ENDPOINTS.JOB_POST.LIST}${query}`);
  },

  getJobPostDetail: (id: string) => {
    return fetcher.get<JobPostDetailResponseDto>(API_ENDPOINTS.JOB_POST.DETAIL(id), {
      secure: true,
    });
  },

  createJobPost: (data: JobPostRequestDto) => {
    return fetcher.post<JobPostResponseDto>(API_ENDPOINTS.JOB_POST.CREATE, data, { secure: true });
  },

  updateJobPost: (id: string, data: UpdateJobPostRequestDto) => {
    return fetcher.patch<UpdateJobPostResponseDto>(API_ENDPOINTS.JOB_POST.UPDATE(id), data, {
      secure: true,
    });
  },

  deleteJobPost: (id: string) => {
    return fetcher.delete<DeleteJobPostResponseDto>(API_ENDPOINTS.JOB_POST.DELETE(id), undefined, {
      secure: true,
    });
  },

  addBookmark: (id: string) => {
    return fetcher.post<AddBookmarkRequestDto, undefined>(
      API_ENDPOINTS.BOOKMARK.ADD(id),
      undefined,
      { secure: true },
    );
  },
  removeBookmark: (id: string) => {
    return fetcher.delete<AddBookmarkRequestDto, undefined>(
      API_ENDPOINTS.BOOKMARK.ADD(id),
      undefined,
      { secure: true },
    );
  },
};
