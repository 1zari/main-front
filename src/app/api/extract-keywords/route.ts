import { JOB_CATEGORIES } from "@/constants/jobCategories";
import { REGIONS } from "@/constants/regions";
import { NextResponse } from "next/server";

const regionKeywords = Object.keys(REGIONS);
const jobKeywords = Object.values(JOB_CATEGORIES).flat(); // ["서빙", "주방보조", ...]
const employmentTypes = ["정규직", "계약직"];
const careerTypes = ["경력무관", "경력"];
const educationLevels = ["학력무관", "고졸", "대졸이상"];
const workingDays = ["월", "화", "수", "목", "금", "토", "일", "요일 협의"];
const allKeywords = [
    ...employmentTypes,
    ...careerTypes,
    ...educationLevels,
    ...workingDays,
  ...jobKeywords,
  ...regionKeywords,

];

export async function POST(req: Request) {
  const { message } = await req.json();

  const keywordList = allKeywords.join(", ");
  const prompt = `
  다음 문장에서 아래 단어 목록 중 관련 있는 단어만 골라서 JSON 배열로 반환하세요.

  문장: "${message}"

  ⚠️ 반드시 아래 단어 목록에 포함된 단어만 결과에 포함해야 합니다.
  아래 단어 목록 없는 단어는 절대 포함하지 마세요. 예: '어린이집', '의사', '요리사' 등이 목록에 없다면 제외합니다.
  문장의 단어가 단어 목록에 없다면, 최대한 비슷한 단어를 보여주세요. 예를 들어
  '방송국에서 일한 적이 있어' 그러면 "방송사·프로덕션","보조출연·방청",
    "방송스텝·촬영보조", 이런식으로 말이야!

    그리고 고용형태나, 근무요일에 관한 얘기가 있으면 꼭 단어에 포함시켜줘.
    정규직, 계약직, 경력무관, 경력, 학력무관, 고졸, 대졸이상, 월, 화, 수, 목, 금, 토, 일, 요일 협의 이런 것들말이야.
    예를 들어, 계약직은 싫고 정규직이 하고 싶다. 그러면 정규직 키워드만 추출해줘. 그래야 일자리 검색을 할 수 있으니까.

    그리고 꼭 직무 관련된 키워드도 뽑아줘야해.


  단어 목록:
  ${keywordList}

  🔁 반환 형식: ["계약직", "청소", "서울"]
✅ 배열 외의 어떤 말도 하지 마세요. 반드시 JSON 배열만!
  절대 \`\`\`json 같은 코드 블럭도 사용하지 마세요.
  `.trim();

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "사용자의 말에서 일자리 검색 키워드를 추출하는 어시스턴트야.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    }),
  });

  const data = await openaiRes.json();
  const text = data.choices?.[0]?.message?.content ?? "[]";
  if (process.env.NODE_ENV !== "production") {
    console.log("🧠 GPT 응답 원문:", data);
    console.log("🧠 GPT 응답 원문:", text);
    console.log("keywords", keywordList);
  }
  let keywords: string[] = [];

  try {
    keywords = JSON.parse(text);
  } catch {
    keywords = text.split(",").map((kw) => kw.trim()).filter(Boolean);
  }

  return NextResponse.json({ keywords });
}