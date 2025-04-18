import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "인증되지 않은 요청입니다." }, { status: 401 });
    }

    const { role } = await request.json();
    if (!role || !["user", "employer"].includes(role)) {
      return NextResponse.json({ error: "유효하지 않은 역할입니다." }, { status: 400 });
    }

    // 여기에서 실제 데이터베이스 업데이트 로직을 구현해야 합니다
    // 예시: await db.user.update({ where: { id: session.user.id }, data: { role } });

    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error("역할 업데이트 중 오류 발생:", error);
    return NextResponse.json({ error: "역할 업데이트에 실패했습니다." }, { status: 500 });
  }
}
