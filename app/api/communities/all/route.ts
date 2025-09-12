import { allCommunities } from "@/server/community/all";
import { getErrorMessage } from "@/utils/errorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    console.log("🔑 Found sessionToken:", sessionToken);

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    const communities = await allCommunities(sessionToken);

    return NextResponse.json({
      success: true,
      data: communities,
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching communities:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: getErrorMessage(error),
      status: 500,
    });
  }
}
