import { createCommunity } from "@/server/community/create";
import { getErrorMessage } from "@/utils/errorMessage";
import { createCommunitySchema } from "@/validations/community";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
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

    const body = await request.json();

    const validateResult = createCommunitySchema.safeParse(body);

    if (!validateResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          errors: validateResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const result = await createCommunity(validateResult.data, sessionToken);
    return NextResponse.json({
      success: result.success,
      message: result.success ? "Community created successfully" : result.error,
      data: result.data,
      status: 200,
    });
  } catch (error) {
    console.error("Error creating community:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: getErrorMessage(error),
      status: 500,
    });
  }
}
