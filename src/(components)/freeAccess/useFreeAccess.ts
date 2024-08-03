import useLinkData from "../linkData/useLinkData";

const useFreeAccess = () => {
  const { url } = useLinkData();
  const shortenCount = url?.urls?.length;
  return { shortenCount };
};
export default useFreeAccess;
