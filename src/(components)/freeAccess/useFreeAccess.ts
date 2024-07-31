import useLinkData from "../linkData/useLinkData";
import useUrlShortenForm from "../urlShortenForm/useUrlShortenForm";

const useFreeAccess=()=>{
    const {url}=useLinkData();
    const shortenCount=url?.urls?.length;
    return {shortenCount};
};
export default useFreeAccess;