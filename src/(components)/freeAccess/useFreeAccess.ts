import useUrlShortenForm from "../urlShortenForm/useUrlShortenForm";

const useFreeAccess=()=>{
    const {shortenedUrlsCount}=useUrlShortenForm();
    return {shortenedUrlsCount};
};
export default useFreeAccess;