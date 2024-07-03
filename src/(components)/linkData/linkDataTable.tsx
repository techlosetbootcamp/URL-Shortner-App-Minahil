import imgFile from "/src/assets/twitter.png";
import qrImg from "/src/assets/qr.png";
import Image from "next/image";
import { FaCopy } from "react-icons/fa6";
import { TfiLink } from "react-icons/tfi";
function LinkTable(){
    return(
        <div className="flex flex-col gap-[3px]">
  
                <div className="text-text_secondary py-[21px] pr-[25.19px] pl-[25px] bg-input_bg_clr flex items-center justify-between">
                    <div>Short Link</div>
                    <div>Original Link</div>
                    <div>QR Code</div>
                    <div>Clicks</div>
                    <div>Status</div>
                    <div>Date</div>
                </div>
                <div className="text-text_secondary py-[21px] pr-[25.19px] pl-[25px] bg-rgba(24, 30, 41, 0.22) flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                    <div className="font-bold">https://linkly.com/Bn41aCOlnxj</div>
                    <div className="h-[35px] p-[10px] flex items-center justify-center w-[35px] rounded-[31px] bg-copy_button_clr opacity-[69%]"><FaCopy /></div>
                    </div>
                    <div>
                    <div className="flex items-center gap-[10px]">
                    <div className="h-[32px] w-[32px] flex items-center justify-center rounded-[31px] bg-copy_button_clr opacity-[69%]"><Image src={imgFile} alt={""} width={32} height={32}/></div>
                    <div className="font-bold">https://linkly.com/Bn41aCOlnxj</div>
                    </div>
                    </div>
                    <div><Image src={qrImg} alt={""} width={32} height={32}/></div>
                    <div>1313</div>
                    <div className="flex items-center gap-[10px]">
                        <div className="text-active_link_clr">Active</div>
                        <div className="h-[35px] w-[35px] rounded-[31px] p-[10px] bg-active_link_clr opacity-15"><TfiLink/></div>
                    </div>
                    <div>Oct - 10 -2023</div>
                </div>
                
            
        </div>
    );
}
export default LinkTable;