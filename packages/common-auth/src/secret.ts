export const secret: string = process.env.JWT_SECRET || "not from envFile";

export const secretRefreshToken: string =
  process.env.REFRESH_TOKEN_SECRET || "not from envFile - refresh";
