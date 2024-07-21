import { NextRequest } from "next/server";

export const DOMAIN = "http://localhost:3000/api/";

export const getHost = (req: NextRequest): string | null => {
    return req.headers.get("host");
  };