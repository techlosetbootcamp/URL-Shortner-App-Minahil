"use client";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import imgFile from "/public/assets/images/linkly.svg";
import { FaCopy } from "react-icons/fa6";
import { TfiLink } from "react-icons/tfi";
import Image from "next/image";
import useLinkData from "./useLinkData";
import { CiFilter } from "react-icons/ci";
import Filter from "../filter/Filter";

const LinkTable = () => {
  const {
    url,
    handleCopy,
    handleToggleStatus,
    formatDate,
    handleEdit,
    handleDelete,
    loading,
    handleFilterChange,
    filteredLinks,linkImages
  } = useLinkData();

  if (url.isLoading) return <div className="text-white">Loading</div>;

  return (
    <>
      {url?.urls![0]?.user_email ? (
        <div className="flex items-center justify-between mb-[28px]">
          <div className="text-text_secondary font-bold text-[20px]">
            History <span>({filteredLinks?.length})</span>
          </div>
          <div className="bg-brand_grey border border-input_border_clr h-[44px] text-input_txt_clr font-bold text-[15px] rounded-[48px] flex items-center justify-center py-[21px] w-[113.19px] pr-[25.19px] pl-[25px] gap-[10px]">
            <CiFilter />
            <button className=""><Filter onFilterChange={handleFilterChange} /></button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="flex flex-col gap-[3px]">
        <div className="text-text_secondary py-[21px] pr-[25.19px] pl-[25px] bg-input_bg_clr flex items-center justify-between">
          <div>Short Link</div>
          <div>Original Link</div>
          <div>QR Code</div>
          <div>Clicks</div>
          <div>Status</div>
          <div>Date</div>
          {url?.urls![0]?.user_email ? <div>Action</div> : ""}
        </div>
        {filteredLinks?.map((link) => (
          <div
            key={link.urlCode}
            className="text-text_secondary py-[21px] pr-[25.19px] pl-[25px] bg-rgba(24, 30, 41, 0.22) flex items-center justify-between"
          >
            <div className="flex items-center gap-[10px]">
              <div className="font-bold">{link.shortUrl}</div>
              <div className="h-[35px] p-[10px] flex items-center justify-center w-[35px] rounded-[31px] bg-copy_button_clr opacity-[69%]">
                <FaCopy
                  onClick={() => handleCopy(link?.shortUrl!)}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-[10px]">
                <div className="h-[32px] w-[32px] flex items-center justify-center rounded-[31px] bg-copy_button_clr opacity-[69%]">
                  <Image unoptimized={true} src={linkImages[link?.urlCode!] || imgFile}  alt="" width={32} height={32} />
                </div>
                <div className="font-bold">{link?.originalUrl}</div>
              </div>
            </div>
            <a href={link.qrCode} download>
              {link.qrCode && (
                <Image src={link.qrCode} alt="" width={32} height={32} />
              )}
            </a>
            <div>{link.analytics?.analytic.clicked}</div>
            <div
              onClick={() => handleToggleStatus(link?.urlCode!, link?.active!)}
              className="flex items-center gap-[10px] p-[10px] cursor-pointer"
            >
              <div
                className={`${
                  link.active
                    ? "text-active_link_clr"
                    : "text-inactive_link_clr"
                } font-thin`}
              >
                {link.active ? "Active" : "Inactive"}
              </div>
              <div
                className={`h-[35px] w-[35px] rounded-[31px] px-[8px] py-[3.5px] ${
                  link?.active ? "bg-active_link_clr" : "bg-inactive_link_clr"
                } opacity-15 flex items-center justify-center`}
              >
                <TfiLink className="text-white" />
              </div>
            </div>
            <div>{formatDate(link?.analytics?.analytic.updatedAt!)}</div>
            <div>
              {link?.user_email ? (
                <div className="text-white flex items-center gap-[10px]">
                  {" "}
                  <button
                    style={{
                      filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.10))",
                    }}
                    className="flex items-center justify-center p-[13px] px-[13.09px] border border-input_border_clr bg-input_bg_clr rounded-[48px]"
                    onClick={() => handleEdit(link?.urlCode!)}
                  >
                    <GrEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(link?.urlCode!)}
                    disabled={loading}
                    className="flex items-center justify-center p-[13px] px-[13.09px] border border-input_border_clr bg-input_bg_clr rounded-[48px]"
                  >
                    <AiOutlineDelete />
                  </button>{" "}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{background: 'linear-gradient(180deg, rgba(11, 16, 27, 0) 15.74%, rgba(11, 16, 27, 0.57) 50.38%)'}} className="absolute w-[1421px] h-[148px] left-[153px] top-[1026px] filter blur-[21px] backdrop-blur-[20px] text-white"></div>
    </>
  );
};

export default LinkTable;
