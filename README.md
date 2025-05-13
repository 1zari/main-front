FE_08_김민정
mjmj2732
음성 채널에서 사용
BE_08_고영주 — 오전 2:12
넵!.. 필요하시면 불러주세요 저희 일단 내일 시연할때 쓰려면 공고데이터좀 해야하니까 준비좀 하고 있을게요!!
FE_08_김민정 — 오전 2:13
네! 알겠습니당~
FE_08_박정현 — 오전 2:18
Attempted import error: 'findCompanyEmailSchema' is not exported from '@/features/auth-company/validation/company-auth.schema' (imported as 'findCompanyEmailSchema').
Attempted import error: 'findCompanyPasswordSchema' is not exported from '@/features/auth-company/validation/company-auth.schema' (imported as 'findCompanyPasswordSchema').
Attempted import error: 'findCompanyEmailSchema' is not exported from '@/features/auth-company/validation/company-auth.schema' (imported as 'findCompanyEmailSchema').
Attempted import error: 'findCompanyPasswordSchema' is not exported from '@/features/auth-company/validation/company-auth.schema' (imported as 'findCompanyPasswordSchema').
---
src/app/[type]/mypage/[userId]/resume/page.tsx
Type error: Type 'ResumeListPageProps' does not satisfy the constraint 'PageProps'.
  Types of property 'params' are incompatible.
    Type '{ type: string; userId: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
Next.js build worker exited with code: 1 and signal: null
FE_08_박정현 — 오전 2:32
---
src/app/api/auth/[...nextauth]/route.ts
Type error: Route "src/app/api/auth/[...nextauth]/route.ts" does not match the required types of a Next.js Route.
FE_08_박정현 — 오전 10:15
https://senior-tomorrow.kro.kr/
시니어내일
시니어를 위한 채용 플랫폼
FE_08_김민정 — 오전 10:20
## 📖 프로젝트 소개

