import QrCode from "qrcode";
export const GENERATE_QR_CODE = async (url: string): Promise<string> => {
  if (url) {
    return await QrCode.toDataURL(url, {
      width: 500,
    });
  }
  return "";
};
