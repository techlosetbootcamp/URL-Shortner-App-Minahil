import QrCode from "qrcode";

const useGenerateQRCode = async (url: string): Promise<string> => {
  if (url) {
    return await QrCode.toDataURL(url, {
      width: 500,
    });
  }
  return "";
};

export default useGenerateQRCode;