> 시니어내일은 5060 퇴직자 및 중장년층 구직를 위한 서비스
시니어 맞춤형 일자리 추천 알고리즘을 통해 다양한 채용공고를 접하고간편이력서를 통해 지원까지 보다 쉽게 사용 가능한 반응형 웹 💚
---
## :link: 배포 링크
확장
message.txt
12KB
FE_08_안정은 — 오전 10:37
말씀중에 죄송한데 저 10분만 자리 비울께요
BE_08_김휘수 — 오전 10:44
district_no: 11110
posting_type: 공공
job_keyword_main: 외식·음료
day_discussion: false
FE_08_박정현 — 오전 10:44
어디서 눌려서 그래요 ㅠ.ㅠ 버그라서
지금 고치기는 시간이 없어서
새로고침하고
검색 바로면
같이 안 날라갑니다
BE_08_박현성 — 오전 10:49
호ㅏ장실점 다녀올게요
FE_08_박정현 — 오전 10:50
맞아요 스토어에 저장되어서
예린_조교 — 오전 10:56
1팀 배포링크 제출해주세요!
https://ml2391tcuid.typeform.com/to/NgVhGuFI
Typeform
Typeform
프로젝트 발표자료 및 배포링크 제출
Turn data collection into an experience with Typeform. Create beautiful online forms, surveys, quizzes, and so much more. Try it for FREE.
BE_08_김휘수 — 오후 12:05
"error": "1 validation error for JobPostingCreateModel\nlocation\n  Field required [type=missing, input_value={'job_posting_title': '...력을 구합니다.'}, input_type=dict]\n
BE_08_김휘수 — 오후 12:16
{
"job_posting_title": "아디다스에서 MD구합니다",
"address": "인천 미추홀구 경원대로 627",
"work_time_start": "09:00",
"work_time_end": "21:00",
"posting_type": "기업",
"employment_type": "정규직",
"work_experience": "경력",
"job_keywordmain": "md쇼핑몰운영",
"job_keyword_sub": ["MD·쇼핑몰운영"],
"number_of_positions": 1,
"education": "고졸",
"deadline": "2025-05-30",
"time_discussion": true,
"day_discussion": true,
"work_day": ["월","화","수","목","금","토"],
"salary_type": "월급",
"salary": 2300000,
"summary": "아디다스 MD구합니다.",
"content": "저희는 아디다스 매장입니다. 저희의 상품을 잘 팔수 있게 홍보하는 인력을 구합니다."
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmOTQ5MDJlNS1hNTgzLTRkOGUtYjI1Ni0yZWIzMjE2NmNkNTUiLCJqb2luX3R5cGUiOiJjb21wYW55IiwiaXNfYWN0aXZlIjp0cnVlLCJleHAiOjE3NDcxNDIwMDd9.NY6hJ0yrMlv-Pg0UigMO_NsulY3LrQcL1V3IWJdgvpM
BE_08_고영주 — 오후 12:24
{
    "error": "1 validation error for JobPostingCreateModel\njob_keyword_main\n  Field required [type=missing, input_value={'job_posting_title': '...력을 구합니다.'}, input_type=dict]\n    For further information visit https://errors.pydantic.dev/2.11/v/missing"
}
BE_08_김휘수 — 오후 12:25
{
"job_posting_title": "아디다스에서 MD구합니다",
"address": "인천 미추홀구 경원대로 627",
"work_time_start": "09:00",
"work_time_end": "21:00",
"posting_type": "기업",
"employment_type": "정규직",
"work_experience": "경력",
"job_keyword_main": "md_쇼핑몰운영",
"job_keyword_sub": ["MD·쇼핑몰운영"],
"number_of_positions": 1,
"education": "고졸",
"deadline": "2025-05-30",
"time_discussion": true,
"day_discussion": true,
"work_day": ["월","화","수","목","금","토"],
"salary_type": "월급",
"salary": 2300000,
"summary": "아디다스 MD구합니다.",
"content": "저희는 아디다스 매장입니다. 저희의 상품을 잘 팔수 있게 홍보하는 인력을 구합니다."
}
BE_08_고영주 — 오후 12:44
박현성 — 오후 12:29
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlOTA4MWRmOS1mYTNiLTQyNTctYjg2NC1mNTc2MzFiYzAwZTMiLCJqb2luX3R5cGUiOiJjb21wYW55IiwiaXNfYWN0aXZlIjp0cnVlLCJleHAiOjE3NDcxNDI5MjR9.OdmnhY4TYnZ7HqemTuNihSvDvOow5gJ2z9ZSTd52SII         버거킹
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNzAzYTM3MS0zOWM1LTRiYTYtOTk0Ny1lNGJkNDZiOGI5ZDciLCJqb2luX3R5cGUiOiJjb21wYW55IiwiaXNfYWN0aXZlIjp0cnVlLCJleHAiOjE3NDcxNDMxNTd9.3B7T3uwc2KvJJlZ8M5f4T2fRBCzqdhQNiI71mUvYlKU         쿠팡 익산점
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YjRmYTcyYi1mNmI5LTQ5YjQtYjkyOS0xMWM0NGM4N2VlMjgiLCJqb2luX3R5cGUiOiJjb21wYW55IiwiaXNfYWN0aXZlIjp0cnVlLCJleHAiOjE3NDcxNDMyODd9.uStmnRzkTrG77-t6MHpxOFi3r1C-gwS42o2vePubJHM      애플 가로수길점
박현성 — 오후 12:38
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYzMzMTAxYS0wNWNmLTQ1NTAtODVkZC1lNThjZTg2NTkyOTMiLCJqb2luX3R5cGUiOiJjb21wYW55IiwiaXNfYWN0aXZlIjp0cnVlLCJleHAiOjE3NDcxNDM0NTd9.aKmoFodLVwHjD5OVQ39oPrZ4qXeh58ETT9aXnI_rNUk     (주)깔끄미
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGJhY2M3ZS04ODZlLTQwN2YtYWQ2My1hMzhlNGYxODhkODYiLCJqb2luX3R5cGUiOiJjb21wYW55IiwiaXNfYWN0aXZlIjp0cnVlLCJleHAiOjE3NDcxNDM3NTZ9.JGxS70raWxdrLtG7a7IX1PIqU80RmO7ba8URKfgMs8Y   액션무비
BE_08_박현성 — 오후 12:45
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDg5ZDdlYi0wZjU2LTQwYjItYmQwYi0wYjk2MzAzMTgyZWQiLCJqb2luX3R5cGUiOiJjb21wYW55IiwiaXNfYWN0aXZlIjp0cnVlLCJleHAiOjE3NDcxNDM5MTh9.SQyNZ9pd-phF_6Mv2-hOB43KnqNfnTwld6n9klJVLLw   유령회사
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNzU2ZWQyOS1mM2VlLTRmZjAtODE5YS00OTExNjExMjBlMTAiLCJqb2luX3R5cGUiOiJjb21wYW55IiwiaXNfYWN0aXZlIjp0cnVlLCJleHAiOjE3NDcxNDQxMDl9.JjEf4BAxpBu4B2LWkl-Kt5e8M3HhniGUIWRxgHujMAc   김밥지옥
BE_08_김휘수 — 오후 1:11
{
"job_posting_title": "김밥지옥에서 파트타이머 구합니다.",
"address": "강원특별자치도 강릉시 사천면 방동길 43-8",
"work_time_start": "09:00",
"work_time_end": "21:00",
"posting_type": "기업",
"employment_type": "정규직",
"work_experience": "경력",
"job_keyword_main": "md_쇼핑몰운영",
"job_keyword_sub": ["MD·쇼핑몰운영"],
"number_of_positions": 1,
"education": "고졸",
"deadline": "2025-05-30",
"time_discussion": true,
"day_discussion": true,
"work_day": ["월","화","수","목","금","토"],
"salary_type": "월급",
"salary": 2300000,
"summary": "아디다스 MD구합니다.",
"content": "저희는 아디다스 매장입니다. 저희의 상품을 잘 팔수 있게 홍보하는 인력을 구합니다."
}
https://senior-naeil.life/api/job-postings/create/
FE_08_박정현 — 오후 1:15
@BE_08_김휘수 휘수님 브랜치 feature/filter-public 이걸로 체크아웃 하시면 공공 일자리 추가/삭제 할 수 있어요 필터에서
지금 코치님이랑 수정중이라서 텍스트로 남깁니다!!
BE_08_김휘수 — 오후 1:56
@FE_08_박정현 Error: Cannot find module 'autoprefixer'
빌드에러 뜨네요..
BE_08_김휘수 — 오후 2:03
0c8139
0c81391 (HEAD -> develop, feature/filter-public) Update README.md
FE_08_박정현 — 오후 2:35
{
    "error": "4 validation errors for JobPostingUpdateModel\ncity\n  Field required [type=missing, input_value={'job_posting_title': '...: '11', 'content': '11'}, input_type=dict]\n    For further information visit https://errors.pydantic.dev/2.11/v/missing/ndistrict/n  Field required [type=missing, input_value={'job_posting_title': '...: '11', 'content': '11'}, input_type=dict]\n    For further information visit https://errors.pydantic.dev/2.11/v/missing/ntown/n  Field required [type=missing, input_value={'job_posting_title': '...: '11', 'content': '11'}, input_type=dict]\n    For further information visit https://errors.pydantic.dev/2.11/v/missing/nlocation/n  Field required [type=missing, input_value={'job_posting_title': '...: '11', 'content': '11'}, input_type=dict]\n    For further information visit https://errors.pydantic.dev/2.11/v/missing"
}
FE_08_김민정 — 오후 2:39
개인 
회원가입
이력서 조회, 북마크
지원한 공고 - 메모기능은 작동하나 삭제버튼이 없고, 리스트가 하드코딩 되어있음

기업 
회원가입
채용공고 탭 (다른 기업 공고도 뜸)
공고등록

필터링 (동까지는 정확하지 않음)
export const AUTH_ROUTES = {
  normal: {
    emailFind: "/auth/user/find-email/",
    passwordFind: "/auth/user/find-password/",
    signup: "/auth/user/signup/",
  },
  company: {
    emailFind: "/auth/company/find-email/",
    passwordFind: "/auth/company/find-password/",
    signup: "/auth/company/signup/",
  },
} as const;

export const LOGIN_CONFIG = {
  normal: {
    join_type: "normal" as const,
    showSocialLogin: true,
    showEmailDomainSelect: true,
  },
  company: {
    join_type: "company" as const,
    showSocialLogin: false,
    showEmailDomainSelect: false,
  },
} as const;
"use client";

import { useParams } from "next/navigation";
import UserFindPasswordForm from "@/features/auth-user/ui/login/UserFindPasswordForm";
import CompanyFindPasswordForm from "@/features/auth-company/ui/login/CompanyFindPasswordForm";

export default function FindPasswordPage() {
  const params = useParams();
  const type = params.type as "normal" | "company";

  if (type !== "normal" && type !== "company") {
    return null; // 또는 에러 페이지 컴포넌트
  }

  return <>{type === "normal" ? <UserFindPasswordForm /> : <CompanyFindPasswordForm />}</>;
}
https://www.miricanvas.com/v/14lh17x
시니어내일 발표 PPT
디자인 전문가가 아니어도 무료 템플릿으로 손쉽게 원하는 디자인을 할 수 있어요.
시니어내일 발표 PPT
BE_08_고영주 — 오후 2:53
CI 사진 
CD 사진
FE_08_김민정 — 오후 2:54
feature/find-fix
BE_08_고영주 — 오후 2:55
이미지
이미지
BE_08_김휘수 — 오후 2:59
개인 
회원가입
이력서 조회, 북마크
지원한 공고 - 메모기능은 작동하나 삭제버튼이 없고, 리스트가 하드코딩 되어있음

기업 
회원가입
채용공고 탭
공고등록
지원자 조회 및 확인시 읽음처리 가능(리스트 ordering은 안됨) (추가됨)

필터링 (동까지는 정확하지 않음)
회의룸 2에서같이하실까요??
기능 추가는 이제 더 안될거 같아요
BE_08_김휘수 — 오후 3:31
@BE_08_박현성 우리 공고 지원하면
담당자한테 이메일 가는거 했었나??
BE_08_박현성 — 오후 3:32
지원했다는 이메일만 가지 않아요?
BE_08_김휘수 — 오후 3:33
아 안했네
ㅋㅋㅋㅋ
BE_08_박현성 — 오후 3:33
앜ㅋㅋ
BE_08_고영주 — 오후 3:44
@FE_08_김민정  민정님저거 ppt 맨첫장에
멘토님 김땡땡 들어가있는데
덕배 로 바꿔주세요!
FE_08_김민정 — 오후 3:45
https://www.miricanvas.com/v/14lh17x
시니어내일 발표 PPT
디자인 전문가가 아니어도 무료 템플릿으로 손쉽게 원하는 디자인을 할 수 있어요.
시니어내일 발표 PPT
수정했습니당!
FE_08_박정현 — 오후 4:05
@FE_08_안정은 정은님 혹시 발표 자료 pdf 로 변환 가능하신가요!?
드라이브에 제출해야 한다고 해서요!
FE_08_안정은 — 오후 4:05
잠시만요
FE_08_박정현 — 오후 4:06
https://ml2391tcuid.typeform.com/to/NgVhGuFI
Typeform
Typeform
프로젝트 발표자료 및 배포링크 제출
Turn data collection into an experience with Typeform. Create beautiful online forms, surveys, quizzes, and so much more. Try it for FREE.
여기에 제출해야 한대요!! ㅠ.ㅠ
FE_08_안정은 — 오후 4:08
이게 아니라 드라이브에 올리면 되는거죠?!
FE_08_박정현 — 오후 4:08
예린조교님이
저 링크 주시면서 올려달라고 하셨어용!!
FE_08_안정은 — 오후 4:08
아 잠시만요 제가 물어볼께요
FE_08_박정현 — 오후 4:08
네에!!
BE_08_김휘수 — 오후 4:19
ㅋㅋ
저거 안바뀐거 같은데요
구현방법이랑 핵심기능
FE_08_김민정 — 오후 4:28
요걸로 보고 넣은건데 반영이 안된 파일을 주신건가여 영주님???
BE_08_고영주 — 오후 4:29
저거 내용은 현성님이 하시고
저는 정렬만해서 드렸는데
아마 반영안된상태로
정렬만 했나봐요
FE_08_김민정 — 오후 4:29
아하하 아까 발표듣다가 갑자기 내용 똑같아서 수정안된거 제가 넣은줄알고 놀랐습니당
BE_08_김휘수 — 오후 4:30
앗
내 주민벊로
공개하셨네ㅜㅜ
FE_08_박정현 — 오후 4:37
미안해요 ㅠ.ㅠ.ㅠㅠㅠㅠㅠㅠ
BE_08_김휘수 — 오후 4:37
고생하셨어요 ㅎㅎ
BE_08_고영주 — 오후 4:55
수고하셨어요!
BE_08_박현성 — 오후 4:58
고생하셨습니다
FE_08_박정현 — 오후 4:59
고생하셨습니다!
FE_08_김민정 — 오후 4:59
고생많으셨습니당ㅠㅠㅠㅠ
FE_08_안정은 — 오후 4:59
고생하셨습니다 -!
BE_08_김휘수 — 오후 5:03
저희
목요일까지
스프린트 해볼까요
오늘 하루 쉬고
FE_08_김민정 — 오후 5:05
네넹!
BE_08_고영주 — 오후 5:12
우리 마무리 파이팅 해봐요!!
FE_08_김민정 — 오후 5:13
그리고 발표자료! 
시연 부분에 수행 결과물을 드러낼 수 있는 자료를 넣어주세요!!
그리고 프로젝트 완성도 평가에 각 팀원 모두 점수로 평가해서 추가해주세요!
시연 영상도 추가!
라고 조교님이 말씀해주셨어영
BE_08_고영주 — 오후 5:14
엇 프로젝트 완성도 평가 항목 pain point 같이 넣을까요?
시연 부분 영상하고는.. 저희 그거 해야 되지 않을려나요 ㅠ
배포전에 지금 올려드려야하는건가?
FE_08_김민정 — 오후 5:16
해야할 것 같아영 발표자료 기준이라서
FE_08_박정현 — 오후 5:17
시연영상은 제가 찍어볼게요!! 지금!!
﻿
## 📖 프로젝트 소개

> 시니어내일은 5060 퇴직자 및 중장년층 구직를 위한 서비스
시니어 맞춤형 일자리 추천 알고리즘을 통해 다양한 채용공고를 접하고 간편이력서를 통해 지원까지 보다 쉽게 사용 가능한 반응형 웹 💚
---
## :link: 배포 링크

> ### FE : https://senior-tomorrow.kro.kr/
> ### BE : https://senior-naeil.life/

---
## 🗣️ 프로젝트 발표 영상 & 발표 문서

> ### 🗓️ 2025.03.13
> ### [📺 발표 영상 예시]()
> ### [📑 발표 문서 예시]()

---

## 🧰 사용 스택

### FE
<div align="center">

  <!-- 프레임워크 및 언어 -->
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <br>

  <!-- 상태 관리 및 폼 -->
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white">
  <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
  <img src="https://img.shields.io/badge/Zod-8A2BE2?style=for-the-badge&logo=zod&logoColor=white">
  <img src="https://img.shields.io/badge/TanStack Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white">
  <br>

  <!-- HTTP -->
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <br>

  <!-- 협업 툴 -->
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
  <br>

  <!-- 린팅 / CI / 배포 -->
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

</div>

### BE
<div align="center">

  <!-- 언어 & 프레임워크 -->
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white">
  <br>

  <!-- 데이터베이스 -->
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
  <br>

  <!-- 라이브러리 & 패키지 -->
  <img src="https://img.shields.io/badge/Pydantic-2E86AB?style=for-the-badge&logo=pydantic&logoColor=white">
  <img src="https://img.shields.io/badge/PostGIS-0099CC?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white">
  <img src="https://img.shields.io/badge/Boto3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/django--storages-0C4B33?style=for-the-badge&logo=django&logoColor=white">
  <img src="https://img.shields.io/badge/Pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white">
  <img src="https://img.shields.io/badge/unittest-6E6E6E?style=for-the-badge">
  <br>

  <!-- 배포 & 서버 -->
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
  <img src="https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge">
  <img src="https://img.shields.io/badge/NCP-03C75A?style=for-the-badge&logo=naver&logoColor=white">
  <br>

  <!-- 협업 툴 -->
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
  <br>

  <!-- CI/CD -->
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
  <img src="https://img.shields.io/badge/Zero Downtime Deployment-3B82F6?style=for-the-badge">

</div>


--- 

## :busts_in_silhouette: 팀 동료

### FE

| <a href="https://github.com/KIMDOTS"><img src="https://avatars.githubusercontent.com/u/168804702?v=4" width=100px/><br/><sub><b>@KIMDOTS</b></sub></a><br/> | <a href="https://github.com/chiyo-an"><img src="https://avatars.githubusercontent.com/u/52526916?v=4" width=100px/><br/><sub><b>@chiyo-an</b></sub></a><br/> | <a href="https://github.com/sasha-designer"><img src="https://avatars.githubusercontent.com/u/186126648?v=4" width=100px/><br/><sub><b>@sasha-designer</b></sub></a><br/> |
|:------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|
| 김민정 | 안정은 | 박정현 |
### BE

| <a href="https://github.com/Anianim"><img src="https://avatars.githubusercontent.com/u/188424203?v=4" width=100px/><br/><sub><b>@Anianim</b></sub></a><br/> | <a href="https://github.com/rodzlen"><img src="https://avatars.githubusercontent.com/u/162860800?v=4" width=100px/><br/><sub><b>@rodzlen</b></sub></a><br/> | <a href="https://github.com/parkh12"><img src="https://avatars.githubusercontent.com/u/186007221?v=4" width=100px/><br/><sub><b>@parkh12</b></sub></a><br/> |
|:-------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------:|
| 고영주 | 김휘수 | 박현성 |

---

## ✨ 프론트엔드 개발 규칙

### 1️⃣ 변수 및 CSS 네이밍 컨벤션

- ✅ **클래스 네임 (CSS)**: `언더스코어(_)` 사용  
  예시: `className="title_style"`

- ✅ **함수명**: `카멜 케이스(camelCase)`  
  예시: `handleLogin`, `submitForm`

- ✅ **컴포넌트명**: `파스칼 케이스(PascalCase)`  
  예시: `LoginForm`, `JobList`

---

### 2️⃣ 폴더 구조 (기능 중심 구조)

```
src/
├── app/                         # Next.js App Router 라우팅
├── assets/                      # 이미지 리소스
├── components/                  # 공통 UI 컴포넌트 (Button, Modal 등)
├── constants/                   # 상수 (경로, 메시지, 권한 등)
├── features/
│   ├── auth/                    # 로그인, 회원가입, 권한 처리
│   ├── jobs/                    # 공고 목록, 상세, 필터링, 검색
│   ├── resume/                  # 이력서 작성/수정 (구직자)
│   ├── apply/                   # 지원 및 내역 (구직자)
│   ├── user/                    # 구직자 정보 수정
│   ├── company/                 # 기업 정보 수정
│   ├── recruit/                 # 채용공고 등록/수정 (기업)
│   └── applicants/              # 지원자 목록 (기업)
├── hooks/                       # 커스텀 훅
├── lib/                         # 초기 설정 (axios, queryClient 등)
├── stores/                      # Zustand 전역 상태
├── styles/                      # 글로벌 스타일, Tailwind 설정
├── types/                       # 전역 타입 정의
├── utils/                       # 유틸 함수
└── middleware.ts                # 권한 처리 미들웨어
```

### Branch Strategy
> - main / dev 브랜치 기본 생성 
> - main과 dev로 직접 push 제한
> - PR 전 최소 2인 이상 승인 필수

### Git Convention
> 1. 적절한 커밋 접두사 작성
> 2. 커밋 메시지 내용 작성

>| 접두사       | 이모지 | 설명                                                                 |
>| ------------ | ------ | -------------------------------------------------------------------- |
>| Feat       | ✨     | 새로운 기능 추가                                                    |
>| Fix        | 🐛     | 기능 수정 및 버그 수정                                              |
>| Chore      | 💡     | 오타 수정, 주석 추가 등 기능 변경 없이 코드 수정                    |
>| Docs       | 📝     | 문서 수정 (예: README.md)                                           |
>| Build      | 🚚     | 빌드 관련 파일 수정 또는 삭제                                       |
>| Test       | ✅     | 테스트 코드 추가 및 수정 (프로덕션 코드 변경 없음)                 |
>| Refactor    | ♻️     | 코드 리팩토링 (기능 변화 없이 구조 개선)                            |
>| Hotfix     | 🚑     | 긴급 수정                          

---

## :clipboard: Documents
> [📜 API 명세서](https://www.notion.so/API-1cfcaf5650aa80b6999bf3a2733a030f)
> 
> [📜 사업기획팀 요구사항 정의서](https://www.notion.so/1cecaf5650aa80c1ae32ff4f2efff850)
> 
> [📜 FE 요구사항 정의서](https://docs.google.com/document/d/1rmbJZBB7H0fK-2nM2vk_Fqd1gL9m1Rmp0jahHoRzJXg/edit?tab=t.0)
> 
> [📜 BE 요구사항 정의서](https://docs.google.com/document/d/1DVcntERD_Ypr-7SBBtSy8bu_6zjl6Ka7e1It-mRyq0U/edit?tab=t.0)
> 
> [📜 ERD](https://www.erdcloud.com/d/4Qn2DHKPTvoSmR9BQ)
> 
> [📜 테이블 명세서](https://docs.google.com/spreadsheets/d/1MutR7L5QezUi0IUW9aGQy_QuUHMVsSGfpqtv0PHUV3s/edit?gid=0#gid=0)
>
> [📜 와이어프레임 및 화면정의서](https://www.figma.com/design/kcE3AdbnTxhmsYeaMLBWtH/1%ED%8C%80-%EC%82%AC%EB%B3%B8---%EC%8B%9C%EB%8B%88%EC%96%B4-%EB%82%B4%EC%9D%BC-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=92-5561&p=f&t=P4E3JUVuuh8WciXv-0))
>
> [📜 플로우차트](https://www.figma.com/design/kcE3AdbnTxhmsYeaMLBWtH/1%ED%8C%80-%EC%82%AC%EB%B3%B8---%EC%8B%9C%EB%8B%88%EC%96%B4-%EB%82%B4%EC%9D%BC-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=161-8740&p=f&t=P4E3JUVuuh8WciXv-0))
message.txt
12KB
