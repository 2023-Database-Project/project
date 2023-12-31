import { z } from "zod";
import courseService from "@/services/courseService";
import { NextRequest } from "next/server";

const CourseSearchRequestParams = z.object({
  id: z.string(),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parsed = CourseSearchRequestParams.safeParse(
    Object.fromEntries(searchParams),
  );
  if (!parsed.success) {
    return Response.json(parsed.error, {
      status: 400,
      statusText: "invalid request params",
    });
  }

  try {
    const result = await courseService.getCourseById(Number(parsed.data.id));
    return Response.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
