import { fetcher } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import type {
  CreateResumeRequestDto,
  UpdateResumeRequestDto,
  ResumeResponseDto,
  ResumeListResponseDto,
} from "@/types/api/resume";

export const resumeApi = {
  // 개인회원 이력서 목록 조회
  getList: (accessToken: string) =>
    fetcher.get<ResumeListResponseDto>(API_ENDPOINTS.RESUME.LIST, {
      secure: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  // 개인회원 이력서 상세 조회
  getDetail: (id: string, accessToken: string) =>
    fetcher.get<ResumeResponseDto>(API_ENDPOINTS.RESUME.DETAIL(id), {
      secure: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  // 개인회원 이력서 생성
  create: async (data: CreateResumeRequestDto, accessToken: string) => {
    await fetcher.get(API_ENDPOINTS.CSRF, {
      secure: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return fetcher.post<ResumeResponseDto>(API_ENDPOINTS.RESUME.LIST, data, {
      secure: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  // 개인회원 이력서 수정
  update: async (id: string, data: UpdateResumeRequestDto, accessToken: string) => {
    await fetcher.get(API_ENDPOINTS.CSRF, {
      secure: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return fetcher.patch<ResumeResponseDto>(API_ENDPOINTS.RESUME.UPDATE(id), data, {
      secure: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  // 개인회원 이력서 삭제
  delete: async (id: string, accessToken: string) => {
    await fetcher.get(API_ENDPOINTS.CSRF, {
      secure: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return fetcher.delete<{ message: string }>(
      API_ENDPOINTS.RESUME.DELETE(id),
      undefined, // body 없음
      {
        secure: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },
};
