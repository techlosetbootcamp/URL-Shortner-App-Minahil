import { AxiosInstance } from "@/utils/axiosInstance";
import { load } from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const { data } = await AxiosInstance.get(url);
    const $ = load(data);

    const ogImage = $('meta[property="og:image"]').attr("content");
    const twitterImage = $('meta[name="twitter:image"]').attr("content");
    const appTileImage = $('meta[name="msapplication-TileImage"]').attr(
      "content"
    );
    const favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      $('link[rel="apple-touch-icon"]').attr("href") ||
      $('link[rel="apple-touch-icon-precomposed"]').attr("href");

    const baseUrl = new URL(url);
    const faviconUrl = favicon ? new URL(favicon, baseUrl.origin).href : "";
    const image = faviconUrl || ogImage || twitterImage || appTileImage || "";

    return NextResponse.json({ image });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
};
