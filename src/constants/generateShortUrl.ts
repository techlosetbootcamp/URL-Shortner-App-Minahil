import { customAlphabet } from "nanoid";

const GENERATE_SHORT_URL = (host: string, newUrlCode?: string) => {
  if (newUrlCode) {
    return {
      shortUrl: `http://${host}/api/${newUrlCode}`,
    };
  } else {
    const nanoid = customAlphabet("1234567890abcdefghi", 10);
    const shortCode = nanoid();

    return {
      shortCode,
      shortUrl: `http://${host}/api/${shortCode}`,
    };
  }
};
export default GENERATE_SHORT_URL;
