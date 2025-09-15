import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/errorMessage";
import { getLegnthMemberCommunities } from "@/server/community/[id]/getLegnthMemberCommunities";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const sessionTokenMatch = cookieHeader?.match(/sessionToken=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      console.log("❌ No sesfsionToken found");
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

    const membersCount = await getLegnthMemberCommunities(id);

    return NextResponse.json({
      success: true,
      data: membersCount, // ✅ FIX: Utilisez 'data' au lieu de 'members'
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: getErrorMessage(error),
      status: 500,
    });
  }
}
