import {customAlphabet} from "nanoid";

const generateShortUrl=(host:string)=>{
    console.log("inside generator");
    console.log(host);
        const nanoid = customAlphabet("1234567890abcdefghi",10);
        const shortCode=nanoid();

        return{
            shortCode,
            shortUrl: `http://${host}/api/${shortCode}`,
        };
};
export default generateShortUrl;