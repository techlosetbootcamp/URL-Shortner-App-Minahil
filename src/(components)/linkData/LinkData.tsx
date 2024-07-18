"use client";
import imgFile from "/src/assets/twitter.png";
import { FaCopy } from "react-icons/fa6";
import { TfiLink } from "react-icons/tfi";
import { FaLinkSlash } from "react-icons/fa6";
import Image from "next/image";
import useLinkData from "./useLinkData";

const LinkTable = () => {
  const {link,handleCopy,clicks,date,handleToggleStatus}=useLinkData();
  console.log("link.url.active in UI");
  console.log(link.url.active);
  if (link.isLoading) return <div className="text-white">Loading</div>;

  return (
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
          <div className="font-bold">{link?.url?.shortUrl}</div>
          <div className="h-[35px] p-[10px] flex items-center justify-center w-[35px] rounded-[31px] bg-copy_button_clr opacity-[69%]">
            <FaCopy onClick={handleCopy} className="cursor-pointer" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-[10px]">
            <div className="h-[32px] w-[32px] flex items-center justify-center rounded-[31px] bg-copy_button_clr opacity-[69%]">
              <Image src={imgFile} alt={""} width={32} height={32} />
            </div>
            <div className="font-bold">{link?.url?.originalUrl}</div>
          </div>
        </div>
        <a href={link?.url?.qrCode} download>
          {link?.url?.qrCode && <Image src={link?.url?.qrCode} alt={""} width={32} height={32} />}
        </a>
        <div>{clicks}</div>
        <div onClick={handleToggleStatus} className="flex items-center gap-[10px] p-[10px]">
          <div className={`${link?.url?.active ? 'text-active_link_clr' : 'text-inactive_link_clr'} font-thin`}>{link?.url?.active ? 'Active': 'Inactive'}</div>
          <div className={`h-[35px] w-[35px] rounded-[31px] px-[8px] py-[3.5px] ${link?.url?.active ? 'bg-active_link_clr' : 'bg-inactive_link_clr'} opacity-15 flex items-center justify-center`}>
            <TfiLink />
          </div>
        </div>
        
        <div>{date}</div>
      </div>
    </div>
  );
};
export default LinkTable;
