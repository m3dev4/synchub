import { getCategoryCommunity } from "@/server/community/[id]/getCategoryCommunity";
import { getErrorMessage } from "@/utils/errorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      console.log("❌ No sessionToken found");
      return NextResponse.json(
        { success: false, message: "Unauthorized - No session token" },
        { status: 401 },
      );
    }
    const { id } = await params;
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Community ID is required",
        status: 400,
      });
    }
    const category = await getCategoryCommunity(id);
    return NextResponse.json({
      success: true,
      data: category,
      status: 200,
    });
  } catch (error) {
    getErrorMessage(error);
  }
}
