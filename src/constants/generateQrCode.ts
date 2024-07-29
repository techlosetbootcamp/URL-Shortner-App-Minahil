import QrCode from "qrcode";
export const GenerateQRCode = async (url: string): Promise<string> => {
  if (url) {
    return await QrCode.toDataURL(url, {
      width: 500,
    });
  }
  return "";
};
